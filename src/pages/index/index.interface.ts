/**
 * index.state 参数类型
 *
 * @export
 * @interface IndexState
 */
export interface IndexState {

}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
  dispatch?: any,
  data?: Array<DataInterface>
}

export interface DataInterface {
  author: AuthorInterface,
  author_id: string,
  content: string,
  create_at: string,
  title: string,
  id: string
  // last_reply_at: string
  reply_count: number,
  good: boolean,
  top: boolean,
  visit_count: number
}

export interface AuthorInterface {
  loginname: string,
  avatar_url: string,
}
