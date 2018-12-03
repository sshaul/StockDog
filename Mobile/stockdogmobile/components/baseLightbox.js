import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Dimensions, PanResponder } from 'react-native';
import { Actions } from 'react-native-router-flux';
import modalStyles from '../style/screens/tradingmodal';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export default class BaseLightbox extends Component {
   constructor(props) {
      super(props);

      this.state = {
         top: new Animated.Value(500),
         pan: new Animated.ValueXY
      };

      this.panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: Animated.event([null, {
            dx: this.state.pan.x,
            dy: this.state.pan.y
         }]),
         onPanResponderRelease: (e, gesture) => {
            if (this.isInCloseZone(gesture)) {
               this.closeModal();
            }
            else {
               Animated.spring(this.state.pan, {
                  toValue: {x: 0, y:0}
               }).start();
            }
         }
      });
   }

   isInCloseZone = (gesture) => {
      return gesture.dy > 400;
   }

   componentDidMount() {
      Animated.timing(this.state.top, {
         duration: 100,
         toValue: 0,
      }).start();
   }

   closeModal = () => {
      Animated.timing(this.state.top, {
         duration: 100,
         toValue: 500,
      }).start(Actions.pop);
   }

   _renderLightBox = () => {
      const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
      const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
      const width = horizontalPercent ? deviceWidth * horizontalPercent : deviceWidth;
      return (
         <Animated.View
            {...this.panResponder.panHandlers}
            style={[this.state.pan.getLayout(), modalStyles.baseModal]}
         >
            <View style={modalStyles.outerModal}>
               <View style={modalStyles.modalHeaders}>
                  <View style={modalStyles.swipeline} />
               </View>
               {children}
            </View>
         </Animated.View>
      );
   }

   render() {
      return (
         <Animated.View style={[modalStyles.outermostBaseContainer, { top: this.state.top }]}>
            {this._renderLightBox()}
         </Animated.View >
      );
   }
}