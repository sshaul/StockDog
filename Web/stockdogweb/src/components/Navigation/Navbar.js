import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Navbar.css";

import { Menu, Award, User } from "react-feather";

const primaryColor = "#3ee7ad";

class Navbar extends Component {

   constructor(props) {
      super(props);

      this.state = {
         dropdownActive: false
      }
   }

   generateDropdownLinks = () => {
      var linkHtmls = [];
      const links = this.props.links;

      links.forEach(link => {
         linkHtmls.push(
            <p onClick={() => this.props.history.push(link.location)}>
               {link.title}
            </p>
         );
      });

      return linkHtmls;
   }

   toggleDropdown = () => {
      this.setState({ dropdownActive: !this.state.dropdownActive });
   }

   goToProfile = () => {
      this.props.history.push("/profile");
   }


   render() {
      return (
         <div className="Navbar">
            <div className="navbar-sidebar-menu-btn">
               <Menu color="white" size={36} />
            </div>
            <div className="navbar-portfolio-dropdown">
               <div className="navbar-portfolio-dropdown-btn"
                  onClick={this.toggleDropdown}>
                  <span>Week league</span>
               </div>
               {
                  this.state.dropdownActive ?
                     <div className="navbar-portfolio-dropdown-content">
                        {this.generateDropdownLinks()}
                     </div> :
                     null
               }
            </div>
            <div className="navbar-sidebar-points">
               <div className="navbar-sidebar-points-circle">
                  <Award color={primaryColor} size={18} />
               </div>
               <p>29321</p>
            </div>
            <div className="navbar-sidebar-profile"
               onClick={this.goToProfile}>
               <User color={primaryColor} size={21} />
            </div>
         </div>
      );
   }
}

export default withRouter(Navbar);