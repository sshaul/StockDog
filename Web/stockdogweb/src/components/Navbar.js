import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
   constructor(props) {
      super(props);

      this.cookies = this.props.cookies;

      this.state = {
         searchStock: ""
      }
   }

   /* ====== Search bar ===== */
   handleStockSearch = (event) => {
      this.setState({searchStock: event.target.value});
   }

   // Redirect to a different stock page
   changeStock = (event) => {
      event.preventDefault();

      this.props.history.push('/stock/' + this.state.searchStock);
   }
   /* ======================= */

   render() {
      return (
         <div className="Navbar">
            <div className="stock-search">
               <form onSubmit={this.changeStock}>
                  <input id="stock-search-input" value={this.state.value}
                     placeholder="search stock"
                     onChange={this.handleStockSearch}/>
               </form>
            </div>
         </div>
      )
   }
}

export default withRouter(Navbar);
