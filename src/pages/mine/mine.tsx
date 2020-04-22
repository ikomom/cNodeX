import Taro, { Component, Config } from '@tarojs/taro'
import { Button, View, Input, Image, Text } from '@tarojs/components'
import { AtAvatar, AtListItem, AtList } from 'taro-ui'
import { connect } from '@tarojs/redux'
import node from '../../assets/images/node.jpg'
import loginOut from '../../assets/images/login_out.png'
import collectImage from '../../assets/images/collect_on.png'
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



  async logout() {
    Taro.showModal({
      content: '是否登出?'
    }).then((res) => {
      if (res.confirm) {
        this.props.dispatch({type: 'index/loginOut',})
      }

    })
  }

  async collect(loginname: string) {
    await this.props.dispatch({
      type: 'mine/getCollection',
      payload: {loginname}
    })
    Taro.navigateTo({url: '/pages/collect/collect'})
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
        Taro.navigateTo({url: '/pages/article/article?refer=mine'}).then(res => {
            console.warn('跳转成功', res)
          }
        )
      })
  };

  renderRecentList = (title, recent: Array<RecentInterface>) => {
    return (
      <AtList>
        <View className='recent-wrap-title'>{title}</View>
        {
          recent.map(item => {
            return <AtListItem
              key={item.id}
              title={item.author.loginname}
              note={item.title}
              thumb={item.author.avatar_url} hasBorder
              onClick={this.onListClick.bind(this, item)}
              extraText={simpleDateDiff(item.last_reply_at)} arrow={'right'}
            />
          })
        }
      </AtList>
    )
  }

  render() {
    const {inputToken} = this.state;
    const {userInfo} = this.props;
    return (
      <View className='fx-mine-wrap'>
        <Image src={collectImage} className='collect' hidden={!this.props.accesstoken} onClick={this.collect.bind(this, this.props.userInfo.loginname)} />
        <Image src={loginOut} className='loginOut' hidden={!this.props.accesstoken} onClick={this.logout} />
        <View className='user-main'>
          <AtAvatar
            circle size='large' text='CNode'
            className='loginAvatar'
            image={userInfo.avatar_url ? userInfo.avatar_url : node}
          />
        </View>
        {
          this.props.accesstoken
            ? <View style='display:flex;justify-content:space-between;margin-bottom:10px'>
              <Text selectable> 用户名: {userInfo.loginname}</Text>
              <Text selectable>积分: {userInfo.score}</Text>
              <Text selectable> github: {userInfo.githubUsername}</Text>
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
        <Text hidden={!!this.props.accesstoken} selectable>cnode客户端只支持accessToken登录，使用方法为:登录后打开
          https://cnodejs.org/setting 扫描二维码或者输入accessToken</Text>
      </View>
    )
  }
}

export default Mine
