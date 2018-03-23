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
import DetailArticle from '../Home/DetailArticle';
import videoDetail from '../Home/videoDetail';
import store from '../../store';
import { isshowtab } from '../../actions/actions';
import { connect } from 'react-redux';
class Main extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }
  render() {
    return (
      <Navigator/>
    );
  }
}
const StackRouteConfigs = {
  Home: {
    screen: Home,
  },

};
const StackNavigatorConfigs = {
  initialRouteName: 'Home',
  initialRouteParams: {hah: false},
  navigationOptions: {
    header:null,
  }
};
const Navigator = StackNavigator(StackRouteConfigs, StackNavigatorConfigs)
const styles = StyleSheet.create({

});



const mapStateToProps = state => ({
  isShowtab: state.showTab
})

export default connect(mapStateToProps)(Main);
