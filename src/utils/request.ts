/**
 * 请求封装
 * @author ikonon
 * @create 2020/4/15
 */
import Taro from "@tarojs/taro";
import {baseUrl} from "../config";
import Tips from "./tips";

declare type Methods = "GET" | "POST" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
declare type Headers = { [key: string]: string };
declare type Data = { method?: Methods; [key: string]: any; } | string;

interface Options {
  url: string;
  host?: string;
  method?: Methods;
  data?: Data;
  header?: Headers;
}

const interceptor = function (chain) {
  const {requestParams} = chain
  const {method, data, url} = requestParams

  console.log(`http ${method || 'GET'} --> ${url} data: `, data)

  return chain.proceed(requestParams)
    .then(res => {
      console.log(`http <-- ${url} result:`, res)
      return res
    })
}
Taro.addInterceptor(interceptor)

console.warn("进入request页面！！！！！")

export default (opts: Options) => {
  if (!opts.method) opts.method = "GET"

  return new Promise(((resolve) => {
    Taro.request({
      ...opts,
      header: {
        "content-type": opts.method === "POST"? "application/x-www-form-urlencoded": "json",
        ...opts.header,
      },
      url: baseUrl + opts.url,
    }).then(res => {
      if (res.statusCode >= 200 || res.statusCode < 300) {
        resolve(res.data)
      } else {
        throw new Error('网络错误: ' + res.statusCode);
      }
    }).catch((err) => {
      Tips.toast(err.errMsg);
      console.warn(err)
    })
  }))
}
