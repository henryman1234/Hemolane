import React, { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";

export interface Notification  {
    _id: string,
    order: string,
    type: string
    priority: string,

    hospital: {
        name: string,
        _id: string
    },
    bloodBank: string,
    message: string
    contact: string,
    user: {
        _id: string,
        username: string,
        email: string,
        avatarUrl?: string
    },
    createdAt: string,
}


export const useAdminNotification = function () {

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const initialized = useRef(false)
    const ref = useRef<Notification[]>([])
    ref.current = notifications

    useEffect(() => {

        if (initialized.current) {
            return
        }

        initialized.current = true

        // 1. Chargement de l'historique (Persistance)
        const fetchNotifications = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/notifications`, {
                    method: "GET",
                    credentials: "include",
                    headers: { Accept: "application/json" }
                });

                if (res.ok) {
                    const data = await res.json();
                    // On remplace le state initial par les données de la DB
                     setNotifications(data?.data); 
                }

            } catch (err) {
                console.error("Erreur chargement notifications:", err);
            }
        };

        fetchNotifications();


        // 2. Connexion Socket (Live)
        socket.connect();
        socket.emit("join_admin");

        socket.on("new_order_notification", (data) => {
            setNotifications((prev) => {
                // Éviter les doublons si le socket envoie une notif déjà fetchée
                if (prev.some(o => o._id === data.populatedNotification._id)) return prev;

                return [ ...prev, data.populatedNotification];
                    

            });
        });

        return () => {
            socket.off("new_order_notification");
            socket.disconnect();
        };
    }, []); // On reste sur un montage unique

    return notifications;
};