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
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Dimensions,
  Animated,
  Easing,
  Slider,

} from 'react-native';
import { scaleSize, setSpText, width, height} from '../../ScreenUtil/ScreenUtil';
import MainStyle from '../../MainStyle/MainStyle';
import icons from '../../icons/icons';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls'
import DeImage from './DeImage';
let winWidth = Dimensions.get('window').width;
let winHeight = Dimensions.get('window').height;
export default class VideoDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      VideoFirstInfo:{},
      firstVideoUrl: '',
      VideoListInfo: [],
      listLength: 0,
      showFoot: false,
      defaultImage: 'defaultPIC',
      shortList: [],
      paused:false,
      itemopacity:0,
      videoWidth: winWidth,
      videoHeight: scaleSize(420),
      videoRotate: '0deg',
      isFullscreen: false,
      sliderValue: 0,
      currentTime: 0,
      file_duration:0, //视屏长度
    }
    //获取服务器数据
    this.fetcthData();


  }
  componentWillMount = () => {
    this.slciceList();
  };

  //组件挂载之后，设置navigation的参数，之后才能在static navigation中是用方法，和变量参数
  componentDidMount() {
    this.props.navigation.setParams({
      navigatePress: () => { this.props.navigation.goBack()}
    })
  }
  //定义导航选项
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerTitle: '更多视频',
    //顶部标题栏文字的样式
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: (
      <TouchableOpacity activeOpacity={1} onPress={()=>navigation.state.params.navigatePress()}>
        <View style={{ paddingLeft: scaleSize(32) }}>
          <Image source={{ uri: icons.back }} style={{ width: scaleSize(50), height: scaleSize(50), tintColor: '#fff' }} />
        </View>
      </TouchableOpacity>
    ),
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    //顶部标题栏的样式
    headerStyle: {
      backgroundColor: 'rgb(17,17,17)',
      borderBottomWidth: 0,
    },
  })
  // 获取服务器数据
  fetcthData(){
    const REQUEST_URL = `https://c.m.163.com/nc/video/detail/${this.props.navigation.state.params.item.id}.html`
      fetch(REQUEST_URL,{
        method: 'get',
        headers: {
          'Accept': '*/*',
          'User-U': '5aS05p2h',
          'UserU': '',
          'User-N': '1Yd4kJ0oDjaPjdHGj4oMOmW2lAVoytlb0TuKFgp / uBM2B + znmz6Acz + xibg8k8q1',
          'Accept-Language': 'zh-Hans; q=1.0',
          'Accept-Encoding': 'gzip; q=1.0,compress; q=0.5gzip; q=1.0, compress; q=0.5',
          'User-D': 'zJ9m4D37ey9+Rib3F4 + ylNXPKqlUg / pCg52lEEgNusoPpnrCcX4CJIoj0q2avzCI',
          'User-L': 'rv1h9zIlozInWVjlsY3X2Gbaps6d46SkxsxK2KNL22pS7IrCjrycxMelxWIeri8U',
          'X-Trace-Id': '1521012536_6180671760_647AFA55 - D079 - 4217 - 91E8 - 56A6607F85CE',
          'User-Agent': 'NewsApp/33.1 iOS/10.3.3(iPhone7, 2)',
          'Connection': 'keep - alive',
        }
      })
      .then(res=> res.json())
        .then(resData => {
          let top_list = [];
          top_list = resData.recommend;
          delete resData.recommend;
          top_list.unshift(resData)
          // top_list = top_list.slice(0, this.state.listLength)
          this.setState({
            VideoListInfo: top_list
          })
        })
        .catch(error => console.log(error))
  }
  slciceList () {
    this.setState ({
      shortList: this.state.VideoListInfo.slice(0, this.state.listLength)
    })
    //console.log(this.state.shortList)
  }
  // 渲染整个组件
  render() {
    return (
        <FlatList
          keyExtractor={(item, index) => index}
          getItemLayout={(item, index) => ({ length: scaleSize(660), offset: scaleSize(660) * index, index })}
          ref={ref => this.fatlist = ref}
          extraData={this.state}
          data={this.state.shortList}
          renderItem={({ index, item }) => this.renderVideoItem(index, item)}
          // keyExtractor={({index,item}) => index}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={0}
          ListFooterComponent={this._ListFooterComponent.bind(this)}
          style={{backgroundColor:'#rgb(17,17,17)'}}
        />
    );
  }
  renderVideoItem(index,item) {
    return(
      <View >
        <View>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log(item);
                this.setState({
                  paused: !this.state.paused,
                  itemopacity: this.state.itemopacity == 1 ? 0 : 1,
                })
                item.paused = this.state.paused;
                item.opacity = this.state.itemopacity;
              }}
              activeOpacity={1}
              style={{ justifyContent: 'center',}}
            >
              <View style={[styles.displayButton, { opacity: item.opacity === undefined ? 1 : item.opacity}]}>
                <Image
                  style={{ tintColor: 'rgba(255,255,255,1)', width: scaleSize(50), height: scaleSize(50), }}
                  source={{ uri: 'play_fill' }}
                />
              </View>
              <TouchableOpacity style={styles.fullscreenButton}
                onPress= {()=>{
                  this.setState({
                    isFullscreen: true
                  })
                  item.isFullscreen = this.state.isFullscreen;
                } }
              >
              </TouchableOpacity>
              <Video
                source={{ uri: item.mp4_url }}
                navigator={this.props.navigator}
                ref={(ref) => {
                  this.player = ref
                }}
                poster={item.cover}
                rate={1.0}
                volume={1.0}
                muted={true}
                paused={item.paused === undefined ? true : item.paused }
                fullscreen={item.isFullscreen === undefined ? false : item.isFullscreen}
                repeat={false}
                onProgress={(data) => {
                  let val = data.currentTime;
                  this.setState({
                    sliderValue: val,
                    currentTime: data.currentTime
                  })
                  item.sliderValue = Math.floor(this.state.sliderValue)
                }}
                playInBackground={false}
                playWhenInactive={false}
                progressUpdateInterval={250.0}
                onEnd ={()=>{
                  this.setState({
                  paused: true,

                })
                item.paused = this.state.paused
                }}
                controls={false}
                style={[{
                  width: winWidth,
                  height: scaleSize(420),
                  transform: [{
                    rotateZ: this.state.videoRotate
                  }],
                },
                { opacity: 1,}]}
              />
              <View style={styles.controlsStyle}>
                <View>
                  <Text style={{ color: '#fff' }}>{item.sliderValue == undefined ? 0 : item.sliderValue}</Text>
                </View>
                <Slider
                  ref='slider'
                  style={styles.videosilder}
                  value={item.sliderValue}
                  maximumValue={item.length}
                  step={1}
                  minimumTrackTintColor='rgb(255,8,42)'
                  onValueChange={(value) => {
                    this.setState({
                      currentTime: value
                    })
                  }}
                />
                <View>
                  <Text style={{ color: '#fff' }}>{parseInt(item.length / 60)}:{(item.length / 60 - parseInt(item.length / 60)).toString().substring(2,4)}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.videoIteminfo}>
            <Text style={styles.videoitemtitle}>
              {item.title}
            </Text>
            <View style={{ flexDirection: 'row', paddingLeft: scaleSize(26), paddingTop: scaleSize(20), alignItems: 'center', justifyContent: 'space-between', }}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <DeImage defaultImage={{ uri: this.state.defaultImage }} source={{ uri: item.topicImg }} style={{ width: scaleSize(68), height: scaleSize(68), borderRadius: scaleSize(34) }} />
                <Text style={styles.topicName}>{item.topicName}</Text>
              </View>
              <View style={styles.dingyuebox}>
                <Text style={{ color: '#aaa' }}>+订阅</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
  //到达顶部触发的函数
  _onEndReached () {
    this.timer=setTimeout(() => {
      if (this.state.listLength >= 20) {
        this.setState({
          showFoot: true
        })
        clearTimeout(this.timer)
      } else {
        this.state.listLength += 1;
      }
      this.slciceList();
      this.state.shortList = this.state.shortList.concat(this.state.shortList)
    }, 1000);
  }
  //FlatList底部组件
  _ListFooterComponent () {
    if (this.state.showFoot) {
      return (
        <View style={{ height: 30, alignItems: 'center', justifyContent: 'flex-start', }}>
          <Text style={{ color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,backgroundColor:'rgb(17,17,17)' }}>
            没有更多数据了
          </Text>
        </View>
      );
    }
    return(
      <View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  videoitemstyle: {

  },
  VideoDetailheader: {
    backgroundColor:'rgba(17,17,17,1)',
    height:scaleSize(128),
  },
  videoIteminfo: {
    height:scaleSize(322),
    backgroundColor: 'rgba(17,17,17,1)'
  },
  videoitemtitle: {
    color: '#aaa',
    fontSize: setSpText(18),
    fontWeight: '800',
    paddingTop: scaleSize(20),
    paddingLeft: scaleSize(26),
    paddingRight: scaleSize(50),
    lineHeight: scaleSize(50),
  },
  topicName: {
    color:'#aaa',
    paddingLeft: scaleSize(20),
    fontSize:setSpText(14),
    fontWeight: '600'
  },
  dingyuebox: {
    padding: scaleSize(20),
    paddingTop: scaleSize(5),
    paddingBottom: scaleSize(5),
    borderWidth:scaleSize(1),
    borderColor: '#aaa',
    borderStyle:'solid',
    marginRight:scaleSize(20),
    borderRadius: scaleSize(20),
  },
  displayButton: {
    position: 'absolute',
    height: scaleSize(90),
    width: scaleSize(90),
    zIndex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: scaleSize(45),
    borderWidth: 1,
    borderColor: '#fff',
    borderStyle: 'solid',
    opacity:1
  },
  fullscreenButton: {
    position:'absolute',
    bottom: scaleSize(26),
    zIndex: 1,
    right:scaleSize(26)
  },
  videosilder: {
    width:winWidth-scaleSize(200),
    zIndex:2,
    marginLeft: scaleSize(20),
    marginRight: scaleSize(20),
  },
  controlsStyle: {
    flexDirection: 'row',
    position:'absolute',
    bottom:0,
    left:0,
    justifyContent:'space-between',
    alignItems: 'center',
    paddingLeft:scaleSize(20),
    paddingRight: scaleSize(20)
  }
});

