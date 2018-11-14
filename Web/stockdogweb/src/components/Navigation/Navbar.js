import React, { Component } from "react";
import "./Navbar.css";

import { Menu } from "react-feather";

class Navbar extends Component {
   render() {
      return (
         <div className="Navbar">
            <div className="navbar-sidebar-menu-btn">
               <Menu color="white" size={36} />
            </div>
            <div className="navbar-portfolio-dropdown">
               <span>Week league</span>
               <div className="navbar-portfolio-dropdown-content">
                  <p>Month league</p>
                  <p>Friend league</p>
                  <p>Long league title wooo</p>
               </div>
            </div>
         </div>
      );
   }
}

export default Navbar;