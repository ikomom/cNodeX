import Taro, {Component} from '@tarojs/taro'
import {View} from '@tarojs/components'
import {ListItemProps, ListItemState} from './listItem.interface'
import './listItem.scss'

class ListItem extends Component<ListItemProps, ListItemState> {
  static defaultProps: ListItemProps = {}

  constructor(props: ListItemProps) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View className='fx-listItem-wrap'>
      </View>
    )
  }
}

export default ListItem
