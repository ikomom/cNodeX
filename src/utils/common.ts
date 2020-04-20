import dayjs from "dayjs";

/**
 * 共用函数
 */
export const repeat = (str = '0', times) => (new Array(times + 1)).join(str);
// 时间前面 +0
export const pad = (num, maxLength = 2) => repeat('0', maxLength - num.toString().length) + num;

export const pareUTCDate = (time = '') => {
  const arr = time.split(/[\-\+ :T]/).map(parseFloat);
  const date = new Date();
  date.setUTCFullYear(arr[0]);
  date.setUTCMonth(arr[1] - 1);
  date.setUTCDate(arr[2]);
  date.setUTCHours(arr[3]);
  date.setUTCMinutes(arr[4]);
  date.setUTCSeconds(arr[5]);
  return date
}

export function simpleDateDiff(time: string) {
  return dayjs(pareUTCDate(time)).locale('zh-cn').fromNow();
}

export function currentData(time: string) {
  return dayjs(pareUTCDate(time)).locale('zh-cn').format('YYYY/MM/DD H:m');
}

//一级扁平化
export function flatten(source: Array<any>) {
  const response:Array<any> = [];
  source && source.forEach((value = {}) => response.push(...value))
  return response;
}

export function isEmpty(obj){
  //检验null和undefined
  if (!obj && obj !== 0 && obj !== '') {
    return true;
  }
  //检验数组
  if (Array.prototype.isPrototypeOf(obj) && obj.length === 0) {
    return true;
  }
  //检验对象
  if (Object.prototype.isPrototypeOf(obj) && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
}
