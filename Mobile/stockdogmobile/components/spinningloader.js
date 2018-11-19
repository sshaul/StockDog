import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class SpinningLoader extends Component {
  constructor(props) {
    super(props);

    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.spin();
  };

  spin = () => {
    this.spinValue.setValue(0);

    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.spin());
  };

  render() {
    const rotate = this.spinValue.interpolate({inputRange: [0, 1], outputRange: ['0deg', '360deg']});
    
    return (
      <Animated.View style={{transform: [{rotate}]}}>
        <Icon name='loader' size={48} color='white' />
      </Animated.View>
    );
  }
};