<template>
  <div class="myPage">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="counter"
      :page-size="pageSize"
      @current-change="onCurrentChange"
      :disabled="loading"
      :current-page.sync="currentPage"
    />
  </div>
</template>

<script>
export default {
  props: {
    counter: {
      required: true,
    },
    DataType: {
      type: String,
      default: "article",
    },
    isCollect: {
      type: Boolean,
    },
  },
  data() {
    return {
      currentPage: 1,
      loading: false,
      pageSize: 10,
    };
  },
  created() {
    this.pageSize = this.DataType === "article" ? 10 : 12;
  },
  methods: {
    onCurrentChange(currentPage) {
      this.loading = true;
      //处理table数据中的分页点击逻辑
      if (this.DataType === "article") {
        this.$store.commit("m_article/setArticleCurrentPage", currentPage);
        this.$store
          .dispatch("m_article/getTableArticles", currentPage)
          .then(() => {
            this.loading = false;
            this.$emit("getPageArticles");
          });
      }
      //处理图片素材中的数据分页点击逻辑
      if (this.DataType === "images") {
        this.$store.commit("m_article/setImageCurrentPage", currentPage);
        let collect = this.isCollect;
        let page = currentPage
        const payload = {
          collect,
          page,
        };
        this.$store.dispatch("m_article/getImages", payload).then(() => {
          this.loading = false;
          this.$emit("getPageImages");
        });
      }
    },
  },
};
</script>

<style scoped lang="less">
.myPage {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
