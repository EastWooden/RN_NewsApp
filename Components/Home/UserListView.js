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
import { TabNavigator,TabBarBottom,StackNavigator } from 'react-navigation';
import HomeHeader from './HomeHeader';
import MainStyle from '../../MainStyle/MainStyle';
import DetailArticle from './DetailArticle';
import VideoImage from './VideoImage';
import PhotosetImage from './PhotosetImage';
import DeImage from './DeImage';
import Home from './Home';
import Vscreen from '../../Components/VideoScreen/Vscreen';
import LiveCast from '../../Components/LiveBordcast/LiveCast';
import Mine from '../../Components/Mine/Mine';
import { connect } from 'react-redux';
import { isshowtab } from '../../actions/actions';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import HomeScrollableTabBar from './HomeScrollableTabBar';
let width = Dimensions.get('window').width;
class UserListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      ListData:[],
      offset:0,
      size: 10,
      loaded: false,
      newListData:[],
      isRefreshing: false,
      defaultImage:'defaultPIC',
      imageIsLoaded:false,
    }
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: (
      <HomeHeader />
    ),
  })
  componentDidMount() {
    this.fetchData();
    console.log(this.props.isShowtab.isShowtab)
  }
  componentWillUnmount() {
    // clearTimeout(this.timer);
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
      <ScrollableTabView
        tabBarUnderlineStyle={{height: 0}}
        tabBarBackgroundColor = '#fff'
        tabBarActiveTextColor= '#000'
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        tabBarTextStyle={{ fontSize: setSpText(16),fontWeight:'400'}}
        tabBarInactiveTextColor = '#555'
      >
            <FlatList
              tabLabel='头条'
              data={this.state.ListData}
              renderItem={({ index, item }) => this._renderListItem(index, item)}
              ListFooterComponent={this._ListFooterComponent}
              onEndReached={this._onEndReached.bind(this)}
              onEndReachedThreshold={0.5}
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
        <View tabLabel='视频'>
          <Text>favorite</Text>
        </View>
        <View tabLabel='新时代'>
          <Text>favorite</Text>
        </View>
        <View tabLabel='娱乐'>
          <Text>favorite</Text>
        </View>
        <View tabLabel='两会'>
          <Text>favorite</Text>
        </View>
        <View tabLabel='体育'>
          <Text>favorite</Text>
        </View>
        <View tabLabel='要闻'>
          <Text>favorite</Text>
        </View>
        <View tabLabel='段子'>
          <Text>favorite</Text>
        </View>
      </ScrollableTabView>
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
        loaded: true,
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
          loaded: true,
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
              <DeImage
                defaultImage={{uri:this.state.defaultImage}}
                source={{ uri: item.imgnewextra[i].imgsrc}}
                style={{ width: (width - scaleSize(60)) / 3, height: scaleSize(144), }}
              />
          </View>
        );
      }
      return (
        <TouchableOpacity                //渲染图片数大于三的文章列表
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
    } else if (item.TAG == '视频' && index % 2 == 0) {     //渲染索引为偶数的视频列表
        return (
          <TouchableOpacity
            // underlayColor = 'rgba(0,102,204,.3)'
            activeOpacity={0.8}
            onPress={() => this.renderVideDetail(item)}
          >
            <View style={[styles.itemContainer,{flexDirection: 'column'}]}>
              <View>
                  <Text style={[styles.titleText,{paddingBottom:scaleSize(26)}]}>{item.title}</Text>
              </View>
              <View style={styles.videopiccontainer}>
                <VideoImage
                  VideoImageSrc={{ uri: item.imgsrc ? item.imgsrc :'defaultPIC'}}
                  style={{width: width-scaleSize(52),height:scaleSize(354)}}
                />
              </View>
              <View style={[styles.publicInfo, { paddingTop: scaleSize(26)}]}>
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
    } else if (item.TAG == '视频' && index % 2 !== 0) {   //渲染索引为奇数的视频列表
      return (
        <TouchableOpacity
          // underlayColor = 'rgba(0,102,204,.3)'
          activeOpacity={0.8}
          onPress={() => this.renderVideDetail(item)}
        >
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.lefttitlebox}>
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
              <VideoImage VideoImageSrc={{ uri: item.imgsrc }} style={{ width: scaleSize(230), height: scaleSize(144) }} />
            </View>
          </View>
        </TouchableOpacity>
      );
    } else if (item.tag == 'photoset') {       //渲染图集列表
      return (
        <TouchableOpacity
          // underlayColor = 'rgba(0,102,204,.3)'
          activeOpacity={0.8}
          onPress={() => this.renderDetialArticle(item)}
        >
          <View style={[styles.itemContainer, { flexDirection: 'column' }]}>
            <View>
              <Text style={[styles.titleText, { paddingBottom: scaleSize(26) }]}>{item.title}</Text>
            </View>
            <View style={styles.videopiccontainer}>
              <PhotosetImage imgsum={item.imgsum} photosetImageSrc={{ uri: item.imgsrc }} style={{ width: width - scaleSize(52), height: scaleSize(354) }}/>
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
    } else {
      return (
        <TouchableOpacity
          // underlayColor = 'rgba(0,102,204,.3)'
          activeOpacity={0.8}
          onPress={() => this.renderDetialArticle(item)}
        >
          <View style={styles.itemContainer}>
            <View style={styles.infoContainer}>
              <View style={styles.lefttitlebox}>
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
              <DeImage
                defaultImage= {{uri:this.state.defaultImage}}
                source={{ uri: item.imgsrc }}
                style={{ width: scaleSize(230), height: scaleSize(144) }} />
            </View>
          </View>
        </TouchableOpacity>
      );
    }

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
    this.timer = setTimeout(() => {
      this.fetchMoreData();
      this.state.ListData = this.state.ListData.concat(this.state.newListData);
      this.setState({
        imageIsLoaded: true,
      })
    }, 300);

  }
  //下拉刷新
  _onRefresh () {
    this.state.offset += 10;
    this.fetchData();
  }
  renderDetialArticle(item) {
    this.props.navigation.navigate('DetailArticle',{ item },{hah:false} )
  }
  renderVideDetail(item) {
    this.props.navigation.navigate('videoDetail', { item })
  }
}
const styles = StyleSheet.create({
  pubinfotext: {
    color: 'rgb(175,175,175)',
    marginRight: scaleSize(10),
    fontSize: setSpText(14),
  },
  publicInfo: {
    flexDirection: 'row',
    overflow:'hidden',
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
  },
  lefttitlebox: {
    height:scaleSize(84),
    overflow:'hidden',
  }
});

const mapStateToProps = state => ({
  isShowtab: state.showTab
})

export default connect(mapStateToProps)(UserListView);
