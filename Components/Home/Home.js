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
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { TabNavigator, TabBarTop, StackNavigator, TabBarBottom } from 'react-navigation';
import {scaleSize,setSpText} from '../../ScreenUtil/ScreenUtil'
import HomeHeader from './HomeHeader';
import UserListView from './UserListView';
import MainStyle from '../../MainStyle/MainStyle';
import TabBarItem from '../TabBarItem/TabBarItem';
import DetailArticle from './DetailArticle';
import videoDetail from './videoDetail';
import icons from '../../icons/icons';
let width = Dimensions.get('window').width;
export default class Home extends Component {
  render() {
    return (      
        <TopNavigator />
    );
  }
}
const TabRouteConfigs = {
  Toutiao: {
    screen: UserListView,
    navigationOptions: ({navigation}) => ({
      tabBarLabel: '头条',

    })
  },
  video: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '视频',
    }
  },
  newTime: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '新时代',
    }
  },
  yl: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '娱乐',
    }
  },
  lh: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '两会',
    }
  },
  ty: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '体育',
    }
  },
  yw: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '要闻',
    }
  },
  dz: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '段子',
    }
  },
  wyh: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '网易号',
    }
  },
  local: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '本地',
    }
  },
  cj: {
    screen: UserListView,
    navigationOptions: {
      tabBarLabel: '财经',
    }
  },

};
const TabNavigatorConfigs = {
  initialRouteName: 'Toutiao',
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  lazy:true,
  swipeEnabled:true,
  animationEnabled:false,
  tabBarOptions: {
    activeTintColor: 'rgb(0,0,0)',
    inactiveTintColor: '#555',
    scrollEnabled: true,
    pressOpacity: 1,
    style: {
      backgroundColor: '#fff',
      borderWidth: 0,
      paddingTop:0,
      // position:'absolute',
      // top:64,
      // left: 0, 
    },
    tabStyle: {                  //单个Tab的样式
      width: scaleSize(146),
      padding: 0
    },
    labelStyle: {//文字的样式
      fontSize: setSpText(16),
    },
    indicatorStyle: {
      height: 0,
    }
  },
}
const Tab = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);
//定义栈路由
const StackRouteConfigs = {
  Tab: {
    screen: Tab,
    navigationOptions: {
      header: (
        // 
        <HomeHeader />
      ),
    }
  },
  DetailArticle: {
    screen: DetailArticle,
  },
  videoDetail: {
    screen: videoDetail,
  }
};
const StackNavigatorConfigs  = {
  initialRouteName: 'Tab',
  // navigationOptions: {
  // }
  
};
const TopNavigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs)
const styles = StyleSheet.create({
  
});
