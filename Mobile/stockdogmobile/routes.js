import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import elements from './style/elements';
import Login from './screens/login';
import Register from './screens/register';
import Main from './screens/main';
import Profile from './screens/profile';
import Stock from './screens/stock';
import SearchMain from './screens/searchmain';
import Search from './screens/search';
import Group from './screens/group';
import Feed from './screens/feed';

export const Root = StackNavigator({
    // Login : {
    //     screen: Login,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    // Register: {
    //     screen: Register,
    //     navigationOptions: {
    //         header: null
    //     }
    // },
    Main: {
        screen: Main,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    }
});

export const TabRoot = TabNavigator({
  // Profile: {
  //   screen: Profile,
  //   navigationOptions: {
  //     tabBarLabel: 'Profile',
  //     tabBarIcon: ({ tintColor }) => {
  //       return (
  //         <Icon name='user' size={30} color='white' style={{color: tintColor}}/>
  //       );
  //     }
  //   }
  // },
  // Group: {
  //   screen: Group,
  //   navigationOptions: {
  //     tabBarLabel: 'Group',
  //     tabBarIcon: ({ tintColor }) => {
  //       return (
  //         <Icon name='users' size={30} color='white' style={{color: tintColor}}/>
  //       );
  //     }
  //   }
  // },
  // Feed: {
  //   screen: Feed,
  //   navigationOptions: {
  //     tabBarLabel: 'Feed',
  //     tabBarIcon: ({ tintColor }) => {
  //       return (
  //         <Icon name='activity' size={30} color='white' style={{color: tintColor}}/>
  //       );
  //     }
  //   }
  // },
  SearchMain: {
    screen: SearchMain,
    navigationOptions: {
      tabBarLabel: 'Stock',
      tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name='search' size={30} color='white' />
        );
      }
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#f7f8f9',
    inactiveTintColor: '#f7f8f9',
    inactiveBackgroundColor: '#657a86',
    activeBackgroundColor: '#434b59'
  },
});

export const SearchStockRoot = StackNavigator ({
  // Search: {
  //   screen: Search,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
  Stock: {
    screen: Stock,
    navigationOptions: {
      header: null
    }
  }
},
{
  mode: 'modal'
});