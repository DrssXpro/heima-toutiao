<template>
  <div class="myChannels">
    <el-select v-model="channelId" placeholder="请选择频道">
      <el-option label="全部" :value="null"></el-option>
      <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="(channel, index) in channels"
        :key="index"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      channels: [],
      channelId: null,
    };
  },
  created() {
      /**
       * actions由于异步因此不能直接设置channels值
       * 在actions返回一个promise保证数据获取后再设置
       */
    this.$store.dispatch("getChannelsData").then((res) => {
      console.log(res);
      this.channels = this.$store.state.channels;
    });
  },
};
</script>

<style></style>
