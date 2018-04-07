import React, { Component } from 'react';
import { TouchableOpacity, View, AsyncStorage } from 'react-native';
import containers from '../style/containers';
import Icon from 'react-native-vector-icons/Feather';
import Drawer from 'react-native-drawer';

export default class NavBar extends Component {

   constructor(props) {
      super(props);
      console.log(props);
   }

   render() {
      return (
         <View style={containers.iconHeaders}>
               <TouchableOpacity onPress={this.props.openDrawer}>
                  <Icon name='user' size={30} color='white' />
               </TouchableOpacity>
               <Icon name='settings' size={30} color='white' />
         </View>
      );
   };
};