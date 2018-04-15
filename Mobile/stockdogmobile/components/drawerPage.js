import React, { Component } from 'react';
import { View } from 'react-native';
import {Actions} from 'react-native-router-flux';
import Drawer from 'react-native-drawer';
import GroupDrawer from '../components/groupdrawer';


export default class DrawerPage extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
  };

  render() {
    return (
      <Drawer
        type="static"
        openDrawerOffset={100}
        tweenHandler={Drawer.tweenPresets.parallax}
        ref={(ref) => this._drawer = ref}
        content={<GroupDrawer />}
        open={false}
      >
        <DefaultRenderer navigationState={navigation.children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
};