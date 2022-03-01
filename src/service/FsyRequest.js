import axios from "axios";
import Cache from "../utils/cache";
import router from "../router";
import JSONbig from "json-bigint";
//创建axios实例
const MyRequest = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net",
  timeout: "5000",
  transformResponse: [
    function (data) {
      try {
        return JSONbig.parse(data);
      } catch (err) {
        return data;
      }
    },
  ],
});

//配置请求拦截器：为每个请求添加token
MyRequest.interceptors.request.use((config) => {
  const token = Cache.getItem("token");
  //如果在本地已经存储了token，则将所有请求头都添加上token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//配置响应拦截器：判断token是否有效
MyRequest.interceptors.response.use(
  (response) => {
    //响应码正常会来到这里
    return response;
  },
  (err) => {
    //无权限获取数据
    if (err.response && err.response.status === 401) {
      Cache.deleteItem("token");
      router.push("/login");
    }

    return Promise.reject(err);
  }
);
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
  put_editArticle(url, data, config) {
    return MyRequest.put(url, data, config);
  }
  put_changeCollect(url, collect) {
    return MyRequest.put(url, { collect });
  }

  put_changeCommentStatus(url, allow_comment) {
    return MyRequest.put(url, { allow_comment });
  }

  postImage(data) {
    return MyRequest({
      method: "POST",
      url: "/mp/v1_0/user/images",
      data,
    });
  }
  patch_editPhoto(url, data) {
    return MyRequest.patch(url, data);
  }
  patch_editProfile(url, data) {
    return MyRequest.patch(url, data);
  }
}

export default new FsyRequest();
