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
  Button,
  TouchableOpacity,
  ScrollView,
  WebView,
  Dimensions,
  Animated,
  Easing,
  Alert,
  ActivityIndicator,
  ProgressViewIOS,
} from 'react-native';
import Video from 'react-native-video';
import MainStyle from '../../MainStyle/MainStyle';
import icons  from '../../icons/icons';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {scaleSize,setSpText} from '../../ScreenUtil/ScreenUtil';
var TimerMixin = require('react-timer-mixin');
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;
export default class DetailArticle extends Component {
  constructor(props){
    super(props);
    this.state = {
      docid: this.props.navigation.state.params.item.docid,
      articleInfo: {},
      gentie: this.props.navigation.state.params.item.replyCount+'跟帖',
      genttie1: '已经有'+this.props.navigation.state.params.item.replyCount + '人跟帖',
      arcBodyInfoArr: [],
      html: '',
      docheight: 0,
      fadeAnima: new Animated.Value(0),
      widthAnima: new Animated.Value(0),
      backgroundColorAnima: new Animated.Value(0),
      fontColorAnima: new Animated.Value(0),
      isTrue: false,
      fadeAnima1: new Animated.Value(0),
      loaded: false,
      webloadprogress:0,
      progressOpacity: new Animated.Value(0),
      progressWidth: new Animated.Value(0),
      opn:scaleSize(2),
      
    };
  }
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    //左侧标题
    // headerTitle: '我是详细文章页面',
    //顶部标题栏文字的样式
    // headerTitleStyle: {
    //   color: 'red'
    // },
    //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
    headerBackTitle: null,
    // headerLeft: (
      
    // ),
    // headerRight: (
      
