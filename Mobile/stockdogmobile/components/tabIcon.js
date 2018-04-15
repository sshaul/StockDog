import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { View, Text } from 'react-native';

class TabIcon extends Component {
   render() {
      var color = 'white';

      return (
         <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
            <Icon style={{color: color}} name={this.props.iconName || "circle"} size={25}/>
         </View>
      );
   }
};

export default TabIcon;