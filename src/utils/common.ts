
/**
 * 共用函数
 */
export const repeat = (str = '0', times) => (new Array(times + 1)).join(str);
// 时间前面 +0
export const pad = (num, maxLength = 2) => repeat('0', maxLength - num.toString().length) + num;

// 全局的公共变量
export const globalData: any = {}

// 时间格式装换函数

export const formatTime = (time = new Date()) => (
  `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}`
)
