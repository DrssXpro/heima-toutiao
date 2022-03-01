<template>
  <div class="settings">
    <el-card class="box-card">
      <div slot="header">
        <bread-crumb title="个人设置"></bread-crumb>
      </div>
      <div class="text item">
        <el-row>
          <el-col :span="15">
            <el-form
              ref="myInfo"
              label-width="100px"
              :model="myInfo"
              :rules="rules"
            >
              <el-form-item label="编号：">
                {{ myInfo.id }}
              </el-form-item>
              <el-form-item label="手机：">
                {{ myInfo.mobile }}
              </el-form-item>
              <el-form-item label="媒体名称：" prop="name">
                <el-input autocomplete="off" v-model="myInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍：" prop="intro">
                <el-input type="textarea" v-model="myInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱：" prop="email">
                <el-input v-model="myInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="updateProfile"
                  :loading="submitLoading"
                  >保存</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :offset="2" :span="4">
            <div class="avatarBox" @click="$refs.file.click()">
              <el-avatar
                shape="square"
                :size="150"
                :src="myInfo.photo"
              ></el-avatar>
              <p>点击修改头像</p>
            </div>
            <input type="file" hidden ref="file" @change="onFileChange" />
          </el-col>
        </el-row>
      </div>
    </el-card>
    <!-- 控制图片裁切预览 -->
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      @opened="showCropper"
    >
      <div class="previewBox">
        <img :src="previewImage" class="preImage" ref="previewImage" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="onUpdatePhoto"
          :loading="dialogLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumb from "../../components/breadCrumb.vue";
import {
  PersonInfoRequest,
  editPhotoRequest,
  editPersonInfoRequest,
} from "../../service/user_request";
import globalBus from "../../utils/global-bus";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  components: {
    breadCrumb,
  },
  data() {
    return {
      myInfo: {
        email: "",
        intro: "",
        mobile: "",
        photo: "",
        id: null,
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入媒体名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 7,
            message: "名称在1-7个字符之间",
            trigger: "blur",
          },
        ],
        intro: [
          {
            required: true,
            message: "请输入媒体介绍",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur",
          },
        ],
      },
      dialogVisible: false,
      previewImage: "",
      cropper: null,
      dialogLoading: false,
      submitLoading: false,
    };
  },
  created() {
    PersonInfoRequest().then((res) => {
      this.myInfo = res.data.data;
    });
  },
  methods: {
    //修改个人信息提交
    updateProfile() {
      this.$refs["myInfo"].validate((valid) => {
        if (!valid) {
          this.$message({
            type: "warning",
            message: "表单验证失败!",
            center: true,
          });
          return;
        }
        this.submitLoading = true;
        const { name, intro, email } = this.myInfo;
        editPersonInfoRequest({
          name,
          intro,
          email,
        }).then((res) => {
          this.submitLoading = false;
          this.$message({
            type: "success",
            message: "修改个人信息成功!",
            center: true,
          });
          globalBus.$emit("updateProfile", this.myInfo);
        });
      });
    },
    // 选择头像事件
    onFileChange() {
      //用于生成文件url，绑定到image上
      const file = this.$refs.file;
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImage = blobData;
      this.dialogVisible = true;
      //解决选择相同文件不触发该函数问题
      this.$refs.file.value = "";
    },
    //打开对话框时配置裁切图片的工具
    showCropper() {
      const image = this.$refs["previewImage"];
      if (this.cropper) {
        this.cropper.replace(this.previewImage);
        return;
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: "none",
        cropBoxResizable: false,
        background: false,
        movable: true,
      });
    },
    //发送网络请求更改头像
    onUpdatePhoto() {
      this.dialogLoading = true;
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("photo", file);
        editPhotoRequest(fd).then(() => {
          this.dialogVisible = false;
          this.dialogLoading = false;
          this.myInfo.photo = window.URL.createObjectURL(file);
          this.$message({
            type: "success",
            message: "修改头像成功!",
            center: true,
          });
          globalBus.$emit("updateProfile", this.myInfo);
        });
      });
    },
  },
};
</script>

<style lang="less">
.avatarBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.previewBox {
  .preImage {
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
