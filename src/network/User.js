import {request} from "@/network/request";

export function getUserList(queryInfo){
  return request({
    url:'/users',
    method:'get',
    params:{
      query:queryInfo.query,
      pagenum:queryInfo.pagenum,
      pagesize:queryInfo.pagesize
    }
  })
}

export function setUserState(userinfo){
  return request({
    url:`users/${userinfo.id}/state/${userinfo.mg_state}`,
    method:'put'
  })
}

export function addUser(userForm){
  return request({
    url:'/users',
    method:'post',
    params:{
      // userForm
      // username:userForm.username,
      // password:userForm.password,
      // email:userForm.email,
      // mobile:userForm.mobile
      username:'aaa'
    }
  })
}
