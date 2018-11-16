import React from 'react';
import {
   BrowserRouter as Router
} from 'react-router-dom';

import Listing from '../components/Listing/Listing';
import Graph from '../components/Graph/Graph';
import Navbar from '../components/Navigation/Navbar';

import { storiesOf } from '@storybook/react';


import { Button, Welcome } from '@storybook/react/demo';

const listingProps = {
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

storiesOf('Listing', module)
   .add('one listing', () =>
      <Listing {...listingProps} />);

storiesOf('Graph', module)
   .add('loading', () =>
      <Graph isLoading={true} />)
   .add('loaded', () =>
      <Graph isLoading={false}
         labels={["1/13/2018", "1/14/2018", "1/15/2018",
            "1/16/2018", "1/17/2018", "1/18/2018"]}
         data={[14.21, 23.21, 20.53, 19.23, 15.67, 16.23]}
      />
   );


const navbarLinks = [
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
      location:"/league/swingStocks"
   }
]

storiesOf('Navbar', module)
   .add('no links', () =>
      <Router><Navbar links={navbarLinks} /></Router>);
















