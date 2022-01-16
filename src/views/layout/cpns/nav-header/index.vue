<template>
  <div class="content">
    <div class="content-title">
      <i :class="navStyle" @click="changeState"></i>
      <span class="text">江苏传智播客科技教育有限公司</span>
    </div>
    <div class="content-login">
      <el-avatar
        shape="square"
        :size="30"
        :src="squareUrl"
        class="header-image"
      ></el-avatar>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="person">个人中心</el-dropdown-item>
          <el-dropdown-item command="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { PersonInfoRequest } from "../../../../service/user_request";
import Cache from "../../../../utils/cache";
export default {
  data() {
    return {
      name: "",
      squareUrl: "",
      navStyle: "el-icon-s-fold icon-size",
      isCollapse: false,
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    //获取用户信息：头像和名称
    getUserInfo() {
      PersonInfoRequest().then((res) => {
        this.name = res.data.data.name;
        this.squareUrl = res.data.data.photo;
      });
    },
    //退出登录的处理
    handleCommand(Command) {
      if (Command === "person") {
        //查看个人中心
        this.$message({
          message: "该功能还未开发!",
          type: "warning",
          center: true,
        });
        return;
      } else if (Command === "exit") {
        //退出登录功能，先将本地缓存token移除
        Cache.deleteItem("token");
        this.$message({
          message: "退出成功!",
          type: "success",
          center: true,
        });
        //路由定向到登录界面
        this.$router.push("/login");
      }
    },
    //导航栏伸缩事件
    changeState() {
      if (!this.isCollapse) {
        this.navStyle = "el-icon-s-unfold icon-size";
      } else {
        this.navStyle = "el-icon-s-fold icon-size";
      }  
      this.isCollapse = !this.isCollapse;
      this.$emit("changeNav", this.isCollapse);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .content-title {
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-size {
      font-size: 25px;
      margin-right: 5px;
      cursor: pointer;
    }
  }
  .content-login {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 700;
    .header-image {
      margin-right: 15px;
    }
  }
}
</style>
