import Request from "../../config/api";

export default {
  namespace: 'mine',
  state: {
    currentCollect: []
  },

  effects: {
    * getCollection({payload}, {put, call}) {
      const {data, success} = yield call(Request.getUserCollect, payload.loginname)
      if (success) {
        yield put({type: 'save', payload: {currentCollect: data}})
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

