/**
 * api: https://cnodejs.org/api
 */
import request from "../utils/request";

declare type TopicTab = "ask" | "share" | "job" | "good";
declare type topicsRequestData = {
  page: number,
  tab: TopicTab
  limit: number,
  mdrender: boolean
}
class Request {
  // 当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
  static mdrender = 'true';

  /**
   * 主题首页
   */
  static async getTopics(data: topicsRequestData) {
    return request({url: '/topics', data: {...data}});
  }

  /**
   * 主题详情
   * @param id
   * @param accesstoken?当需要知道一个主题是否被特定用户收藏以及对应评论是否被特定用户点赞时，才需要带此参数。
   * 会影响返回值中的 is_collect 以及 replies 列表中的 is_uped 值
   */
  static getTopicDetail(id = '', accesstoken?: string) {
    return request({
      url: `/topic/${id}`,
      data: {
        mdrender: this.mdrender,
        accesstoken,
      }
    })
  }
}


export default Request;
