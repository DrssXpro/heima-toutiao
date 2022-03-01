<template>
  <div class="uploadPic">
    <input type="file" @change="handleFileChanged" ref="file" hidden />
    <div class="imgBox" @click="handleUploadPic">
      <img v-if="imageURL" :src="imageURL" width="150" height="150" />
      <div v-else class="replaceBox">
        <img src="../assets/images/addphoto.png" width="50" height="50" />
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImage } from "../service/article_request";
export default {
  data() {
    return {
      imageURL: "",
    };
  },
  methods: {
    handleFileChanged() {
      const file = this.$refs.file.files[0];
      const photo = window.URL.createObjectURL(file);
      this.imageURL = photo;
      const fd = new FormData();
      fd.append("image", file);
      uploadImage(fd).then((res) => {
        let tempURL = res.data.data.url;
        this.$emit("getPicURL", { photo, tempURL });
      });
    },
    //input的点击事件映射在imgBOX上
    handleUploadPic() {
      this.$refs.file.click();
    },
  },
};
</script>

<style lang="less">
.uploadPic {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .imgBox {
    cursor: pointer;
  }
  .replaceBox {
    display: flex;
    border: 1px dashed rgb(209, 206, 206);
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
  }
}
</style>
