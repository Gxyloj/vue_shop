import {request} from "@/network/request";




export function getCategoryList(queryInfo){
  return request({
    url:'categories',
    method:'get',
    params:{
      type:queryInfo.type,
      pagesize:queryInfo.pagesize,
      pagenum:queryInfo.pagenum
    }
  })
}

export function getParentCategoryList(){
  return request({
    url:'categories',
    method:'get',
    params:{
      type:2
    }
  })
}


export function editCategory(cateInfo) {
  return request({
    url:`categories/${cateInfo.cat_id}`,
    method:'put',
    data:{
      cat_name:cateInfo.cat_name
    }
  })
}



export function deleteCategory(cateID){
  return request({
    url:`categories/${cateID}`,
    method:'delete'
  })
}

export function addCategory(cateInfo){
  return request({
    url:'categories',
    method:'post',
    data:{
      cat_pid:cateInfo.cat_pid,
      cat_name:cateInfo.cat_name,
      cat_level: cateInfo.cat_level
    }
  })
}

