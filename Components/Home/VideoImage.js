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
export default class VideoImage extends Component {
  render() {
    return (
      <View style={{ justifyContent: 'center',alignItems:'center', }}>
        <View style={{ width: scaleSize(96), height: scaleSize(96), borderRadius: scaleSize(48), backgroundColor: 'rgba(0,0,0,.5)', position: 'absolute', zIndex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <Image source={{ uri: 'play_fill' }} style={{ tintColor: 'rgba(255,255,255,1)', width: scaleSize(50), height: scaleSize(50),    }} />
        </View>
        <Image
          source={this.props.VideoImageSrc}
          style={this.props.style}
          onLoadEnd={this.props.onLoadEnd}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
