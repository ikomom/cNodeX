import Taro from '@tarojs/taro'
import { Image, Text, View } from '@tarojs/components'
import { ListReplyProps, ListReplyState } from './ListReply.interface'
import './ListReply.scss'
import { currentData, isEmpty, simpleDateDiff } from "../../utils/common";
import MdParse from "../mdparse/mdparse";

class ListReply extends Taro.Component<ListReplyProps, ListReplyState> {
  static defaultProps: { timeType: string } = {
    timeType: "ago",
  }

  constructor(props: ListReplyProps) {
    super(props)
    this.state = {}
  }

  render() {
    const {reply, timeType, index} = this.props;
    if (isEmpty(reply)) return <View />
    return (
      <View className='fx-ListReply-wrap'>
        <View className='header'>
          <View className='author'>
            <Image src={reply.author.avatar_url} mode='scaleToFill' className='avatar' lazyLoad />
            <View className='loginname'>{reply.author.loginname}</View>
          </View>
          {reply.ups.length ? <View className='icon-content'>
            {reply.ups.length || ''}
            <View style='width:5px' />
            <View className={`icon-right ${reply.is_uped ? 'icon-right-on' : ''}`} />
          </View> : null}
        </View>
        <View className='main'>
          <MdParse type='markdown' content={reply.content} />
        </View>
        <View className='footer'>
          <Text className='time'> 创建于: {
            timeType === 'ago' ? `${simpleDateDiff(reply.create_at)}` : `${currentData(reply.create_at)}`
          }</Text>
          {
            index ? <View>{index}#</View> : null
          }
        </View>
      </View>
    )
  }
}

export default ListReply
