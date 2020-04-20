import Taro, { Component, Config } from '@tarojs/taro'
// import { Image, View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'

import { IndexProps, IndexState } from './index.interface'
import './index.scss'
import ListItem from "../../components/listItem/listItem";
import { flatten } from "../../utils/common";


@connect(({index, loading}) => {
    return {...index, loading: loading.global}
  },
  () => ({}))
class Index extends Component<IndexProps, IndexState> {
  config: Config = {
    navigationBarTitleText: 'cNodeX',
    enablePullDownRefresh: true,
    onReachBottomDistance: 200,
  }
  private readonly tabList: Array<any>;

  constructor(props: IndexProps) {
    super(props)
    this.state = {
      current: 0
    }
    this.tabList = [
      {title: "全部", key: "all"},
      {title: "精华", key: "good"},
      {title: "分享", key: "share"},
      {title: "问答", key: "ask"},
      // {title: "招聘", key: "job", show: false},
      // {title: "客户端测试", key: "dev", show: false},
    ]
  }

  async getTopics(key, page?: number) {
    await this.props.dispatch({
      type: 'index/getTopics',
      payload: {
        limit: 15,
        tab: key,
        page
      }
    })
  }

  async clearData(key) {
    await this.props.dispatch({
      type: 'index/clearData',
      payload: {
        tab: key,
      }
    })
  }


  async componentDidMount() {
    await this.getTopics("all")
  }

  componentWillReceiveProps(nextProps: Readonly<IndexProps>): void {
    // console.log('nextProps', nextProps, nextContext, this.props);
    if (this.props.loading !== nextProps.loading) {
      if (nextProps.loading) {
        Taro.showNavigationBarLoading();
        Taro.showLoading({title: '加载中'})
      } else {
        Taro.hideNavigationBarLoading();
        Taro.hideLoading();
      }
    }
  }

  getKey = () => (this.tabList[this.state.current].key)

  async onPullDownRefresh() {
    console.warn('start: onPullDownRefresh', new Date())
    const key = this.getKey();
    // 刷新先清除旧数据
    await this.clearData(key)
    await this.getTopics(key)
    Taro.stopPullDownRefresh();
    console.warn('stop: onPullDownRefresh', new Date())
  }

  async onReachBottom() {
    const key = this.getKey();
    const {data = {}} = this.props;
    console.warn('start: onReachBottom', data);
    await this.getTopics(key, data[key].length)
  }

  async getTopicDetail(id) {
    await this.props.dispatch({
      type: 'index/getTopicDetail',
      payload: {
        id
      }
    })
  }

  handleListClick = (_event, item) => {
    this.getTopicDetail(item.id)
      .then(res => {
        console.warn('跳转成功', res);
        Taro.navigateTo({url:'/pages/article/article'})
      })
  };

  renderList = (key: string) => {
    const {data = {}} = this.props;
    return flatten(data[key]).map((item) => (
      <ListItem item={item} key={item.id} onClick={(e) => this.handleListClick(e, item)} />
    ));
  }
  /**
   * tab栏点击
   * @param index
   */
  handleClick =  (index: number) => {
    console.log("handleClick", index)
    if (!this.props.loading) {
      this.setState({current: index}, async () => {
        //空的时候自动刷新
        const key = this.tabList[index].key
        const {data = {}} = this.props;
        if (!data[key] || !data[key].length) {
          await this.getTopics(key);
        }
      })
    }
  };

  render() {
    return (
      <AtTabs onClick={this.handleClick} current={this.state.current} tabList={this.tabList}>
        {
          this.tabList.map((tab, index) => {
            return (
              <AtTabsPane key={tab.key} current={this.state.current} index={index}>
                {this.renderList(tab.key)}
              </AtTabsPane>
            )
          })
        }
      </AtTabs>
    )
  }
}

export default Index

