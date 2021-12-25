import {request} from "@/network/request";

export function loginRequest(loginForm) {
  return request({
    url: '/login',
    params:{
      username:loginForm.username,
      password:loginForm.password
    }
  })
}
