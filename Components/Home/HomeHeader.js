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
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import { setSpText, scaleSize } from '../../ScreenUtil/ScreenUtil'
import { TabNavigator } from 'react-navigation';
import MainStyle from '../../MainStyle/MainStyle';
import icons from '../../icons/icons'
//获取当前屏幕的宽度
let width = Dimensions.get('window').width;
export default class HomeHeader extends Component {
  render() {
    return (
      <View style={styles.Homeheader}>
        <View style={styles.textContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.locationName}>万州</Text>
            <Image source={{ uri: 'navigationbar_arrow_down' }} style={{ width: scaleSize(20), height: scaleSize(20)}}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="请输入关键词..."
              style={styles.searchinput}
              placeholderTextColor='rgb(225,224,171)'
            />
          </View>
          <View style={{ marginLeft: scaleSize(20), paddingTop: scaleSize(4),}}>
            <Image source={{ uri: 'customerservice' }} style={{ width: scaleSize(60), height: scaleSize(60) }} tintColor='rgb(225,224,171)'/>
          </View>
        </View>
        <View style={styles.backImageContainer}>
          <Image source={{ uri: 'headerBacImage' }} style={styles.headerImage} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    marginRight: scaleSize(20),
    paddingTop: scaleSize(10)
  },
  locationName: {
    color: 'rgb(225,224,171)',
    fontSize: setSpText(16),
    paddingRight: scaleSize(14)
  },
  searchinput: {
    color:'rgb(225,224,171)',
    fontSize: setSpText(16),
  },
  inputContainer: {
    width: scaleSize(500),
    backgroundColor: 'rgba(255,255,255,.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleSize(216),
    height:scaleSize(64)

   
    
  },
  Homeheader: {
    height: scaleSize(128),
  },
  headerImage: {
    width: width,
    height: scaleSize(128),
    resizeMode: 'cover'
  },
  textContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flexDirection: 'row',
    paddingTop: scaleSize(52),
    justifyContent: 'space-between',
    alignItems:'center',
    paddingLeft: scaleSize(30),
    paddingRight: scaleSize(30),
    display: 'flex',
  },
  backImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0,
  }
});
