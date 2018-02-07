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
// import Day from './components/day';

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
            header: null
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
  Stock: {
    screen: Stock,
    navigationOptions: {
      tabBarLabel: 'Stock',
      tabBarIcon: ({ tintColor }) => {
        return (
          <Icon name='user' size={30} color='white' />
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


// export const DateRoot = TabNavigator({
//   Day: {
//     screen: Day,
//     navigationOptions: {
//       tabBarLabel: 'D',
//     }
//   }
// }, {
//   tabBarPosition: 'bottom',
//   tabBarOptions: {
//     activeTintColor: '#f7f8f9',
//     inactiveTintColor: '#f7f8f9',
//     inactiveBackgroundColor: '#657a86',
//     activeBackgroundColor: '#434b59'
//   },
// });