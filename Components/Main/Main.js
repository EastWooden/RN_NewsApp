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
import { TabNavigator, TabBarBottom, StackNavigator} from 'react-navigation';
import {scaleSize,setSpText} from '../../ScreenUtil/ScreenUtil';
import MainStyle from '../../MainStyle/MainStyle';
import Home from '../Home/Home';
import Mine from '../Mine/Mine';
import Vscreen from '../VideoScreen/Vscreen';
import LiveCast from '../LiveBordcast/LiveCast';
import TabBarItem from '../TabBarItem/TabBarItem';
export default class Main extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navigator/>
    );
  }
}
const TabRouteConfigs = {
  Home: { 
          screen: Home,
          navigationOptions: ({navigation}) => ({
            tabBarVisible: true,
            tabBarLabel: '首页',
            tabBarIcon: ({focused ,tintColor}) => (
              <TabBarItem
                tintColor={tintColor}
                focused = {focused}
                normalImage={{ uri:'home'}}
                selectedImage={{ uri:'activity_home'}}
              />
            )
          })
        },
  Vscreen: {
    screen: Vscreen,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '视频',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={{ uri: 'playon' }}
          selectedImage={{ uri: 'playon_fill' }}
        />
      )
    })
  },
  LiveCast: {
    screen: LiveCast,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '直播',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={{ uri: 'video' }}
          selectedImage={{ uri: 'video_fill' }}
        />
      )
    })
  },
  Mine: {
    screen: Mine,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '我的',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={{ uri: 'mine' }}
          selectedImage={{ uri: 'mine_active' }}
        />
      )
    })
  },
};
//定义底部标签的默认配置
const TabNavigatorConfigs = {
  initialRouteNam: '首页',
  tabBarComponent: TabBarBottom,
  tabBarPosition : 'bottom',
  lazy: true,
  tabBarOptions: {
    activeTintColor: 'rgb(255,8,42)',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: '#fff',
      borderTopWidth: 0,
      paddingBottom: scaleSize(4)
    }
  },
};
const Tab = TabNavigator(TabRouteConfigs,TabNavigatorConfigs);
const StackRouteConfigs = {
  Tab: {
    screen: Tab,
  }
};
const StackNavigatorConfigs = {
  initialRouteNam: 'Tab',
  navigationOptions: {
    header:null,
  }
};
const Navigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs)
const styles = StyleSheet.create({
  
});
