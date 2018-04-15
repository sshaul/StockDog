import React, { Component } from 'react';
import { TouchableOpacity, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import containers from '../style/containers';
import Icon from 'react-native-vector-icons/Feather';

export default class NavBar extends Component {

   constructor(props) {
      super(props);
   }

   openDrawer() {
      Actions.drawerOpen();
   }

   render() {
      return (
         <View style={containers.iconHeaders}>
            <TouchableOpacity onPress={this.openDrawer}>
               <Icon name='user' size={30} color='white' />
            </TouchableOpacity>
            <Icon name='settings' size={30} color='white' />
         </View>
      );
   };
};