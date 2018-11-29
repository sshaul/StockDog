import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar';
import Graph from '../../components/Graph/Graph';
import Listing from '../../components/Listing/Listing';
import News from '../../components/News/News';

import './Portfolio.css';

const listingProps = {
   title: 'Portfolio',
   listings: [
      {
         title: "RAD",
         desc: "Rite Aid Corporation",
         price: 200.53,
         priceChange: 27.21,
         amount: 20
      },
      {
         title: "CAMT",
         desc: "Camtek LTD",
         price: 4021.21,
         priceChange: -120.23,
         amount: 87
      },
      {
         title: "WMT",
         desc: "Walmart Corporation",
         price: 185.62,
         priceChange: 2.45,
         amount: 0
      }
   ]
}

const watchListProps = {
   title: 'Watchlist',
   listings: [
      {
         title: "ROKU",
         desc: "Roku Inc",
         price: 38.93,
         priceChange: -0.29,
      },
      {
         title: "BAC",
         desc: "Bank of America Corp",
         price: 28.34,
         priceChange: 0.68,
      }   
   ]
}

const headlines = [
   {
      title: "China may reject new trade talks if more tariffs imposed",
      link: "/article1"
   },
   {
      title: "Shiller: The market is experiencing 'irrational exuberance aaaaaaaaaaaaaaaaaaaaaa",
      link: "/article2"
   },
   {
      title: "3 Incredibly Cheap Technology Stocks",
      link: "/article3"
   },
   {
      title: "3 Things to Watch in the Stock Market This Week",
      link: "/article4"
   }
]

class Portfolio extends Component {
   render() {
      return (
         <div className="Portfolio">
            <Navbar links={[
               {
                  title: "Month League",
                  location: "/league/monthLeague"
               },
               {
                  title: "Penny Stocks",
                  location: "/league/pennyStocks"
               },
               {
                  title: "Swing Stocks",
                  location: "/league/swingStocks"
               }
            ]
            }/>
         <div className="portfolio-circle">
         </div>
         <Graph isLoading={false}
            labels={["1/13/2018", "1/14/2018", "1/15/2018",
               "1/16/2018", "1/17/2018", "1/18/2018"]}
               data={[14.21, 23.21, 20.53, 19.23, 15.67, 16.23]}
            />
         <div className="portfolio-listing-news-area">
            <div className="portfolio-listing-area">
               <Listing {...listingProps}/>
               <Listing {...watchListProps}/>
            </div>
            <div className="portfolio-news-area">
               <News headlines={headlines} />
            </div>
         </div>
      </div>
      );
   }
}

export default Portfolio;
