import React from "react";
import { Link } from "react-router-dom";
import { NavbarData } from "./navbarData";
import "./navbar.css";

function Navbar() {
  return (
    <>
    <div id="side-bar">
        <div id="title">
            <span>Expenses</span>Tracker
        </div>
        <nav className="nav-menu">
            <ul className="nav-menu-items">
                {NavbarData.map((item, index) => {
                    return (
                        <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    </div>
    </>
  );
}

export default Navbar;
