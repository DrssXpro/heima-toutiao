<template>
  <div class="list-container">
    <el-row>
      <el-col :span="3" v-for="item in fans" :key="item.id">
        <div class="fans-box">
          <el-avatar :size="100" :src="item.photo">
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          <span class="name">{{ item.name }}</span>
          <el-button type="primary" plain @click="handleSub(item.id)"
            >+关注</el-button
          >
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created() {
    this.getFansData();
  },
  data() {
    return {
      fans: [],
      total_count: 0,
    };
  },
  methods: {
    //获取粉丝数据
    getFansData() {
      this.$store.dispatch("m_fan/getFans", 1).then((res) => {
        this.fans = this.$store.state.m_fan.Fans;
        this.total_count = res;
      });
    },
    handleSub(id) {
      console.log("关注", id);
    },
  },
};
</script>

<style lang="less">
.fans-box {
  width: 150px;
  height: 250px;
  border: 1px dashed rgb(184, 182, 182);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
