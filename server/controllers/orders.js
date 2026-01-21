import mongoose from "mongoose"
import BloodBank from "../models/BloodBank.js"
import Order from "../models/Order.js"
import Notification from "../models/Notification.js"



export const createOrder = async function (req, res, next) {
    const {bloodBankId, hospitalId} = req.params
    const {priority, message, contact} = req.body
    const userId = req.user?.id
    console.log(bloodBankId, hospitalId,userId)

    try {

        // We first create the order
        const newOrder = new Order({
            user: userId,
            contact: contact,
            message: message,
            priority: priority,
            bloodBank: bloodBankId,
            hospital: hospitalId
        })

        const savedOrder = await newOrder.save()

        //Then we create the notifcation
        const newNotification = new  Notification ({
            order: savedOrder?._id,
            message: savedOrder?.message,
            user: savedOrder?.user,
            contact: savedOrder?.contact,
            bloodBank: savedOrder?.bloodBank,
            hospital: savedOrder?.hospital,
            priority: savedOrder.priority,
            contact: savedOrder.contact
        });

        const savedNotification = await newNotification.save();


        const populatedNotification = await Notification.findById(savedNotification?._id)
            .populate("user", "username email avatarUrl")
            .populate("hospital", "name")
            .populate("bloodBank", "name type rhesus")

        // Emission of the socket
        const io = req.app.get("io")

        io.to("admins").emit("new_order_notification", {
            populatedNotification
        })

        // await BloodBank.findByIdAndUpdate(savedNotification?.bloodBank, {
        //     status: "non-disponible",
        // });

        res.status(200).json({message: "Notification envoyée avec succès", data: savedNotification})
        
    } catch (err) {
        next(err)
    }
}


