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
export default class PhotosetImage extends Component {
  render() {
    return (
      <View>
        <View style={{ flexDirection: 'row', position: 'absolute', right: scaleSize(5), bottom: scaleSize(5),zIndex: 1, justifyContent: 'center', alignItems: 'center', }}>
          <Image source={{ uri: 'picture_fill' }} style={{ tintColor: 'rgba(255,255,255,1)', width: scaleSize(40), height: scaleSize(40), }} />
          <Text style={{color:'#fff',fontSize:setSpText(14),}}>{this.props.imgsum}</Text>
        </View>
        <Image
          source={this.props.photosetImageSrc}
          style={this.props.style}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
});
