<template>
  <div class="home_container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <bread-crumb></bread-crumb>
      </div>
      <div class="message">
        <h2>黑马头条后台管理系统练习</h2>
        <h3>一、技术栈：</h3>
        <h4 v-for="(item, index) in showMessage" :key="index">{{ item }}</h4>
        <h3>二、已摆烂：</h3>
        <p v-for="(item, index) in message" :key="index">{{ item }}</p>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../components/breadCrumb.vue";
export default {
  name: "home_container",
  components: {
    breadCrumb,
  },
  data() {
    return {
      showMessage: [
        "vue2",
        "vue-router",
        "vuex",
        "axios",
        "element-ui",
        "vue-particles：登录界面的粒子特效",
        "element-tiptap：富文本编辑器",
        "cropperjs：裁切图片功能",
        "echarts：图表展示",
        "json-bigint：对大数据进行解析处理(用于删除新增添的文章)",
      ],
      message: [
        "编辑文章之后没有刷新table数据，需要自己手动刷新或者重新加载页面才能看到更改效果。",
        "无法发布草稿（参数设置为true但发布了还是正常文章，开摆。）",
        "粉丝列表接口就获取到了一个数据，没法全部展示，但也做了获取数据并遍历（接口数据问题）。",
      ],
    };
  },
};
</script>

<style>
.home_container {
  height: 100%;
}
</style>
