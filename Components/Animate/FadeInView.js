/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Animated
} from 'react-native';
import MainStyle from '../../MainStyle/MainStyle'
export default class FadeInView extends Component {
  constructor(props){
    super(props);
    this.state= {
      fadeAima: new Animated.Value(0)
    }
  }
  render() {
    return (
      <Animated.View >
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
});
