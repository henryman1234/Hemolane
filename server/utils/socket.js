import mongoose from "mongoose";
import {Server} from "socket.io"

export const initSocket = function (httpServer) {

    const io = new Server(httpServer, {
        cors: {
            origin: "*" 
        }
    })

   io.on("connection", function(socket){
        console.log("Admin connecté: ", socket.id)

        socket.on("join_admin", function(){
            socket.join("admins")
            console.log("Admin rejoint la room admins")
        })

        socket.on("disconnect", function(){
            console.log("Admin déconnecté: ", socket.id) 
        })
    })

    return io
}
