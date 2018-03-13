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
  FlatList,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { setSpText, scaleSize } from '../../ScreenUtil/ScreenUtil'
import { TabNavigator } from 'react-navigation';
import HomeHeader from './HomeHeader';
import MainStyle from '../../MainStyle/MainStyle';
import DetailArticle from './DetailArticle';
let width = Dimensions.get('window').width;
export default class UserListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      ListData:[],
      offset:0,
      size: 10,
      loaded: false,
      newListData:[],
      isRefreshing: false,
    }
   
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    if(!this.state.loaded) {
      return (
        <View style={MainStyle.container}>
          <ActivityIndicator />
        </View> 
      );
    }
    return (
      <FlatList
        data={this.state.ListData}
        renderItem={({ index,item }) => this._renderListItem(index,item)}
        ListFooterComponent={this._ListFooterComponent}
        onEndReached={this._onEndReached.bind(this)}
        onEndReachedThreshold={0}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor="#eee"
            title="Loading..."
            titleColor="#000"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }

            // keyExtractor={this._keyExtractor}
      />
    );
  }
  //获取服务器数据
  fetchData(){
    const REQUEST_URL = `https://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=Rpic2&devId=1&size=${this.state.size}&offset=${this.state.offset}`
    fetch(REQUEST_URL)
    .then(res => res.json())
    .then(resData => {
      // console.log(resData)
      let resultData=[];
      for (let i = 0; i < resData.tid.length;i++) {
        if (resData.tid[i].lmodify !== undefined && resData.tid[i].imgsrc !== undefined) {
          resultData.push(resData.tid[i]);
        }
      }
      this.setState({
        ListData: resultData,
        loaded: true
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
  // 获取更多数据
  fetchMoreData() {
    const REQUEST_URL = `https://c.m.163.com/recommend/getSubDocPic?from=toutiao&prog=Rpic2&devId=1&size=${this.state.size}&offset=${this.state.offset}`
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(resData => {
        // console.log(resData)
        let resultData = [];
        for (let i = 0; i < resData.tid.length; i++) {
          if (resData.tid[i].lmodify !== undefined && resData.tid[i].imgsrc !== undefined) {
            resultData.push(resData.tid[i]);
          }
        }
        this.setState({
          newListData: resultData,
          loaded: true
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  // 渲染列表函数
  _renderListItem(index,item) {
    let date = new Date();
    let pttime = new Date(Date.parse(item.lmodify.replace(/-/g, '/'))); //将发布时间转换为时间格式
    let xctime = date - pttime;  //计算相隔的时间
    let hours = Math.floor(xctime / 1000 / 3600); //向下取整相隔的时间
    if (hours == 0) {
      hours = "刚刚";
    }
    else if (hours > 24) {
      hours = Math.floor((hours / 24)) + '天前';
    }
    else {
      hours = hours + '小时前';
    }
    if (item.imgnewextra !== undefined && item.imgnewextra.length >=2 ) {
      item.imgnewextra.push({'imgsrc':item.imgsrc});
      let threeImageArr=[];
      // console.log(item.imgnewextra)
      for (let i = 0; i < 3; i++) {
        threeImageArr.push(
          <View key={i}>
            <Image source={{ uri: item.imgnewextra[i].imgsrc }} style={{ width: (width - scaleSize(60)) / 3, height: scaleSize(144) }} />
          </View>
        ); 
      }
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.renderDetialArticle(item)}
        >
          <View style={[styles.itemContainer, { flexDirection: 'column' }]}>
            <View>
              <Text style={[styles.titleText, { paddingBottom: scaleSize(26) }]}>{item.title}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {threeImageArr}
            </View>
            <View style={[styles.publicInfo, { paddingTop: scaleSize(26) }]}>
              <Text style={styles.pubinfotext}>
                {item.source}
              </Text>
              <Text style={styles.pubinfotext}>
                {hours}
              </Text>
              <Text style={styles.pubinfotext}>
                {item.replyCount}跟帖
            </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        // underlayColor = 'rgba(0,102,204,.3)'
        activeOpacity={0.8}
        onPress={() => this.renderDetialArticle(item)}
      >
        <View style={styles.itemContainer}>
          <View style={styles.infoContainer}>
            <View>
              <Text style={styles.titleText}>{item.title}</Text>
            </View>
            <View style={styles.publicInfo}>
              <Text style={styles.pubinfotext}>
                {item.source}
              </Text>
              <Text style={styles.pubinfotext}>
                {hours}
              </Text>
              <Text style={styles.pubinfotext}>
                {item.replyCount}跟帖
            </Text>
            </View>
          </View>
          <View>
            <Image source={{ uri: item.imgsrc }} style={{ width: scaleSize(230), height: scaleSize(144) }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  // _keyExtractor(index,item) {
  //   return item.id
  // }
  //FlatList 底部组件
  _ListFooterComponent () {
    return (
      <View style={{flexDirection: 'row',justifyContent:'center',alignItems:'center',paddingTop:10,paddingBottom: 10}}>
        <ActivityIndicator/>
        <Text style={{color:'#ccc'}}>正在加载数据</Text>
      </View>
    );
  }
  //上拉加载
  _onEndReached () {
    this.state.offset +=10;
    this.setState({
      size: 10
    })
    setTimeout(() => {
      this.fetchMoreData();
      this.state.ListData = this.state.ListData.concat(this.state.newListData);
    }, 300);
   
  }
  //下拉刷新
  _onRefresh () {
    this.state.offset += 10;
    this.fetchData();
  }
  renderDetialArticle(item) {
    // console.log(this.props.navigation)
    this.props.navigation.navigate('DetailArticle',{ item } )
  }
}
const styles = StyleSheet.create({
  pubinfotext: {
    color: 'rgb(175,175,175)',
    marginRight: scaleSize(20),
    fontSize: setSpText(14),
    textAlignVertical: 'center'
  },
  publicInfo: {
    flexDirection: 'row'
  },
  titleText:{
    fontSize: setSpText(16),
    color:'#333'
  },
  infoContainer: {
    width: width - scaleSize(308),
    height: scaleSize(144),
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: scaleSize(26),
    paddingBottom: scaleSize(26),
    paddingLeft: scaleSize(26),
    paddingRight: scaleSize(26),
    borderBottomWidth: scaleSize(1),
    borderColor: 'rgba(226,227,229,.3)',
    backgroundColor: '#fff'
  },
  text: {
    // marginTop:100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
    // flex: 1
  }
});
