import {request} from "@/network/request";

export function getGoodsList(queryInfo){
  return request({
    url:'goods',
    methods:'get',
    params:{
      query:queryInfo.query,
      pagenum:queryInfo.pagenum,
      pagesize:queryInfo.pagesize
    }
  })
}

export function addGoods(goodsInfo){
  return request({
    url:'goods',
    method:'post',
    data:{
      goods_name:goodsInfo.goods_name,
      goods_cat:goodsInfo.goods_cat,
      goods_price:goodsInfo.goods_price,
      goods_number:goodsInfo.goods_number,
      goods_weight:goodsInfo.goods_weight,
      goods_introduce:'',
      pic:'',
      attrs:''

    }
  })
}
export function deleteGoods(id){
  return request({
    url:`goods/${id}`,
    method:'delete'
  })
}
