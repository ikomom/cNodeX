import Taro, { Component } from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { ListItemProps, ListItemState } from './listItem.interface'
import './listItem.scss'
import Tag from "../tag/tag";
import { currentData, simpleDateDiff } from "../../utils/common";

class ListItem extends Component<ListItemProps, ListItemState> {
  static defaultProps: ListItemProps = {
    // @ts-ignore
    item: {},
    timeType: 'ago',
    onClick: () => {
    },
  }

  constructor(props: ListItemProps) {
    super(props)
    this.state = {
    }
  }

  render() {
    const {item, onClick, timeType} = this.props;

    return (
      <View
        className='fx-list'
        hoverClass='listClick'
        onClick={onClick}
      >
        <View className='header'>
          <View className='author'>
            <Image src={item.author.avatar_url} mode='scaleToFill' className='avatar' lazyLoad />
            <View className='loginname'>{item.author.loginname}</View>
          </View>
          <View className='tag'>
            {item.top ? <Tag type='top' /> : item.tab ? <Tag>{item.tab}</Tag> : null}
            {'\t'}
            {item.good ? <Tag type='good' /> : null}
          </View>
        </View>
        <View className='title'>{item.title}</View>
        <View className='footer'>
          <Text className='time'>  {
            timeType === 'ago' ? `更新于: ${simpleDateDiff(item.last_reply_at)}` : `创建于: ${currentData(item.create_at)}`
          }</Text>
          <View className='count'>
            <View className='visit_count' />
            {item.visit_count}
            <View style='width: 5px' />
            <View className='reply_count' />
            {item.reply_count}
          </View>
        </View>
      </View>
    )
  }
}

export default ListItem
