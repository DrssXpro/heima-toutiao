<template>
  <div class="myPage">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="counter"
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
  },
  data() {
    return {
      currentPage: 1,
      loading: false,
    };
  },
  methods: {
    onCurrentChange(currentPage) {
      this.loading = true;
      this.$store.commit("m_article/setCurrentPage", currentPage);
      this.$store.dispatch("m_article/getTableArticles", currentPage).then((res) => {
        console.log(res);
        this.$emit("getPageArticles"); 
        this.loading = false;
      });
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
