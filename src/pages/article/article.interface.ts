/**
 * .state 参数类型
 *
 * @export
 * @interface ArticleState
 */
import { DataInterface, ReplayInterface } from "../index/index.interface";

export interface ArticleState {
}

/**
 * article.props 参数类型
 *
 * @export
 * @interface ArticleProps
 */
export interface ArticleProps {
  data: DataInterface
  accesstoken: string
  replies: Array<ReplayInterface>
  content: string
  collect: boolean
  dispatch?: any
}

export interface TopicDetailInterface extends DataInterface{
  replies: Array<ReplayInterface>
}
