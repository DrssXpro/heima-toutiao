<template>
  <div class="query">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <bread-crumb title="内容管理" />
      </div>
      <div class="text item">
        <el-form ref="form" label-width="50px" size="mini">
          <el-form-item label="状态:">
            <my-radio :labels="labels" :items="radioItems" />
          </el-form-item>
          <el-form-item label="频道:">
            <my-channels />
          </el-form-item>
          <el-form-item label="日期:">
            <el-date-picker
              v-model="dateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button
              type="primary"
              @click="getSearchData(1)"
              :disabled="loading"
              >筛选</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../../../components/breadCrumb.vue";
import myRadio from "../../../../components/myRadio.vue";
import myChannels from "../../../../components/myChannels.vue";
export default {
  components: {
    breadCrumb,
    myRadio,
    myChannels,
  },
  data() {
    return {
      dateTime: [], //日期范围
      channels: [], //文章频道列表
      channelId: null, //查询指定频道索引
      loading: false, //table加载loading
      currentPage: 0, //拿到分页器当前页数
      status: null, //radio的状态选择
      radioItems: ["全部", "草稿", "待审核", "审核通过", "审核失败", "已删除"], //配置myRadio组件显示内容信息
      labels: [null, 0, 1, 2, 3, 4], //配置myRadio组件labels信息
    };
  },
  //监听时间选择组件的内容，发送到store存储
  watch: {
    dateTime(newValue) {
      this.$store.commit("articles/setDateTime", newValue);
    },
  },
  methods: {
    getSearchData(page = 1) {
      this.loading = true;
      this.$store
        .dispatch("m_article/getTableArticles", page)
        .then((res) => {
          console.log(res);
          this.loading = false;
        })
        .catch((err) => this.loading = false);
    },
  },
};
</script>

<style></style>
