<template>
  <div class="myChannels">
    <el-select v-model="channelId" placeholder="请选择频道">
      <el-option label="全部" :value="null" v-if="isAll"></el-option>
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
  props: {
    getChannel: {
      required: false,
    },
    isAll: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
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
      this.channels = this.$store.state.channels;
    });
  },
  watch: {
    //监听频道选择的id，作为事件发送给父组件
    channelId(newValue) {
      this.$emit("channelChanged", newValue);
    },
  },
};
</script>

<style></style>
