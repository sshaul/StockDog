import React, { Component } from 'react';
import { View } from 'react-native';
import containers from '../style/containers';
import SpinningLoader from './spinningloader';
import NavBar from './navbar';

export default class LoadingProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={containers.profileGeneral}>
        <NavBar/>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <SpinningLoader />
        </View>
      </View>
    );
  }
}