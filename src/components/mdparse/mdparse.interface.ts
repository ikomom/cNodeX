/**
 * mdparse.state 参数类型
 *
 * @export
 * @interface MdparseState
 */
export interface MdparseState extends cptowxmlProp{

}
/**
 * mdparse.props 参数类型
 *
 * @export
 * @interface MdparseProps
 */
export interface MdparseProps {
  content: string
  type: 'html' | 'markdown'
}
