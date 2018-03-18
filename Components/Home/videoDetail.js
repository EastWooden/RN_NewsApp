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
} from 'react-native';
import { scaleSize, setSpText,width } from '../../ScreenUtil/ScreenUtil';
import MainStyle from '../../MainStyle/MainStyle';
import icons from '../../icons/icons';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { isshowtab } from '../../actions/actions'
class VideoDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      VideoFirstInfo:{},
      firstVideoUrl: '',
      VideoListInfo: [],
      listLength: 0,
      showFoot: false,
      
    }
    console.log(this.props.navigation); 
    console.log(this.props.navigation.state.params.item);  //获取的列表页传来的数据信息
    console.log(this.props.showTab.isShowtab);

    //获取服务器数据
    this.fetcthData();
  }
  //组件挂载之后，设置navigation的参数，之后才能在static navigation中是用方法，和变量参数
  componentDidMount() {
    this.props.dispatch(isshowtab());
    console.log(this.props.navigation)
    this.props.navigation.setParams({
      navigatePress: () => this.props.navigation.goBack(),
    })
    console.log(this.props.isShowtab.isShowtab);
  }
  //定义导航选项
  static navigationOptions = ({ navigation, screenProps }) => ({
    tabBarVisible: false,
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
          top_list = top_list.slice(0, this.state.listLength)
          this.setState({
            VideoListInfo: top_list
          })
          console.log(this.state.VideoListInfo)
        })
        .catch(error => console.log(error))
        .done()
  }
  // 渲染整个组件
  render() {
    return (
        <FlatList
          getItemLayout={(item,index)=>({ length: scaleSize(660), offset: scaleSize(660) * index, index })}
          initialNumToRender={2}
          ref={ref => this.fatlist = ref}
          extraData={this.state}
          data={this.state.VideoListInfo}
          renderItem={({ index, item }) => this.renderVideoItem(index, item)}
          // keyExtractor={({index,item}) => index}
          onEndReached={this._onEndReached.bind(this)}
          onEndReachedThreshold={0}
          ListFooterComponent={this._ListFooterComponent.bind(this)}
        />
      
    );
  }
  renderVideoItem(index,item) {
    return(
      <View>
        <Video source={{ uri: item.mp4_url }}
            ref={(ref) => {
              this.player = ref
            }}
            poster={item.cover}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={true}
            resizeMode="contain"
            repeat={false}
            playInBackground={false}
            playWhenInactive={false}
            progressUpdateInterval={250.0}
            controls={true}
            style={[styles.videoitemstyle,{opacity:1}]}
        />
        <View style={styles.videoIteminfo}>

        </View>
      </View>
    );
  }
  _onEndReached () {
    this.timer=setTimeout(() => {
      console.log(this.state.listLength)
      if (this.state.listLength >= 5) {
        this.setState({
          showFoot: true
        })
        clearTimeout(this.timer)
      } else {
        this.state.listLength += 1;
      }
      this.fetcthData();
      this.state.VideoListInfo = this.state.VideoListInfo.concat(this.state.VideoListInfo)
    }, 1000);
  }
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
    width: width,
    height: scaleSize(420),
  },
  VideoDetailheader: {
    backgroundColor:'#000',
    height:scaleSize(128),
  },
  videoIteminfo: {
    height:scaleSize(322),
    backgroundColor: 'rgba(17,17,17,1)'
  }
});

const mapStateToProps = state => ({
  isShowtab: state.showTab
})

export default connect(mapStateToProps)(VideoDetail);
