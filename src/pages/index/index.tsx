import Taro, { Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { AtTabs, AtTabsPane } from 'taro-ui'

import { IndexProps, IndexState } from './index.interface'
import './index.scss'
import ListItem from "../../components/listItem/listItem";
import { flatten } from "../../utils/common";
import LoadMore from "../../components/LoadMore/LoadMore";


@connect(({index, loading}) => {
    return {...index, loading}
  },
  () => ({}))
class Index extends Taro.Component<IndexProps, IndexState> {
  config: Config = {
    navigationBarTitleText: 'cNodeX',
    enablePullDownRefresh: true,
    onReachBottomDistance: 200,
  }
  private readonly tabList: Array<any>;

  constructor(props: IndexProps) {
    super(props)
    this.state = {
      current: 0,
      loadMore: false,
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
    const {accesstoken} = Taro.getStorageSync("loginInfo");
    if (accesstoken) {
      this.props.dispatch({
        type: 'index/login',
        payload: {accesstoken, notShowTips: true}
      })
    }
    Taro.onMemoryWarning(level => {
      console.warn("内存告警", level)
    })
  }

  componentWillReceiveProps(nextProps: Readonly<IndexProps>): void {
    // console.log('nextProps', nextProps, this.props);
    if (this.props.loading.models.index !== nextProps.loading.models.index) {
      nextProps.loading.global ? Taro.showNavigationBarLoading() : Taro.hideNavigationBarLoading()
      this.setState({loadMore: this.props.loading.effects['index/getTopics']})
    }
  }

  getKey = () => (this.tabList[this.state.current].key)

  async onPullDownRefresh() {
    const key = this.getKey();

    console.warn('start: onPullDownRefresh====== ' + key)
    // 刷新先清除旧数据
    await this.clearData(key)
    await this.getTopics(key)
    Taro.stopPullDownRefresh();
    console.warn('stop: onPullDownRefresh====== ' + key, new Date())
  }

  async onReachBottom() {
    const key = this.getKey();
    const {data = {}} = this.props;
    console.warn('start: onReachBottom', data);
    this.getTopics(key, data[key].length)
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

  renderList = (key: string) => {
    const {data = {}} = this.props;
    // console.error('renderList', key, flatten(data[key]))
    return flatten(data[key]).map((item) => (
      <ListItem item={item} key={item.id} onClick={this.onListClick.bind(this, item)} />
    ));
  }
  /**
   * tab栏点击
   * @param index
   */
  handleClick = (index: number) => {
    console.log("handleClick", index)
    this.setState({current: index}, () => {
      //空的时候自动刷新
      const key = this.tabList[index].key
      const {data = {}} = this.props;
      if (!data[key] || !data[key].length) {
        this.getTopics(key);
      }
    })
  };

  render() {
    return (
      <AtTabs onClick={this.handleClick} current={this.state.current} tabList={this.tabList}>
        {
          this.tabList.map((tab, index) => {
            return (
              <AtTabsPane key={tab.key} current={this.state.current} index={index}>
                {this.renderList(tab.key)}
                <LoadMore isOpened={this.state.loadMore} />
              </AtTabsPane>
            )
          })
        }
      </AtTabs>
    )
  }
}

export default Index

