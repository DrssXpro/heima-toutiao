import axios from "axios";
import Cache from "../utils/cache";
//创建axios实例
const MyRequest = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net",
  timeout: "5000",
});

//配置拦截器
MyRequest.interceptors.request.use((config) => {
  const token = Cache.getItem("token");
  //如果在本地已经存储了token，则将所有请求头都添加上token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
//封装axios
class FsyRequest {
  //类中主要封装请求方法
  get(url, config) {
    return MyRequest.get(url, config);
  }

  post(url, data, config) {
    return MyRequest.post(url, data, config);
  }

  delete(url) {
    return MyRequest.delete(url);
  }

  put(url, collect) {
    return MyRequest.put(url, { collect });
  }

  postImage(data) {
    return MyRequest({
      method: "POST",
      url: "/mp/v1_0/user/images",
      data,
    });
  }
}

export default new FsyRequest();
