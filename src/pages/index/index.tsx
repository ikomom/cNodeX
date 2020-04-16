import Taro, {Component, Config} from '@tarojs/taro'
import {Image, View, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AtTabs, AtTabsPane} from 'taro-ui'

import {IndexProps, IndexState} from './index.interface'
import './index.scss'
import Tag from "../../components/tag/tag";
import {formatTime} from "../../utils/common";


@connect(({index}) => ({...index}),
  () => ({}))
class Index extends Component<IndexProps, IndexState> {
  config: Config = {
    navigationBarTitleText: 'cNodeX'
  }
  private tabList: Array<any>;

  constructor(props: IndexProps) {
    super(props)
    this.state = {
      current: 0
    }
    this.tabList = [
      {title: "全部"},
      {title: "精华"},
      {title: "分享"},
      {title: "问答"},
    ]
  }

  async getTopics() {
    await this.props.dispatch({
      type: 'index/getTopics',
      payload: {

      }
    })
  }

  test() {
    Taro.getStorage({key: "list"})
      .then(async (res) => {
        await this.props.dispatch({
          type: "index/save",
          payload: {
            data: res.data,
          }
        })
      })
  }

  componentDidMount() {
    Taro.showNavigationBarLoading();
    this.getTopics().then(res => {
      console.log('res', res);
      Taro.hideNavigationBarLoading();
    });
    this.test()
  }

  componentWillReceiveProps(nextProps: Readonly<IndexProps>, nextContext: any): void {
    console.log('nextProps', nextProps, nextContext, this.props);
    // @ts-ignore
    if (this.props.data.length != nextProps.data.length) {
      Taro.setStorageSync("list", nextProps.data)
    }
  }

  renderAll() {
    const {data} = this.props
    return (
      <View className='fx-index-wrap'>
        <View className='index-topbar'></View>
        <View className='index-data'>
          {
            data && data.length
              ? data.map((item) => {
                return (
                  <View className='index-list' key={item.id}>
                    <View className='index-header'>
                      <View className='author'>
                        <Image src={item.author.avatar_url} mode='scaleToFill' className='index-img' lazyLoad />
                        <text>{item.author.loginname}</text>
                      </View>
                      <View className='tag'>
                        {item.top ? <Tag type='top' /> : item.tab? <Tag>{item.tab}</Tag> : null}
                        {'\t'}
                        {item.good ? <Tag type='good' /> : null}
                      </View>
                    </View>
                    <View className='index-title'>{item.title}</View>
                    <View className='index-footer'>
                      <Text className='time'>update: {formatTime(new Date(item.last_reply_at))}</Text>
                      <Text className='time'>{item.reply_count} / {item.visit_count}</Text>
                    </View>
                  </View>
                )
              }) : <View>Loading 。。。。。。</View>
          }
        </View>
      </View>
    )
  }

  handleClick = (index) => {
    console.log(index)
    this.setState({current: index});
  };

  render() {
    return (
      <AtTabs current={this.state.current} tabList={this.tabList} onClick={this.handleClick} >
        <AtTabsPane current={this.state.current} index={0}>
          {this.renderAll()}
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={1}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
        </AtTabsPane>
        <AtTabsPane current={this.state.current} index={2}>
          <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default Index

