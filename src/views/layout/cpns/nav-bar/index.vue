<template>
  <div class="nav">
    <div class="nav-head">
      <p>{{ title }}</p>
    </div>
    <el-menu
      :default-active="$route.path"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :collapse-transition="false"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-document"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="el-icon-reading"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="el-icon-position"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-chat-line-square"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/fans">
        <i class="el-icon-user"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
      <el-menu-item index="/personal">
        <i class="el-icon-setting"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      nav_head: "nav-head",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
};
</script>

<style>
.el-menu {
  border-right-width: 0 !important;
}
.nav-head {
  overflow: hidden;
  background-color: #1f2d3d;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  text-align: center;
  color: #fff;
  font-size: 20px;
  letter-spacing: 0.2rem;
  font-weight: 700;
  white-space: nowrap;
}
</style>
