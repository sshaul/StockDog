import React, { Component } from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router-dom";

import API from "../api";
import GoHome from "../components/GoHome";

class CreateLeague extends Component {
   constructor(props) {
      super(props);

      this.api = new API();
      this.cookies = this.props.cookies;

      this.state = {
         nameOfLeague: "",
         initialBuyingPower: 1000,
         startDate: "",
         endDate: "",
         nickname: "",
         screen: 1
      }
   }

   componentDidMount() {
   }

   _onChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
      });
   }

   advance = () => {
      this.setState({
         screen: 2
      });
   };

   back = () => {
      this.setState({
         screen: 1
      });
   }

   createLeague = (event) => {
      event.preventDefault();

      const ownerId = this.cookies.get("userId");

      this.api.createLeague(
         this.state.nameOfLeague,
         this.state.startDate,
         this.state.endDate,
         this.state.initialBuyingPower,
         ownerId,
         (data) => {
            const id = data["id"];
            const inviteCode = data["inviteCode"];
            alert(this.state.nameOfLeague + " has been created.");
            this.api.createPortfolioWithLeague(
               this.cookies.get("userId"),
               this.state.nickname,
               this.state.initialBuyingPower,
               id,
               inviteCode,
               () => {
                  console.log("portfolio created");
                  this.props.history.push("/");
               }
            );
         }
      );

   }

   render() {
      if (this.state.screen === 1) {
         return (
            <div className="CreateLeague">
               <GoHome />
               <div className="create-league-area" id="create-league-area-1">
                  <h1>Create a league</h1>
                  <label>Name of league</label>
                  <input id="nameOfLeague" type="text" 
                     value={this.state.nameOfLeague} onChange={this._onChange}/>
                  <label>Initial buying power</label>
                  <input id="initialBuyingPower" type="number" min="1000" 
                     value={this.state.initialBuyingPower} 
                     onChange={this._onChange} />
                  <label>Start date</label>
                  <input id="startDate" type="date" value={this.state.startDate}
                     onChange={this._onChange} />
                  <label>End date</label>
                  <input id="endDate" type="date" value={this.state.endDate} 
                     onChange={this._onChange} />
                  <button className="submit-btn" id="league-advance"
                     onClick={this.advance}>
                     <span>Advance</span></button>
               </div>
            </div>
         );
      }
      else {
         return (
            <div className="CreateLeague">
               <GoHome />
               <div className="create-league-area" id="create-league-area-2">
                  <label>Your nickname</label>
                  <input id="nickname" type="text" value={this.state.nickname} 
                     onChange={this._onChange} />
                  <button className="submit-btn" id="league-advance"
                     onClick={this.createLeague}>
                     <span>Create</span></button>
                  <button className="submit-btn" id="league-back"
                     onClick={this.back}>
                     <span>Back</span></button>
               </div>
            </div>
         )
      }
   }
}

export default withRouter(withCookies(CreateLeague));
