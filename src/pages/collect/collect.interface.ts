/**
 * collect.state 参数类型
 *
 * @export
 * @interface CollectState
 */
import { DataInterface } from "../index/index.interface";

export interface CollectState {}

/**
 * collect.props 参数类型
 *
 * @export
 * @interface CollectProps
 */
export interface CollectProps {
  currentCollect: Array<DataInterface>
  dispatch?: any
}
