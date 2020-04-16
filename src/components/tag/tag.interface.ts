/**
 * tag.state 参数类型
 *
 * @export
 * @interface TagState
 */
export interface TagState {}
/**
 * tag.props 参数类型
 *
 * @export
 * @interface TagProps
 */
export interface TagProps {
  type: tagType,
}

type tagType = 'normal' | 'good' | 'top';
