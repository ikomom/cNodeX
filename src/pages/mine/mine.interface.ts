/**
 * mine.state 参数类型
 *
 * @export
 * @interface MineState
 */
import { AuthorInterface } from "../index/index.interface";

export interface MineState {
  inputToken: string
}

/**
 * mine.props 参数类型
 *
 * @export
 * @interface MineProps
 */
export interface MineProps {
  dispatch?: any
  accesstoken: string
  userInfo: UserInfoProps
}

export interface UserInfoProps extends AuthorInterface {
  recent_topics: Array<RecentInterface>
  recent_replies: Array<RecentInterface>
  score: number // 积分
  githubUsername: string
}

export interface RecentInterface {
  id: string
  author: AuthorInterface
  title: string
  last_reply_at: string
}
