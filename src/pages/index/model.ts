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
      // 页数从1开始，保存在本地数组中从0开始
      const params = {...payload, page:( payload.page || 0) + 1};
      if (payload.tab === 'all') {
        delete params.tab
      }
      const {data} = yield call(Request.getTopics, params)
      const _data = data.filter(i => {
        delete i.content;
        return i;
      })
      yield put({
        type: 'save',
        payload: {
          data: _data || [],
          tab: payload.tab,
          page: payload.page || 0,
        },
      })
    },
  },

  reducers: {
    save(state, {payload}) {
      const old = [...state.data[payload.tab]];
      old[payload.page] = payload.data;
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
