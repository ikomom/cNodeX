// import Taro from '@tarojs/taro';

import Request from "../../config/api";

export default {
  namespace: 'index',
  state: {
    data: [],
    v: '1.0',
  },
  effects: {
    * getTopics({payload}, {call, put}) {
      console.log('effect: getTopics', payload)
      const {data} = yield call(Request.getTopics, {...payload})
      yield put({
        type: 'save',
        payload: {
          data: data || [],
        },
      })
    }
  },

  reducers: {
    save(state, {payload}) {
      console.log('save', {...state, ...payload})
      return {...state, ...payload};
    },
  }

}
