export function checkMobile(rule,value,cb){//callback
  const regMobile = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
  if (regMobile.test(value))
    return cb()
  cb(new Error('请输入正确的手机号'))
}

export function checkEmail(rule,value,cb){
  const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (regEmail.test(value))
    // 合法
    return cb();
  cb(new Error('请输入正确的邮箱'))
}
