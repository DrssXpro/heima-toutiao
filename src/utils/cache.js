//缓存存储方法类
class MyCache {
  saveItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  deleteItem(key){
      localStorage.removeItem(key)
  }
  clear(){
      localStorage.clear()
  }
}

export default  new MyCache