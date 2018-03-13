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
  Image
} from 'react-native';
import {scaleSize ,setSpText } from '../../ScreenUtil/ScreenUtil'
import MainStyle from '../../MainStyle/MainStyle'
export default class TabBarItem extends Component {
  render() {
    let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
    return (
      <Image 
        source={this.props.focused ? selectedImage : this.props.normalImage}
        style={{ tintColor: this.props.tintColor, width: scaleSize(50), height: scaleSize(50)}}
      />
    );
  }
}
const styles = StyleSheet.create({
});
