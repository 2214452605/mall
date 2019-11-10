import {request} from "./request";

//获取首页多个数据
export function getHomeMultiData() {
    return request({
      url:"/home/multidata"
    })
}

export function getHomeGoods(type,page) {
  return request({
    url:"/home/data",
    params:{
      type,
      page
    }
  });
}