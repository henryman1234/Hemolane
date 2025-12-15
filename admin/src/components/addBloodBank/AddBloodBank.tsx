import React, { type SetStateAction } from "react"
import "./addBloodBank.scss";


interface AddBloodBankProps  {
    setOpen: React.Dispatch<SetStateAction<boolean>>
}


const AddBloodBank = function ({setOpen}: AddBloodBankProps) {

    return (
        <div className="addBloodBank">

            <div className="modal">

                <span className="close" onClick={function(){
                    setOpen(false)
                }}>x</span>

                <h2>Créer une banque de sang</h2>


                <form >

                    <div className="formItems">

                        <div className="main">

                            <div className="formItem">
                                <label htmlFor="name">Nom de la banque</label>
                                <input placeholder="Nom de la banque de sang" name="name" type="text" id="name"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="type">Groupe sanguin</label>
                                <input placeholder="Groupe sanguin" name="type" type="text" id="type"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="rhesus">Rhésus du sang</label>
                                <input placeholder="Rhésus" type="text" name="rhesus" id="rhesus"  />
                            </div>


                            <div className="formItem">
                                <label htmlFor="status">Disponibilité</label>
                                <input type="text" id="name"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="name">Autre paramètre</label>
                                <input placeholder="Pas nécéssaire" type="text" id="name"  />
                            </div>

                            <div className="formItem">
                                <label htmlFor="name">Autre paramètre</label>
                                <input placeholder="Pas nécéssaire" type="text" id="name"  />
                            </div>

                        </div>

                        <div className="buttonContainer">
                            <button>Créer la banque de sang</button>
                        </div>


                    </div>


                    <div className="descContainer">
                        <textarea placeholder="Saissisez une description brève et concise" name="desc"></textarea>
                    </div>

                    
                </form>
            </div>
        </div>
    )
    

}

export default AddBloodBank