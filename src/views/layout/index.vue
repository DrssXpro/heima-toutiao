<template>
  <div class="layout_container">
    <el-container>
      <el-aside width="auto" class="aside" ref="nav">

        <nav-bar :class="nav_bar_style" :isCollapse="isCollapse" />
      </el-aside>
      <el-container>
        <el-header class="nav-header">
          <nav-header @changeNav="changeNavState" />
        </el-header>
        <el-main class="main"
          >Main
          <!-- 子路由出口 -->
          <router-view />
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
    };
  },
  methods: {
    changeNavState(data) {
      if (data) {
        this.nav_bar_style = "nav-bar-change";
      } else {
        this.nav_bar_style = "nav-bar";
      }
      console.log(this.$refs.nav);
      this.isCollapse = data;
    },
  },
};
</script>

<style scoped lang="less">
.aside {
  height: 100vh;
  background-color: #002033;
  .nav-bar {
    width: 200px;
    height:100%;
    background-color: #002033;
    transition: all 0.5s;
  }
  .nav-bar-change {
    width: 60px;
    height:100%;
    background-color: #002033;
    transition: all 0.5s;
  }
  .nav-head-title{
    display: block;
  }
  .nav-head-title-change{
    display: none;
  }
}

.nav-header {
  border-bottom: 1px solid rgb(199, 198, 198);
}
.main {
  background-color: #fff;
}
</style>
