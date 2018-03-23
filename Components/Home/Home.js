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
import { TabNavigator, TabBarTop, StackNavigator, TabBarBottom,NavigationActions } from 'react-navigation';
import {scaleSize,setSpText} from '../../ScreenUtil/ScreenUtil'
import HomeHeader from './HomeHeader';
import UserListView from './UserListView';
import MainStyle from '../../MainStyle/MainStyle';
import TabBarItem from '../TabBarItem/TabBarItem';
import DetailArticle from './DetailArticle';
import videoDetail from './videoDetail';
import icons from '../../icons/icons';
import Vscreen from '../VideoScreen/Vscreen';
import Mine from '../Mine/Mine';
import LiveCast from '../LiveBordcast/LiveCast';
import HomePage from './HomePage'
import { connect } from 'react-redux';
import { isshowtab } from '../../actions/actions'
let width = Dimensions.get('window').width;
class Home extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation, screenProps }) => ({

  })
  componentDidMount () {
    console.log(this.props.navigation)
  }
  render() {
    return (
        <Navigator />
    );
  }
}

const TabRouteConfigs = {
  HomePage: {
    screen: UserListView,
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: '首页',
      tabBarIcon: ({ focused, tintColor }) => (
        <TabBarItem
          tintColor={tintColor}
          focused={focused}
          normalImage={{ uri: 'home' }}
          selectedImage={{ uri: 'activity_home' }}
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
  initialRouteName: 'HomePage',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
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
const Tab = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);
//定义栈路由
const StackRouteConfigs = {
  Tab: {
    screen: Tab,
    navigationOptions: {
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
const Navigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs)
const styles = StyleSheet.create({

});


const mapStateToProps = state => ({
  isShowtab: state.showTab
})

export default connect(mapStateToProps)(Home);
