import React, { Component } from "react";

class CreateLeague extends Component {
   constructor(props) {
      super(props);

      this.input1 = 
         <div class="create-league-area" id="create-league-area-1">
            <h1>Create a league</h1>
            <label>Name of league</label>
            <input id="" type="text"  />
            <label>Initial buying power</label>
            <input id="" type="number" min="1000" />
            <label>Start date</label>
            <input id="" type="date" />
            <label>End date</label>
            <input id="" type="date" />
            <button className="submit-btn" id="league-advance"
               onClick={this.advance}>
               <span>Advance</span></button>
         </div>
         ;

      this.input2 = 
         <div class="create-league-area" id="create-league-area-2">
            <h1>Create a league</h1>
            <label>Your nickname</label>
            <input id="" type="text" />
            <button className="submit-btn" id="league-advance"
            >
               <span>Create</span></button>
            <button className="submit-btn" id="league-back"
               onClick={this.back}>
               <span>Back</span></button>
         </div>
         ;

      this.state = {
         screen: this.input1
      }
   }

   advance = () => {
      this.setState({
         screen: this.input2
      });
   };

   back = () => {
      this.setState({
         screen: this.input1
      });
   }

   render() {
      return (
         <div className="CreateLeague">
            {this.state.screen};
         </div>
      );
   }
}

export default CreateLeague;
