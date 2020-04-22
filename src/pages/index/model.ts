import Taro from "@tarojs/taro";

import Request from "../../config/api";
import Tips from "../../utils/tips";

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
    accesstoken: '',
    userInfo: {}
  },
  effects: {
    * getTopics({payload}, {call, put}) {
      // 页数从1开始，保存在本地数组中从0开始
      const params = {...payload, page: (payload.page || 0) + 1};
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
    * login({payload}, {call, put}) {
      const {accesstoken, notShowTips} = payload;
      const {success, ...loginInfo} = yield call(Request.validateAccessToken, accesstoken);
      if (success) {
        const {data} = yield call(Request.getUerInfo, loginInfo.loginname)
        yield put({type: 'saveUser', payload: {accesstoken, userInfo: data}})
        !notShowTips && Tips.toast('登录成功');
        Taro.setStorage({
          key: 'loginInfo', data: {
            accesstoken,
            loginInfo,
          }
        }).then(res => {
          console.log('登录状态保存成功', res);
        })
      } else {
        Tips.toast('accesstoken已失效，请重新输入')
      }
    },
    * loginOut(_state, {put}) {
      yield put({type: 'saveUser', payload: {accesstoken: '', userInfo: {}}})
      Taro.setStorage({key: 'loginInfo', data: {}})
    }
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
    },
    saveUser(state, {payload}) {
      return {
        ...state,
        accesstoken: payload.accesstoken,
        userInfo: payload.userInfo,
      }
    }
  }

}
