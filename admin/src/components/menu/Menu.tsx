import React from "react";
import "./menu.scss";
import {Link} from "react-router-dom"
import { menu } from "../../utils/data";

const Menu = function () {
    return (
        <div className="menu">
            {menu.map(function(item){
                return (
                    <div className="item" key={item?.id}>
                        <span className="title">
                            PRINCIPALE
                        </span>
                        {item?.listItems.map(function(listItem){
                            return (
                                <Link to={listItem?.url} className="listItem" key={listItem?.id}>
                                    <img src={listItem.icon} alt="" />
                                    <span className="listItemTitle">{listItem.title}</span>
                                </Link>
                            )
                        })}
                </div>
                )
            })}



        </div>
    )
}

export default Menu