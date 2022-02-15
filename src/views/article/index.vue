<template>
  <div class="articles">
    <query-card class="filter-card" />
    <table-card />
  </div>
</template>

<script>
import queryCard from "./cpns/queryCard";
import tableCard from "./cpns/tableCard";
export default {
  name: "Article",
  components: {
    queryCard,
    tableCard,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 30px;
}
.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
