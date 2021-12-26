import {request} from "@/network/request";
import qs from 'qs'

export function getUserList(queryInfo) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      query: queryInfo.query,
      pagenum: queryInfo.pagenum,
      pagesize: queryInfo.pagesize
    }
  })
}

export function setUserState(userinfo) {
  return request({
    url: `users/${userinfo.id}/state/${userinfo.mg_state}`,
    method: 'put'
  })
}

export function addUser(userForm) {
  return request({
    method: 'post',
    url: '/users',
    // headers: {'X-Requested-With': 'XMLHttpRequest'},
    data: {
      username:userForm.username,
      password:userForm.password
    }
  })
}
