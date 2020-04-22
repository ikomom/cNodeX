import Taro, { Component, Config } from '@tarojs/taro'
import { Button, View, Input, Image, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import { connect } from '@tarojs/redux'
import node from '../../assets/images/node.jpg'
import { MineProps, MineState, RecentInterface } from './mine.interface'
import './mine.scss'
import Tips from "../../utils/tips";
import { simpleDateDiff } from "../../utils/common";

@connect(({mine, index}) => ({
  ...mine,
  accesstoken: index.accesstoken,
  userInfo: index.userInfo
}))
class Mine extends Component<MineProps, MineState> {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  constructor(props: MineProps) {
    super(props)
    this.state = {
      inputToken: process.env.NODE_ENV === 'development' ? 'a148e5c1-4763-4df1-8ba7-6c1c13d7130a' : '',
    }
  }

  login = (accesstoken?: string) => {
    console.log("登录");
    this.props.dispatch({
      type: 'index/login',
      payload: {accesstoken: accesstoken || this.state.inputToken}
    })
  }

  scanLogin = () => {
    console.log("扫码登录")
    Taro.scanCode({}).then((r) => {
      console.log("扫码成功", r)
      if (r.result) {
        this.login(r.result);
      } else {
        throw new Error('扫码失败')
      }
    }).catch(err => {
      console.log("扫码失败", err)
      Tips.toast('扫码失败, 请重试')
    })
  }

  async saveCurrentSelect(data) {
    return this.props.dispatch({
      type: 'index/saveCurrentSelect',
      payload: {
        data
      }
    })
  }

  onListClick(item) {
    console.log('跳转开始', item)
    this.saveCurrentSelect(item)
      .then(() => {
        Taro.navigateTo({url: '/pages/article/article'}).then(res => {
            console.warn('跳转成功', res)
          }
        )
      })
  };

  renderRecentList = (title, recent: Array<RecentInterface>) => {
    return (
      <View className='recent-wrap'>
        <View className='recent-wrap-title'>{title}</View>
        {
          recent.map(item => {
            return <View key={item.id} className='recent-item' hoverClass='listClick' onClick={this.onListClick.bind(this, item)}>
              <Image src={item.author.avatar_url} lazyLoad className='avatar' />
              <View className='recent-item-right'>
                <View className='recent-item-right-author'>
                  {item.author.loginname}
                  <View className='recent-item-time'>{simpleDateDiff(item.last_reply_at)}</View>
                </View>
                <View>
                </View>
                <View className='recent-item-right-title'> {item.title}</View>
              </View>
            </View>
          })
        }
      </View>
    )
  }

  render() {
    const {inputToken} = this.state;
    const {userInfo} = this.props;
    return (
      <View className='fx-mine-wrap'>
        <View className='user-main'>
          <AtAvatar circle size='large' text='CNode' className='loginAvatar' image={userInfo.avatar_url ? userInfo.avatar_url : node} />
        </View>
        {
          this.props.accesstoken
            ? <View style='display:flex;justify-content:space-between;margin-bottom:10px'>
              <Text selectable> 用户名: {userInfo.loginname}</Text>
              <Text>积分: {userInfo.score}</Text>
              <Text> github: {userInfo.githubUsername}</Text>
            </View> : (
              <View>
                <Input placeholder='请输入accessToken' className='loginInput' value={inputToken} />
                <Button onClick={this.login.bind(this, inputToken)}>登录</Button>
                <Button onClick={this.scanLogin}>扫码登录</Button>
              </View>
            )
        }
        {
          userInfo.recent_replies && this.renderRecentList("最近参与的话题", userInfo.recent_replies)
        }
        {
          userInfo.recent_topics && this.renderRecentList("最近创建的话题", userInfo.recent_topics)
        }
      </View>
    )
  }
}

export default Mine
