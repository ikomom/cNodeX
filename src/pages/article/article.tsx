import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { ArticleProps, ArticleState } from './article.interface'
import './article.scss'
import ListItem from "../../components/listItem/listItem";
import MdParse from "../../components/mdparse/mdparse";
import ListReply from "../../components/ListReply/ListReply";

@connect(({article, index}) => ({...article, data: index.currentSelectData}))
class Article extends Taro.Component<ArticleProps, ArticleState> {
  config: Config = {
    navigationBarTitleText: '',
  }

  constructor(props: ArticleProps) {
    super(props)
    this.state = {}
  }

  getTopicDetail = async () => {
    return this.props.dispatch({
      type: 'article/getTopicDetail',
      payload: {
        id: this.props.data.id
      }
    })
  }

  componentDidMount() {
    this.getTopicDetail()
  }



  async componentWillUnmount() {
    await this.props.dispatch({
      type: 'article/save',
      payload: {
        content: '',
        replies: []
      }
    })
  }

  render() {
    const {data, content, replies} = this.props;
    return (
      <View className='fx-article-wrap'>
        <ListItem item={data} timeType='current' />
        <MdParse type='markdown' content={content} />
        <View className='replies' >
          {
            replies.length && replies.map((reply, index) => {
              return <ListReply key={reply.id} reply={reply} timeType='current' index={index + 1} />
            })
          }
        </View>
      </View>
    )
  }
}


export default Article
