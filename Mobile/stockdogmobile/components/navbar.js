import React, { Component } from 'react';
import { TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

export default class NavBar extends Component {

   constructor(props) {
      super(props);
   }

   openDrawer() {
      Actions.drawerOpen();
   }

   openSettings() {
      Actions.settings();
   }

   isStockPage() {
      if (this.props.stock) {
         return <Icon name='chevron-down' size={48} color='grey' />;
      }
   }

   render() {
      return (
         <View>
            <TouchableOpacity onPress={this.openDrawer}>
               <Icon name='user' size={30} color='white' />
            </TouchableOpacity>
            {this.isStockPage()}
            <TouchableOpacity onPress={this.openSettings}>
               <Icon name='settings' size={30} color='white' />
            </TouchableOpacity>
         </View>
      );
   };
};