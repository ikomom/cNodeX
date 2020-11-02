
/**
 * 添加taro等自定义类型
 */

import Taro,{ Component } from '@tarojs/taro'

// 在Component上定义自定义方法类型
declare module '@tarojs/taro' {
  interface Component {
    $api: any
  }
}

declare global {
  interface cptowxmlProp {
    nodes: object
  }
  // 自定义jsx组件实例
  namespace JSX {
    interface IntrinsicElements {
      'cptowxml': cptowxmlProp
    }
  }
}
// 声明
declare let require: any;
declare let dispatch: any
declare var wx: any;
