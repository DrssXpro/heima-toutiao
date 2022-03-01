<template>
  <div class="query">
    <el-card class="filter-card">
      <div slot="header">
        <bread-crumb title="内容管理" />
      </div>
      <div class="text item">
        <el-form ref="form" label-width="50px" size="mini">
          <el-form-item label="状态:">
            <my-radio
              :labels="labels"
              :items="radioItems"
              @radioStatusChange="handleRadioChanged"
              :isHasCover="false"
            />
          </el-form-item>
          <el-form-item label="频道:">
            <my-channels @channelChanged="handleChannelChanged" />
          </el-form-item>
          <el-form-item label="日期:">
            <el-date-picker
              v-model="dateTimes"
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
            <el-button
              type="warning"
              @click="refreshSearchData(1)"
              :disabled="loading"
              >重置</el-button
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
import { mapState } from "vuex";
export default {
  components: {
    breadCrumb,
    myRadio,
    myChannels,
  },
  //路由切换时刷新筛选条件
  created() {
    this.refreshSearchData();
  },
  data() {
    return {
      dateTimes: [], //日期范围
      channels: [], //文章频道列表
      loading: false, //table加载loading
      currentPage: 0, //拿到分页器当前页数
      radioItems: ["全部", "草稿", "待审核", "审核通过", "审核失败", "已删除"], //配置myRadio组件显示内容信息
      labels: [null, 0, 1, 2, 3, 4], //配置myRadio组件labels信息
    };
  },
  computed: {
    ...mapState("m_article", ["dateTime"]),
  },
  //监听时间选择组件的内容，发送到store存储
  watch: {
    dateTimes(newValue) {
      this.$store.commit("m_article/setDateTime", newValue);
    },
    dateTime(newValue) {
      this.dateTimes = newValue;
    },
  },
  methods: {
    //根据条件查询获取table
    getSearchData(page = 1) {
      this.loading = true;
      this.$store
        .dispatch("m_article/getTableArticles", page)
        .then((res) => {
          this.loading = false;
        })
        .catch((err) => (this.loading = false));
    },
    //重置条件刷新文章内容
    refreshSearchData(page = 1) {
      this.loading = true;
      this.handleRadioChanged(null);
      this.handleChannelChanged(null);
      this.handleDatePickerChanged(null);
      this.$store
        .dispatch("m_article/getTableArticles", page)
        .then((res) => {
          this.loading = false;
        })
        .catch((err) => (this.loading = false));
    },
    //修改radio、channel、Date选中筛选条件内容
    handleRadioChanged(status) {
      this.$store.commit("m_article/setRadioStatus", status);
    },
    handleChannelChanged(status) {
      this.$store.commit("m_article/setChannelStatus", status);
    },
    handleDatePickerChanged(status) {
      this.$store.commit("m_article/setDateTime", status);
    },
  },
};
</script>

<style></style>
