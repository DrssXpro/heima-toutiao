import FsyRequest from "./FsyRequest";

//内容管理：文章table数据
export function articleTableRequest(params) {
  return FsyRequest.get("/mp/v1_0/articles", { params });
}
//内容：频道选项请求内容
export function articleChannelRequest(params) {
  return FsyRequest.get("/mp/v1_0/channels", { params });
}
//内容管理：删除文章
export function articleDeleteRequest(id) {
  return FsyRequest.delete(`/mp/v1_0/articles/${id}`);
}
//文章发布：发表文章
export function articlePublishRequest(data, draft = false) {
  //draft:是否存为草稿
  console.log(draft);
  return FsyRequest.post("/mp/v1_0/articles", data, { params: { draft } });
}
//修改文章：文章编辑
export function editArticleRequest(id, data, draft = false) {
  return FsyRequest.put_editArticle(`/mp/v1_0/articles/${id}`, data, {
    params: { draft },
  });
}
//获取文章
export function getArticleContent(id) {
  return FsyRequest.get(`/mp/v1_0/articles/${id}`);
}

//向服务器上传图片
export function uploadImage(data) {
  return FsyRequest.postImage(data);
}

//修改评论状态
export function changeCommentStatus(id, currentStatus) {
  return FsyRequest.put_changeCommentStatus(
    `/mp/v1_0/comments/status?article_id=${id}`,
    currentStatus
  );
}
