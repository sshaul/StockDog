import React from 'react';

import Listing from '../components/Listing/Listing';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

var listingProps = {
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
    <Listing {...listingProps}/>);
