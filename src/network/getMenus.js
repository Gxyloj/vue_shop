import {request} from "@/network/request";

export function getMenus(){
  return request({
    url:'/menus'
  })
}