    // ),
    header: null,
    //顶部标题栏的样式
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
    },
   
  })
  onMessage(e) {
    if (this.WebView) {
      this.WebView.postMessage('msg("muddong")');
     }
    console.log(e.nativeEvent)
    console.log(e.nativeEvent.data);
  }
  componentDidMount() {
    //在static中使用this方法  
    // this.props.navigation.setParams({
    //   navigatePress: () => this.props.navigation.goBack(),
    //   gentie: this.props.navigation.state.params.item.replyCount
    // })
    console.log(this.state.opn);
    this.fetchData();
    Animated.timing(this.state.progressWidth,{  //显示加载webview加载控制条
      toValue: 1,
      duration:2000,
      Easing: Easing.bezier(.25,.79,.87,.31),
    }).start()
    // this.updateProgress();
  }
  componentWillUnmount () {
    clearTimeout(this.timer)
  }
  // updateProgress() {
  //   var webloadprogress = this.state.webloadprogress + 0.01;
  //   if (webloadprogress == 0.9) {
  //     cancelAnimationFrame(this.requestAni)
  //   }
  //   this.setState({ webloadprogress, });
  //   this.requestAni=setInterval(() => {
  //     this.updateProgress();
  //   },100);
   
  // }
  render() {
    const { goBack,state } = this.props.navigation;
    let timing = Animated.timing;
    // if(!this.state.loaded) {  数据没有加载完成，显示该View
    //   return (
    //     <View style={MainStyle.container}>
    //       <ActivityIndicator/>
    //     </View>
    //   );
    // }
    return (
      <View style={MainStyle.colorwhite}>
        <View style={styles.Detailheader}>
          {/* 顶部左边返回按钮 */}
          <TouchableOpacity onPress={() => goBack()} activeOpacity={1}>  
            <View style={styles.headerLeftStyle}>
              <Image source={{ uri: icons.back }} style={{ width: scaleSize(50), height: scaleSize(50), tintColor: '#555' }} />
            </View>
          </TouchableOpacity>
          {/* 顶部右边跟帖数量 */}
          <Animated.View style={[styles.headerRightStyle, {   
              width: this.state.widthAnima.interpolate({
                inputRange: [0, 1],
                outputRange: [scaleSize(200), scaleSize(400)]
              }),
              backgroundColor: this.state.backgroundColorAnima.interpolate({
                inputRange: [0, 1],
                outputRange: ['#fff', 'rgb(255,8,42)']
              })
            }]}>
            <Animated.Text style={{
              fontSize: setSpText(14), fontWeight: '900', position: 'absolute', justifyContent: 'center', alignItems: 'center',
              color: this.state.fontColorAnima.interpolate({
                inputRange: [0,1],
                outputRange: ['rgb(255,8,42)','#fff']
              }),
              opacity: this.state.fadeAnima.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0]
              }),
              }}>{this.state.gentie}
            </Animated.Text>
            <Animated.Text style={{
              fontSize: setSpText(14), fontWeight: '900',position:'absolute',justifyContent:'center',alignItems:'center',
              color: this.state.fontColorAnima.interpolate({
                inputRange: [0, 1],
                outputRange: ['rgb(255,8,42)', '#fff']
              }),
              opacity: this.state.fadeAnima1.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              }),
            }}>{this.state.genttie1}
            </Animated.Text>
          </Animated.View>
          {/* 顶部右边跟帖数量结束 */}
        </View>
        {/* 进度条 */}
        <View>
          {/* <View style={{ width: width, height: scaleSize(4),backgroundColor:'#fff',position:'absolute',zIndex:1,opacity: this.state.opn}}>

          </View> */}
          <Animated.View
            style={{
              width: this.state.progressWidth.interpolate({
                inputRange: [0, 1],
                outputRange: [0, width * 0.95]
              }),
              height: this.state.opn,
              backgroundColor: 'red',
            }}>
          </Animated.View>
        </View>
    
          <ScrollView
            onScroll={(e) => { 
            // console.log(e.nativeEvent.contentOffset.y)
            if (e.nativeEvent.contentOffset.y >= 105.5) {
              Animated.parallel(['fadeAnima1', 'fadeAnima', 'widthAnima', 'backgroundColorAnima', 'fontColorAnima'].map((property) => {
                return timing(this.state[property], {
                  toValue: 1,
                  duration: 100,
                  easing: Easing.linear
                });
              })).start();
            } else {
              Animated.parallel(['fadeAnima1', 'fadeAnima','widthAnima', 'backgroundColorAnima', 'fontColorAnima'].map((property) => {
                return timing(this.state[property], {
                  toValue: 0,
                  duration: 100,
                  easing: Easing.linear
                });
              })).start();
            }
          
          }}
            scrollEventThrottle={0.5}
          >
            {/* <WebView
              ref='webview'
              scrollEnabled={false}
              source={{ html: this.state.html }}
              style={[styles.webview,{height:this.state.docheight}]}
              // onNavigationStateChange={(event) => { console.log(event) }}
              // onScroll={()=>console.log('gongdong')}
              javaScriptEnabled={true}
              // startInLoadingState = {true}
              injectedJavaScript="document.addEventListener('message', function(e) {eval(e.data);});"
              onMessage={this.onMessage.bind(this)}
              onNavigationStateChange={(title) => {
                console.log(title.title)
              if (title.title != undefined) {
                this.setState({
                  docheight: (parseInt(title.title) + 20)
                })
              }
            }}/> */}
            
          <AutoHeightWebView
            source={{ html: this.state.html }}
            onMessage={(e) => this.onMessage(e)}
            onLoad={() => {
              this.timer = setTimeout(() => {
                this.setState({
                  opn: 0,
                })
              }, 2000);}}
            // customScript={`document.body.style.background = 'lightyellow';`}
          />
        </ScrollView>
      </View>
    );
  }
  fetchData() {
    // console.log(this.state.id)
    const REQUEST_URL = `https://c.m.163.com/nc/article/${this.state.docid}/full.html`;
    fetch(REQUEST_URL)
      .then(res => res.json())
      .then(resData => {
        // 请求获得的所有的数据
        let allData = resData[this.state.docid]
        // 请求获得的图片数据
        let imgArr = allData['img']
        //请求获得的视频数据
        let videoArr  = allData['video'];
        //请求获得的body数据
        let bodyHtml = allData['body'].replace(/<p>/g, '<p style="font-size:16px;padding:0px;margin:10px;color:#333">')
        //设置头部数据
        let headerHtml = '<div onclick="onMuddong()" style="padding-left:13px;padding-right:13px;"><h1 style="font-size:24px;padding:0;margin:0;">' + allData['title'] + '</h1><div style="display:flex;flex-direction:row;justify-content:space-between;margin-bottom:20px;"><div><div><p style="font-size:14px;padding:0;margin:0;color:#333;">' + allData['source'] + '</p></div><div><p id="pubtime" style="font-size:14px;padding:0;margin:0;color:rgb(175,175,175);">' + allData['ptime'] +'</p ></div></div><div style="background:red;justify-content:center;align-items:center;display:flex;width:100px;height:30px;border-radius:150px;"><p style="font-size:16px;font-weight:900;padding:0;margin:0;color:white">+订阅</p></div></div>';
        if (imgArr !== undefined && imgArr.length > 0 ) {
          for (let i = 0; i < imgArr.length;i++) {
            bodyHtml = bodyHtml.replace(imgArr[i].ref, '<image src="'+imgArr[i]['src']+'" style="width:100%;">')
          }
        }
        if (videoArr !== undefined && videoArr.length> 0) {
          for (let i = 0; i < videoArr.length;i++) {
            bodyHtml = bodyHtml.replace(videoArr[i].ref, '<video controls width="100%"  poster="' + videoArr[i]['cover']+'"><source src="' + videoArr[i]['mp4_url'] +'" type="video/mp4"/></video> ')
          }
        }
        let scripthtml = '<script>function onMuddong(){window.postMessage(document.body.clientHeight);function msg(event){ document.writ("even:" + event)}} var pubtime = document.getElementById("pubtime");var pubtimetop = pubtime.offsetTop;window.onload=function(){document.title = document.body.clientHeight;}</script >'
        // console.log(imgArr)
        // console.log(videoArr)
        // console.log(headerHtml + bodyHtml);
        this.setState({
          articleInfo: allData,
          html: headerHtml + bodyHtml + scripthtml,
          
          
        });
        // console.log(this.state.html)
      })
      .catch(error => {
        console.log(error)
      })
      .done(()=>this.setState({
        loaded: true,
      }))
  }
}
const styles = StyleSheet.create({
  headerRightStyle: {
    borderTopWidth: scaleSize(1),
    borderLeftWidth: scaleSize(1),
    borderRightWidth: scaleSize(1),
    borderBottomWidth: scaleSize(1),
    borderColor: 'rgb(255,8,42)',
    borderStyle: 'solid',
    borderRadius: 20,
    position: 'absolute',
    top: scaleSize(52),
    right: scaleSize(26),
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleSize(50),
    paddingLeft: scaleSize(10),
    paddingRight: scaleSize(10),
    
  },
  headerLeftStyle: {
    position: 'absolute',
    top: scaleSize(52),
    left: scaleSize(20)
  },
  Detailheader: {
    height: scaleSize(128),
    backgroundColor: '#fff',
  },
  articleTitle: {
    fontSize:setSpText(24),
    fontWeight:'500',
    color: '#000',
    paddingLeft: scaleSize(26),
    paddingRight: scaleSize(26),
  },
  pubsourcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: scaleSize(26),
    paddingRight: scaleSize(26),
    marginTop: scaleSize(34),

  }, 
  orderarc: {
    backgroundColor: 'rgb(255,8,42)',
    paddingLeft: scaleSize(60),
    paddingRight: scaleSize(60),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: setSpText(14),
    fontWeight: 'bold'
  },
  arcptimetext: {
    color: 'rgb(175,175,175)',
    fontSize: setSpText(12)
  },
  backgroundVideo: {
    width: width - scaleSize(52),
    height: scaleSize(396),
  },
  webview: {
    overflow: 'hidden',
    // width: width-26,
    // justifyContent:'center',
    // alignItems: 'center'

  },
  // contentContainer: {
  //   height: height
  // }
});
