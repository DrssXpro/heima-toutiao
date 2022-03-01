<template>
  <div class="upload-container" @click="dialogVisible = true">
    <div class="upload">
      <img v-if="picURL" :src="picURL" class="photo" />
      <img v-else src="../assets/images/addphoto.png" class="icon" />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="30%" append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <show-pic @getOnlineURL="handleOnlineURL"></show-pic>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <get-pic @getPicURL="handlePicURL"></get-pic>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handlePic">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import showPic from "./showPic.vue";
import getPic from "./getPic.vue";
export default {
  components: {
    showPic,
    getPic,
  },
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      picURL: "",
      picTemp: "", //临时存储子组件传来的pic地址
    };
  },
  methods: {
    //确认按钮的逻辑处理
    handlePic() {
      console.log("确认提交");
      this.dialogVisible = false;
      this.picURL = this.picTemp;
    },
    //本地选取图片子组件传来的事件
    handlePicURL(pURL) {
      this.picTemp = pURL.photo;
      this.$emit("onlineImgURL", pURL.tempURL);
    },
    //在线素材库子组件传来的事件
    handleOnlineURL(onlineURL) {
      this.picTemp = onlineURL;
      this.$emit("onlineImgURL", onlineURL);
    },
  },
};
</script>

<style lang="less">
.upload {
  width: 150px;
  height: 150px;
  margin-top: 5px;
  margin-right: 20px;
  cursor: pointer;
  border: 1px dashed rgb(226, 221, 221);
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    width: 50px;
    height: 50px;
  }
  .photo {
    width: 100%;
    height: 100%;
  }
}
</style>
