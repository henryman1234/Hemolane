import React from "react";
import "./homePage.scss";
import LatestUsers from "../../components/latestUsers/LatestUsers";
import UsersPresentations from "../../components/usersPresentation/Userspresentation";
import HospitalsPresentation from "../../components/hospitalsPresentation/HospitalsPresentation";
import BloodBanksPresentation from "../../components/bloodBanksPresentation/BloodBanksPresentation";

const HomePage = function () {
    return (
        <div className="homePage">
            <div className="box box1">
                <LatestUsers/>
            </div>
            <div className="box box2">
                <UsersPresentations/>
            </div>
            <div className="box box3">
                <HospitalsPresentation/>
            </div>
            <div className="box box4">Item 4</div>
            <div className="box box5">
                <BloodBanksPresentation/>
            </div>
            <div className="box box6">Item 6</div>
            <div className="box box7">Item 7</div>
            <div className="box box8">Item 8</div>
            <div className="box box9">Item 9</div>
        </div>
    )
}

export default HomePage