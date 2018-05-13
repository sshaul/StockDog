import React, { Component } from "react";
import { Link } from "react-router-dom";

class GoHome extends Component {
   render() {
      return(
         <div className="GoHome">
            <Link to="/">Home</Link>
         </div>
      );
   }
}

export default GoHome;