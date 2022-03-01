<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
        <bread-crumb title="粉丝管理"></bread-crumb>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <fans-list></fans-list>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="charts">
          <fans-charts></fans-charts>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../components/breadCrumb.vue";
import fansList from "./cpns/fansList.vue";
import fansCharts from "./cpns/fansCharts.vue";
export default {
  components: {
    breadCrumb,
    fansList,
    fansCharts,
  },
  data() {
    return {
      activeName: "list",
    };
  },
};
</script>

<style></style>
