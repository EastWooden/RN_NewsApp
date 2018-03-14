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
import { scaleSize, setSpText } from '../../ScreenUtil/ScreenUtil'
import MainStyle from '../../MainStyle/MainStyle'
export default class DeImage extends Component {
  render() {
    return (
      <View>
        <Image
          source={this.props.source}
          style={[this.props.style, {position: 'absolute', zIndex: 1, }]}
        />
        <Image
          source={this.props.defaultImage}
          style={[this.props.style,]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
