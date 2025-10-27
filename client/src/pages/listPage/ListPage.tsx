import React from "react";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import { bloodBankList } from "../../dummydata";
import BloodCard from "../../components/bloodCard/BloodCard";
import Map from "../../components/map/Map";

const ListPage = function () {
    return (
        <div className="listPage">
            <div className="listPageContainer">
                <div className="listContainer">
                    <div className="wrapper">
                        <Filter/>
                        {bloodBankList.map(function(item){
                            return (
                                <BloodCard item={item} key={item?.id} />
                            )
                        })}
                    </div>
                </div>
                <div className="mapContainer">
                    <Map items={bloodBankList}/>
                </div>
            </div>
        </div>
    )
    
}
export default ListPage