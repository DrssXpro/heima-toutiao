import axios from "axios";

//创建axios实例
const MyRequest = axios.create({
  baseURL: "http://api-toutiao-web.itheima.net",
  timeout: "5000",
});

//封装axios
class FsyRequest{
  //类中主要封装请求方法
    get(url,params){
        return MyRequest.get(url,params)
    }

    post(url,data,params){
        return MyRequest.post(url,data,params)
    }
}

export default new FsyRequest
