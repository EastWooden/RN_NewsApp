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
  View
} from 'react-native';
import { TabNavigator } from 'react-navigation';

import MainStyle from '../../MainStyle/MainStyle'
export default class Mine extends Component {
  
  render() {
    return (
      <View style={MainStyle.container}>
        <Text>this is  Mine</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({

});
