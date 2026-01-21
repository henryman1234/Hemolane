import React, { useRef, useState, type SetStateAction } from "react"
import "./addBloodBank.scss";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";


interface AddBloodBankProps  {
    setOpen: React.Dispatch<SetStateAction<boolean>>
}


const AddBloodBank = function ({setOpen}: AddBloodBankProps) {
    const [error, setError] = useState("")
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement | null> (null);
    const apiUrl = import.meta.env.VITE_API_URL
    const {id} = useParams()
    console.log(id)

    const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const type = formData.get("type")
        const rhesus = formData.get("rhesus")
        const status = formData.get("status")
        const desc = formData.get("desc")
        const name = formData.get("name")

        try {

            const res = await fetch(`${apiUrl}/api/hospitals/${id}/bloodBank`, {
                method: "POST",
                cache: "no-store",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({type, rhesus, status, desc, name})
            })

            if (res.ok) {
                const data = await res.json()
                toast.success("Banque de sang créee avec succès", {
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    position: "top-right"
                })
                formRef.current?.reset()
            }
            
        } catch (err: any) {
            setError(err?.message)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="addBloodBank">

            <div className="modal">

                <span className="close" onClick={function(){
                    setOpen(false)
                }}>x</span>

                <h2>Enregister une banque de sang</h2>


                <form ref={formRef} onSubmit={handleSubmit} >

                    <div className="formItems">

                        <div className="main">

                            <div className="formItem">
                                <label htmlFor="name">Nom de la banque</label>
                                <input placeholder="Nom de la banque de sang" name="name" type="text" id="name"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="type">Groupe sanguin</label>
                                <select name="type" id="type" className="select">
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="O+">O+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="formItem">
                                <label htmlFor="rhesus">Rhésus du sang</label>
                                <select name="rhesus" id="rhesus" className="select">
                                    <option value="Positif">Positif</option>
                                    <option value="Négatif">Négatif</option>
                                </select>
                            </div>


                            <div className="formItem">
                                <label htmlFor="status">Disponibilité</label>
                                <select name="status" id="status" className="select">
                                    <option value="disponible">Disponible</option>
                                    <option value="non-disponible">Non-Disponible</option>
                                </select>
                            </div>

                            <div className="formItem">
                                <label htmlFor="name">Autre paramètre</label>
                                <input placeholder="Pas nécéssaire" type="text" id="name"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="name">Autre paramètre</label>
                                <input placeholder="Pas nécéssaire" type="text" id="name"  />
                            </div>

                            <div className="descContainer">
                                <textarea minLength={30} placeholder="Saissisez une description brève et concise" name="desc"></textarea>
                            </div>

                        </div>

                        <div className="buttonContainer">
                            <button>Créer la banque de sang</button>
                        </div>


                    </div>

                    
                </form>
            </div>
        </div>
    )
    

}

export default AddBloodBank