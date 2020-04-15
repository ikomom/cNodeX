import Taro, {Component} from "@tarojs/taro";
import {ISMOCK, MAINHOST, commonParams, requestConfig} from "../config";
import Tips from "./tips";

/**
 * 封装请求
 */
declare type Methods = "GET" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
declare type Headers = { [key: string]: string };
declare type Data = { method: Methods; [key: string]: any; };

interface Options {
  url: string;
  host?: string;
  method?: Methods;
  data?: Data;
  header?: Headers;
}

export class Request {
  // 登陆时的promise
  static loginReadyPromise: Promise<any> = Promise.resolve()

  // 正在登陆
  static isLoading: boolean = false

  // 导出的API对象
  static apiLists: { [key: string]: () => any; } = {}

  // token
  static token: string = ''

  // 开始处理options
  static combineOptions(opts, data: Data, method: Methods): Options {
    typeof opts === 'string' && (opts = {url: opts})
    return {
      data: {...commonParams, ...opts.data, ...data},
      method: opts.method || data.method || method || 'GET',
      url: `${opts.host || MAINHOST}${opts.url}`
    }
  }

  static getToken() {
    !this.token && (this.token = Taro.getStorageSync('token'))
    return this.token
  }


  // 登陆
  static login() {
    if (!this.isLoading) {
      this.loginReadyPromise = this.onLogining()
    }
    return this.loginReadyPromise
  }

  static onLogining() {
    this.isLoading = true;
    return new Promise(async (_resolve, reject) => {
      // 获取code
      const {code} = await Taro.login();

      const {data} = await Taro.request({
        url: `${MAINHOST}${requestConfig.loginUrl}`,
        data: {code: code}
      })

      if (data.code !== 0 || !data.data || !data.data.token) {
        reject()
        return
      }
    })

  }

  /**
   * 基于 Taro.request 的 request 请求
   *
   * */
  static async request(opts: Options) {

    // Taro.request 请求
    const res = await Taro.request(opts);

    // 是否mock
    if (ISMOCK) return res.data;

    // 请求失败
    if (res.data.code === 99999) {
      await this.login();
      return this.request(opts)
    }

    // 请求成功
    if (res.data) {
      return res.data
    }

    // 请求错误
    const eData = {...res.data, err: (res.data && res.data.msg) || '网络错误 ~'}
    Tips.toast(eData.err)
    throw new Error(eData.err)

  }


  /**
   * 创建请求函数
   */
  static creatRequests(opts: Options | string): (data: Data, method?: Methods) => Promise<any> {
    console.log('opts==>', opts);
    return async (data, method: Methods = "GET") => {
      const _opts = this.combineOptions(opts, data, method)
      return await this.request(_opts);
    }
  }

  /**
   * 抛出API方法
   */
  // eslint-disable-next-line no-shadow
  static getApiList(requestConfig) {
    if (!Object.keys(requestConfig).length) {
      return {}
    }
    Object.keys(requestConfig).forEach((key) => {
      // @ts-ignore
      this.apiLists[key] = this.creatRequests(requestConfig[key])
    })
    return this.apiLists
  }


}

const Api = Request.getApiList(requestConfig)
Component.prototype.$api = Api
export default Api as any

