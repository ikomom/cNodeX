import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtActivityIndicator } from "taro-ui";

import { LoadMoreProps, LoadMoreState } from './LoadMore.interface'
import './LoadMore.scss'

class LoadMore extends Component<LoadMoreProps, LoadMoreState> {
  static defaultProps: LoadMoreProps = {
    isOpened: true
  }

  constructor(props: LoadMoreProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View className='fx-LoadMore-wrap'>
        <AtActivityIndicator content='loading...' mode='center' isOpened={this.props.isOpened} />
      </View>
    )
  }
}

export default LoadMore
