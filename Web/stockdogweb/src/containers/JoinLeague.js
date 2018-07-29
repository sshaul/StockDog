import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import API from 'api/api';
import GoHome from '../components/GoHome';

class JoinLeague extends Component {
   constructor(props) {
      super(props);

      this.cookies = this.props.cookies;
      this.api = new API();

      this.state = {
         inviteCode: "",
         screen: 1,
         inviteCodeClass: "",
         nickname: ""
      }
   }

   joinLeague = () => {
      this.api.getLeagueIdViaInviteCode(this.state.inviteCode, (data) => {
         this.api.createPortfolioWithLeague(
            this.cookies.get("userId"),
            this.state.nickname,
            data["startPos"],
            data["id"],
            this.state.inviteCode,
            () => {
               console.log("portfolio created and joined league");
               this.props.history.push("/");
            }
         );
      });
   }

   _onChange = (event) => {
      const id = event.target.id;

      this.setState({
         [id]: event.target.value
      }, () => {
         if (id === "inviteCode") {
            this.checkInviteCode();
         } 
      });

      
   }

   checkInviteCode = () => {
      this.api.getLeagueIdViaInviteCode(this.state.inviteCode, (data) => {
         if (data === null && this.state.inviteCodeClass === "") {
            this.setState({
               inviteCodeClass: "invalidInput"
            });
         }
         else if (data && this.state.inviteCodeClass === "invalidInput") {
            this.setState({
               inviteCodeClass: ""
            });
         }
      });
   }

   advance = () => {
      this.setState({screen: 2});
   }

   back = () => {
      this.setState({screen: 1});
   }

   render() {
      if (this.state.screen === 1) {
         return (
            <div className="JoinLeague">
               <GoHome />
               <div className="create-league-area" id="join-league-area">
                  <h1>Join a league</h1>
                  <label>Invite code</label>
                  <input id="inviteCode" type="text" 
                  className={this.state.inviteCodeClass}
                  value={this.state.inviteCode} onChange={this._onChange}/>
                  <button className="submit-btn" id="league-advance"
                     onClick={this.advance}>
                     <span>Advance</span></button>
               </div>
            </div>
         );
      }
      if (this.state.screen === 2) {
         return (
            <div className="JoinLeague">
               <GoHome />
               <div className="create-league-area" id="create-league-area-2">
                  <label>Your nickname</label>
                  <input id="nickname" type="text" value={this.state.nickname} 
                     onChange={this._onChange} />
                  <button className="submit-btn" id="league-advance"
                     onClick={this.joinLeague}>
                     <span>Join</span></button>
                  <button className="submit-btn" id="league-back"
                     onClick={this.back}>
                     <span>Back</span></button>
               </div>
            </div>
         );
      }
   }
}

export default withCookies(JoinLeague);
