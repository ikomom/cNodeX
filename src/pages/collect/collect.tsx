import Taro, { PureComponent, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { CollectProps, CollectState } from './collect.interface'
import './collect.scss'
import ListItem from "../../components/listItem/listItem";

@connect(({mine}) => ({
  ...mine,
}))
class Collect extends PureComponent<CollectProps, CollectState> {
  config: Config = {
    navigationBarTitleText: '收藏'
  }

  constructor(props: CollectProps) {
    super(props)
    this.state = {}
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
        Taro.navigateTo({url: '/pages/article/article?refer=collect'}).then(res => {
            console.warn('跳转成功', res)
          }
        )
      })
  };

  render() {
    return (
      <View className='fx-collect-wrap'>
        {
          this.props.currentCollect.map(item => <ListItem key={item.id} item={item} onClick={this.onListClick.bind(this, item)} />)
        }
      </View>
    )
  }
}

export default Collect
