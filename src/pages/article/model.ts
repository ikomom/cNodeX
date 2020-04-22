// import Taro from '@tarojs/taro';

import Request from "../../config/api";

export default {
  namespace: 'article',
  state: {
    content: '',
    replies: [],
  },

  effects: {
    * getTopicDetail({payload}, {call, put}) {
      try {
        const {id: topicID, accesstoken} = payload;
        const {data: topicData} = yield call(Request.getTopicDetail, topicID, accesstoken)
        if (topicData) {
          yield put({type: 'save', payload: {content: topicData.content}})
          yield put({type: 'save', payload: {replies: topicData.replies}})
        }
      } catch (e) {
        console.error(e)
      }
    }
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  }

}

