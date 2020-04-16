import Taro, {Component, Config} from '@tarojs/taro'
import {Button, View} from '@tarojs/components'
import {connect} from '@tarojs/redux'

import {IndexProps, IndexState} from './index.interface'
import './index.scss'


@connect(({index}) => ({...index}),
  () => ({

  }))
class Index extends Component<IndexProps, IndexState> {
  config: Config = {
    navigationBarTitleText: 'taro_dva_typescript'
  }

  constructor(props: IndexProps) {
    super(props)
    this.state = {
    }

  }

  async getTopics() {
    await this.props.dispatch({
      type: 'index/getTopics',
      payload: {}
    })
  }

  test() {
    Taro.getStorage({key: "list"})
      .then(async (res) => {
        await this.props.dispatch({
          type:"index/save",
          payload: {
            data: res.data,
          }
        })
      })
  }

  componentDidMount() {
    // Taro.showNavigationBarLoading();
    // this.getTopics().then(res => {
    //   console.log('res', res);
    //   Taro.hideNavigationBarLoading();
    // });
    this.test()
  }

  componentWillReceiveProps(nextProps: Readonly<IndexProps>, nextContext: any): void {
    console.log('nextProps', nextProps, nextContext, this.props);
    // @ts-ignore
    if (this.props.data.length != nextProps.data.length) {
      Taro.setStorageSync("list", nextProps.data)
    }
  }

  render() {
    const {data} = this.props
    console.log('this.props===>>', data);

    return (
      <View className='fx-index-wrap'>
        <View className='index-topbar'>New资讯</View>
        <View className='index-data'>
          {
            data && data.length
              ? data.map((item) => {
              return (
                <Button className='index-list' key={item.id}>
                  <View className='index-img' style={`background-image: url(${item.author.avatar_url})`} />
                  <View className='index-title'>{item.title}</View>
                </Button>
              )
              }): <View>Loading 。。。。。。</View>
          }
        </View>
      </View>
    )
  }
}

export default Index

