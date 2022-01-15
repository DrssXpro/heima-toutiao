<template>
  <div class="login-container">
    <el-form ref="form" :model="user" class="user-form">
      <h2>头条后台管理系统</h2>
      <el-form-item>
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox
          label="我已阅读并同意用户协议和隐私条款"
          name="type"
          v-model="checked"
        ></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin" :loading="loading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { loginRequest } from "../../service/login_request";
export default {
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      checked: false,
      loading: false,
    };
  },
  methods: {
    onLogin() {
      // 获取表单数据以及验证
      if (!this.checked) {
        this.$message({
          message: "登录失败，请先勾选协议和条款!",
          type: "warning",
          center: true,
        });
        return;
      }
      this.loading = true;
      loginRequest(this.user)
        .then((res) => {
          console.log(res);
          this.$message({
            message: "登录成功!",
            type: "success",
            center: true,
          });
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$message({
            message: "登录失败，手机号或验证码错误!",
            type: "warning",
            center: true,
          });
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  //   background: url("../../assets/images/bg.jpg");
  .img {
    position: absolute;
    right: 280px;
    bottom: 170px;
    width: 300px;
    height: 300px;
  }
  .user-form {
    width: 250px;
    height: 300px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 23px;
    background: linear-gradient(225deg, #f7f1f1, #ffffff);
    box-shadow: -5px 5px 23px #ededed, 5px -5px 23px #ffffff;
    button {
      width: 205px;
    }
    h2 {
      color: rgb(64, 158, 255);
    }
  }
}
</style>
