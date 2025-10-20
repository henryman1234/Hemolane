import React, { useEffect, useState } from "react";

const initialEmails =  [
    {id: 1, title: "Apprendre le code", body: "React est un framework JS"},
    {id: 2, title: "Apprendre Vue", body: "Vue est un framework JS"},
    {id: 3, title: "Apprendre Angular", body: "Angular est un framework JS"},
    {id: 4, title: "Apprendre Laravel", body: "Laravel est un framework PHP"},
]

export function GMAILFeature () {

    interface Message {
        id: number,
        title: string,
        body: string
    }

    const [emails, setEmails] = useState<Message[]>(initialEmails)
    const [deletedEmail, setDeletedEmail] = useState<Message | null>(null)
    const [showUndo, setShowUndo] = useState<boolean>(false)
    const [undoTimer, setUndoTimer] = useState(5)

    const handleDelete = function (email:Message) {
        setDeletedEmail(email)
        setEmails(function(prev) {
            return prev.filter(function(item: Message){
                return item.id !== email.id
            })
        })
        setUndoTimer(5)
        setShowUndo(true)
    }

    useEffect(function(){
        if (showUndo && deletedEmail ) {

            const timer = setInterval(function(){
                setUndoTimer(function(prev:number) {
                   if (prev <= 1) {
                        clearInterval(timer)
                        setDeletedEmail(null)
                        setShowUndo(false)
                        return 0
                   }
                    return prev - 1
                })
    
            }, 1000)
    
            return function () {
                clearInterval(timer)
            }
        } 
        
    }, [showUndo, deletedEmail])


    const handleUndo  = function () {
        // if (undoTimer) {
        //     clearInterval(undoTimer)
        // }
        if (deletedEmail) {
            setEmails(function(prev: Message[]) {
                return [deletedEmail, ...prev]
            })
        }
        setDeletedEmail(null)
        setShowUndo(false)
    }

    return (
        <div className="container" style={{position: "relative"}}>
            {emails.map(function(email){
                return (
                    <article key={email.id} className="email">
                        <div className="emailBody">
                            <h2>{email.title}</h2>
                            <span>{email.body}</span>
                        </div>
                        <div className="emailBottom">
                            <button   className="undoButton" >Undo</button>
                            <button onClick={function() {
                                handleDelete(email)
                            }} className="deleteButton" >Delete</button>
                        </div>
                    </article>
                )
            })}
            {showUndo && <div className="delete">
                Annuler la supprésion
                <span>{undoTimer}</span>
                <button onClick={handleUndo}>Annuler</button>
            </div>}
        </div>
    )
}
