import React from "react";
import "./users.scss";
import DataTable from "../../components/dataTable/DataTable";

const Users = function () {
    return (
        <div className="users">
            <div className="info">
                <h1>Les utilisateurs</h1>
                <button>Ajouter un utilisateur</button>
            </div>

            <DataTable/>


        </div>
    )
}

export default Users