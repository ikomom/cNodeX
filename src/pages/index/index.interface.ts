/**
 * index.state 参数类型
 *
 * @export
 * @interface IndexState
 */
export interface IndexState {
  current: number
  loadMore: boolean
}

export interface LoadingInterface {
  global: boolean
  effects: { [key: string]: boolean }
  models: { [key: string]: boolean }
}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
  loading: LoadingInterface
  dispatch?: any
  data?: Array<DataInterface>
}

export interface CommonInterface {
  author: AuthorInterface
  content: string
  create_at: string
  id: string
}

export interface DataInterface extends CommonInterface {
  author_id: string
  title: string
  last_reply_at: string
  reply_count?: number
  tab?: string
  good?: boolean
  top?: boolean
  visit_count?: number
  replies?: Array<object>
  is_collect?: boolean
}

export interface AuthorInterface {
  loginname: string
  avatar_url: string
}

//单个回复
export interface ReplayInterface extends CommonInterface {
  is_uped: boolean
  reply_id: string | null
  ups: Array<string>
}
