// import Taro from '@tarojs/taro';

import Request from "../../config/api";

export default {
  namespace: 'article',
  state: {
    content: '',
    replies: [],
    collect: false,
  },

  effects: {
    * getTopicDetail({payload}, {call, put}) {
      try {
        const {id: topicID, accesstoken} = payload;
        const {data: topicData} = yield call(Request.getTopicDetail, topicID, accesstoken)
        if (topicData) {
          yield put({
            type: 'save',
            payload: {content: topicData.content, replies: topicData.replies, collect: topicData.is_collect}
          })
          const current = {...topicData}
          delete current.replies;
          yield put({type: 'index/saveCurrentSelect', payload: {data: current}})
        }
      } catch (e) {
        console.error(e)
      }
    },
    * changeCollect(_payload, {select, put, call}) {
      const {collect, ..._data} = yield select(({index, article}) => ({
        collect: article.collect,
        topic_id: index.currentSelectData.id,
        accesstoken: index.accesstoken
      }))
      const {success} = yield call(collect ? Request.deCollect :  Request.collect, {..._data})
      if(success) {
        yield put({type: 'save', payload: {collect: !collect}})
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

