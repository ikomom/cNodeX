import { ITouchEvent } from "@tarojs/components/types/common";
import { DataInterface } from "../../pages/index/index.interface";

/**
 * listItem.state 参数类型
 *
 * @export
 * @interface ListItemState
 */
export interface ListItemState {
}
/**
 * listItem.props 参数类型
 *
 * @export
 * @interface ListItemProps
 */
export interface ListItemProps {
  item: DataInterface
  // 可变参数
  onClick?: (events: ITouchEvent, ...params: any[]) => any
  onClickAuthor?: (events: ITouchEvent, ...params: any[]) => any
  timeType?: TimeTypeProps
}

export type TimeTypeProps = 'current' | 'ago';
