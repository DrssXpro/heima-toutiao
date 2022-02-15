<template>
  <div class="login-container">
    <vue-particles
      color="#97D0F2"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#97D0F2"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="bg-position"
    >
    </vue-particles>
    <el-form ref="loginform" :model="user" :rules="rules" class="user-form">
      <h2>头条后台管理系统</h2>
      <el-form-item prop="mobile">
        <el-input
          v-model="user.mobile"
          placeholder="请输入手机号"
          class="phone"
        >
          <i slot="prefix" class="el-icon-mobile-phone"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码" class="code"
          ><i slot="prefix" class="el-icon-tickets"></i
        ></el-input>
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
import { loginRequest } from "../../service/user_request";
import Cache from "../../utils/cache";
export default {
  data() {
    return {
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      checked: false, //协议框是否勾选
      loading: false, //登录按钮状态
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          {
            pattern: /^\d{6}$/,
            message: "验证码长度为6个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      //手动点击登录按钮验证输入格式
      this.$refs["loginform"].validate((valid, err) => {
        if (!valid) {
          this.$message({
            message: "登陆失败，输入的手机号或验证码格式有误!",
            type: "warning",
            center: true,
          });
          return;
        }
        //格式验证成功后对数据进行验证
        this.login_message();
      });
    },
    login_message() {
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
          this.$message({
            message: "登录成功!",
            type: "success",
            center: true,
          });
          //登录验证成功后取出token进行本地存储
          console.log(res.data.data);
          Cache.saveItem("token", res.data.data.token);
          this.loading = false;
          //跳转到首页
          this.$router.push("/");
        })
        .catch((err) => {
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
  .bg-position {
    position: absolute;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
  }
}
</style>
