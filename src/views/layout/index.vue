<template>
  <div>
    <el-container class="layout_container">
      <el-aside width="auto" class="aside">
        <nav-bar
          :class="nav_bar_style"
          :isCollapse="isCollapse"
          :title="title"
        />
      </el-aside>
      <el-container>
        <el-header class="nav-header">
          <nav-header @changeNav="changeNavState" />
        </el-header>
        <el-main class="main">
          <!-- 子路由出口 -->
          <transition name="slide-left" mode="out-in">
            <router-view />
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import navBar from "./cpns/nav-bar";
import navHeader from "./cpns/nav-header";
export default {
  name: "layout_container",
  components: {
    navBar,
    navHeader,
  },
  data() {
    return {
      isCollapse: false,
      nav_bar_style: "nav-bar",
      title: "头条内容管理系统",
    };
  },
  methods: {
    changeNavState(data) {
      if (data) {
        this.nav_bar_style = "nav-bar-change";
        this.title = "";
      } else {
        this.nav_bar_style = "nav-bar";
        this.title = "头条内容管理系统";
      }
      console.log(this.$refs.nav);
      this.isCollapse = data;
    },
  },
};
</script>

<style scoped lang="less">
.layout_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.nav-bar {
  width: 200px;
  height: 100%;
  background-color: rgb(48, 65, 86);
  transition: all 0.5s;
}
.nav-bar-change {
  width: 65px;
  height: 100%;
  background-color: rgb(48, 65, 86);
  transition: all 0.5s;
}
.nav-header {
  border-bottom: 1px solid rgb(199, 198, 198);
}
.main {
  background-color: #fff;
}
.slide-left-enter {
  opacity: 0;
}
.slide-left-enter-active {
  transition: all 0.5s ease;
}
.slide-left-leave-to {
  opacity: 0;
}
.slide-left-leave-active {
  transition: all 0.5s ease;
  transform: translateX(20px);
}
</style>
