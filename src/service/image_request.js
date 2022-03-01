import FsyRequest from "./FsyRequest";

//获取图片素材
export function getImages(params) {
  return FsyRequest.get("/mp/v1_0/user/images", { params });
}

//删除指定图片素材
export function deleteImage(id) {
  return FsyRequest.delete(`/mp/v1_0/user/images/${id}`);
}

//收藏指定图片素材
export function collectImage(id, isCollect) {
  return FsyRequest.put_changeCollect(`/mp/v1_0/user/images/${id}`,isCollect);
}
