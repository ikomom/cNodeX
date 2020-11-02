import Taro, { Component, Config } from '@tarojs/taro'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import { Provider } from "@tarojs/redux";
import 'dayjs/locale/zh-cn'
import './utils/v-request';
import './app.scss'
import '../scripts/request';
import dva from './utils/dva';
import models from './models'
import Index from './pages/index'

// h5 环境中开启 React Devtools
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }
dayjs.extend(relativeTime)

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
})

const store = dvaApp.getStore();

class App extends Component {
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/mine/mine',
      'pages/article/article',
      'pages/collect/collect',
    ],
    window: {
      backgroundColor: '#fff',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/index/index',
          text: '',
          iconPath: './assets/images/home.png',
          selectedIconPath: './assets/images/home2.png',
        }, {
          pagePath: 'pages/mine/mine',
          text: '',
          iconPath: './assets/images/personal2.png',
          selectedIconPath: './assets/images/personal.png',
        },
      ]
    }
  }

  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   */
  async componentDidMount() {
    // 获取参数
    // const referrerInfo = this.$router.params.referrerInfo
    // const query = this.$router.params.query
    // console.warn("初始化", referrerInfo, query);
    // !globalData.extraData && (globalData.extraData = {})
    // if (referrerInfo && referrerInfo.extraData) {
    //   globalData.extraData = referrerInfo.extraData
    // }
    // if (query) {
    //   globalData.extraData = {
    //     ...globalData.extraData,
    //     ...query
    //   }
    // }
    // 获取设备信息
    // const sys = await Taro.getSystemInfo()
    // console.warn('设备信息', sys)
    // @ts-ignore
    wx.cloud.init({
      traceUser: true,
    });
    // Taro.cloud.callFunction({
    //   name: 'v-request',//小程序云函数的名称
    //   data: {
    //     uri: 'https://mssnn.cn',
    //   }
    // }).then((res)=>{
    //   return res
    // }).catch(e => {
    //   console.log(e);
    // })
    // wx.vrequest({
    //     url: 'https://ec2-52-197-183-123.ap-northeast-1.compute.amazonaws.com/api/v1/topics',
    //   success: ret => {
    //     console.log(ret.data);
    //   }
    // })
  }

  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

