import FsyRequest from "./FsyRequest";

export function articleTableRequest(params) {
  return FsyRequest.get("/mp/v1_0/articles", { params });
}

export function articleChannelRequest(params) {
  return FsyRequest.get("/mp/v1_0/channels", { params });
}

export function articleDeleteRequest(id) {
  return FsyRequest.delete(`/mp/v1_0/articles/${id}`);
}
