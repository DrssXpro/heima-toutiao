import FsyRequest from "./FsyRequest";
//登录请求的封装
export function loginRequest(data) {
  return FsyRequest.post("/mp/v1_0/authorizations", data);
}

//获取用户信息：处理用户名和头像
export function PersonInfoRequest() {
  return FsyRequest.get("/mp/v1_0/user/profile");
}

//修改个人头像
export function editPhotoRequest(photo) {
  return FsyRequest.patch_editPhoto("/mp/v1_0/user/photo", photo);
}

//修改个人信息
export function editPersonInfoRequest(data) {
  return FsyRequest.patch_editProfile("/mp/v1_0/user/profile", data);
}

export function getFansList(params) {
  return FsyRequest.get("/mp/v1_0/followers", { params });
}
