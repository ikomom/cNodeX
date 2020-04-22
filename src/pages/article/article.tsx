import Taro, { Config } from '@tarojs/taro'
import { Image, View } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { ArticleProps, ArticleState } from './article.interface'
import './article.scss'
import ListItem from "../../components/listItem/listItem";
import MdParse from "../../components/mdparse/mdparse";
import ListReply from "../../components/ListReply/ListReply";
import collectImage from "../../assets/images/collect.png";
import collectOnImage from "../../assets/images/collect_on.png";

@connect(({article, index}) => ({
  ...article,
  data: index.currentSelectData,
  accesstoken: index.accesstoken
}))
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
        id: this.props.data.id,
        accesstoken: this.props.accesstoken
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

  handleCollect = () => {
   this.props.dispatch({
      type: 'article/changeCollect',
      payload: {

      }
    })
  }

  render() {
    const {data, content, replies, accesstoken, collect} = this.props;
    return (
      <View className='fx-article-wrap'>
        <Image
          src={collect ? collectOnImage : collectImage} mode='scaleToFill'
          className='collect collect-article' hidden={!accesstoken}
          onClick={this.handleCollect}
        />
        <ListItem item={data} timeType='current' />
        <MdParse type='markdown' content={content} />
        <View className='replies'>
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
