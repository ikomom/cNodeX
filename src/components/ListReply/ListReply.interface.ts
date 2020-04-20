/**
 * ListReply.state 参数类型
 *
 * @export
 * @interface ListReplyState
 */
import { ReplayInterface } from "../../pages/index/index.interface";
import { TimeTypeProps } from "../listItem/listItem.interface";

export interface ListReplyState {}
/**
 * ListReply.props 参数类型
 *
 * @export
 * @interface ListReplyProps
 */
export interface ListReplyProps {
  reply: ReplayInterface
  timeType?: TimeTypeProps
  index?: number
}
