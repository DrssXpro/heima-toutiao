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
    isShow: {
      type: Boolean,
      default: false,
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
    //设置特定的pageSize table数据：10 素材展示：12 素材库：8
    this.pageSize = this.DataType === "images" ? 12 : 10;
    this.pageSize = this.pageSize === 12 && this.isShow ? 8 : 12;
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
        let page = currentPage;
        let per_page = this.isShow ? 8 : 12;
        const payload = {
          collect,
          page,
          per_page,
        };
        this.$store.dispatch("m_article/getImages", payload).then(() => {
          this.loading = false;
          this.$emit("getPageImages");
        });
      }
      if (this.DataType === "comments") {
        this.$store.commit("m_comment/setCurrentPage", currentPage);
        this.$store.dispatch("m_comment/getComments", currentPage).then(() => {
          this.loading = false;
          this.$emit("getComments");
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
