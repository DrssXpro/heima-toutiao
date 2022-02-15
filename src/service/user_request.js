import FsyRequest from "./FsyRequest";
//登录请求的封装
export function loginRequest(data) {
  return FsyRequest.post("/mp/v1_0/authorizations", data);
}

//获取用户信息：处理用户名和头像
export function PersonInfoRequest(){
  return FsyRequest.get("/mp/v1_0/user/profile")
}