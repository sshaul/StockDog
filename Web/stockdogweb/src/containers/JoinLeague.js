import React, { Component } from 'react';
import { withCookies } from 'react-cookie';

class JoinLeague extends Component {
   constructor(props) {
      super(props);

      this.cookies = this.props.cookies;

      this.state = {
         inviteCode: null,
         screen: 1
      }

      this.input1 = 
         <div className="JoinLeague">
            <div className="create-league-area" id="join-league-area">
               <h1>Join a league</h1>
               <label>Invite code</label>
               <input id="inviteCode" type="text" 
                  value={this.state.inviteCode} onChange={this._onChange}/>
               <button className="submit-btn" id="league-advance"
                  onClick={this.advance}>
                  <span>Advance</span></button>
            </div>
         </div>;

      this.input2 = 
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
         </div>;
   }

   joinLeague = () => {
      this.api.createPortfolioWithLeague(
         this.cookies.get("userId"),
         this.state.nickname,
         this.state.buyPower,
         this.state.leagueId,
         this.state.inviteCode
      );
   }

   _onChange = (event) => {
      this.setState({
         [event.target.id]: event.target.value
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
         return this.input1;
      }
      if (this.state.screen === 2) {
         return this.input2;
      }
   }
}

export default withCookies(JoinLeague);
