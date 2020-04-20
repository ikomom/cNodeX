import Request from "../../config/api";

export default {
  namespace: 'index',
  state: {
    data: {
      all: [],
      share: [],
      good: [],
      ask: [],
    },
    currentSelectData: {},
  },
  effects: {
    * getTopics({payload}, {call, put}) {
      console.log('effect: getTopics', payload)
      const params = {...payload};
      if (payload.tab === 'all') {
        delete params.tab
      }
      const {data} = yield call(Request.getTopics, params)
      yield put({
        type: 'save',
        payload: {
          data: data || [],
          tab: payload.tab,
          page: payload.page || 0,
        },
      })
    },
    * getTopicDetail({payload}, {call, put}) {
      try {
        const {id: topicID} = payload;
        const {data: topicData} = yield call(Request.getTopicDetail, topicID)
        if (topicData) {
          yield put({
            type: 'saveCurrentSelect',
            payload: {
              data: topicData
            },
          })
        }
      } catch (e) {
        console.error(e.errMsg)
      }
    }
  },

  reducers: {
    save(state, {payload}) {
      let old = state.data[payload.tab];
      if (old) {
        old[payload.page] = payload.data;
      }
      return {
        ...state,
        data: {
          ...state.data,
          [payload.tab]: old,
        },
      }
    },
    clearData(state, {payload}) {
      return {
        ...state,
        data: {
          ...state.data,
          [payload.tab]: [],
        },
      }
    },
    saveCurrentSelect(state, {payload}) {
      return {
        ...state,
        currentSelectData: payload.data
      }
    }
  }

}
