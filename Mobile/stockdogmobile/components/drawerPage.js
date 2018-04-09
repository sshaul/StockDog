import React, { Component } from 'react';
import { View } from 'react-native';
import Drawer from 'react-native-drawer';
import GroupDrawer from '../components/groupdrawer';


export default class DrawerPage extends Component {
  constructor(props) {
    super(props);
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
        {this.props.page}
      </Drawer>
      );
  }
};