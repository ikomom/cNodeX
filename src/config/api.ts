/**
 * api: https://cnodejs.org/api
 */
import request from "../utils/request";

declare type TopicTab = "ask" | "share" | "job" | "good" | "dev";
declare type topicsRequestData = {
  page: number,
  tab: TopicTab
  limit: number,
  mdrender: boolean
}

declare type CollectData = {
  accessToken: string
  top_id: string
}

class Request {
  /**
   * 主题首页
   */
  static getTopics(data: topicsRequestData) {
    return request({url: '/topics', data: {mdrender: false, ...data}});
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
        mdrender: false,
        accesstoken,
      }
    })
  }

  static validateAccessToken(accesstoken?: string) {
    return request({
      url: `/accesstoken`,
      method: 'POST',
      data: {
        accesstoken,
      }
    })
  }

  static collect(data: CollectData) {
    return request({
      url: `/topic_collect/collect`,
      method: 'POST',
      data
    })
  }

  static deCollect(data: CollectData) {
    return request({
      url: `/topic_collect/de_collect`,
      method: 'POST',
      data
    })
  }

  static getUserCollect(loginname: string) {
    return request({
      url: `/topic_collect/${loginname}`,
    })
  }

  static getUerInfo(loginname: string) {
    return request({
      url: `/user/${loginname}`,
    })
  }

  static getUnreadMessageCount(accesstoken: string) {
    return request({
      url: `/message/count`,
      data: {
        accesstoken,
      }
    })
  }

  /**
   * 获取已读和未读消息
   * @param accesstoken
   */
  static getAllMessage(accesstoken: string) {
    return request({
      url: `/messages`,
      data: {
        mdrender: false,
        accesstoken,
      }
    })
  }

  static markAllMessage(accesstoken: string) {
    return request({
      url: `/message/mark_all`,
      method: 'POST',
      data: {
        accesstoken,
      }
    })
  }

  static markOnnMessage(msg_id: string, accesstoken: string) {
    return request({
      url: `/message/mark_one/${msg_id}`,
      method: 'POST',
      data: {
        accesstoken,
      }
    })
  }

}


export default Request;
