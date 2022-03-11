import axios from "axios";

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://gxyloj.eicp.net:8094/api/private/v1/',
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
      config.headers.Authorization = window.sessionStorage.getItem('token')
      return config
    }, error => {

    }
  )

  instance.interceptors.response.use(res => {
      return res.data
    }, error => {
      console.log(error);
    }
  )

  return instance(config)
}
