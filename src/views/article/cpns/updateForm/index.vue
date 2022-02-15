<template>
  <div class="updateDialog">
    <el-form ref="form" :model="article" label-width="50px">
      <el-form-item label="标题:">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容:">
        <el-input type="textarea" v-model="article.content"></el-input>
      </el-form-item>
      <el-form-item label="封面:">
        <my-radio :labels="labels" :items="radioItems" />
      </el-form-item>
      <el-form-item label="频道">
        <my-channels :getChannel="channelID" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="sendCancel">取 消</el-button>
      <el-button type="primary" @click="sendReady"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
import myChannels from "../../../../components/myChannels.vue";
import myRadio from "../../../../components/myRadio.vue";
export default {
  components: {
    myChannels,
    myRadio,
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
        cover: {
          type: 1,
          images: [],
        },
      },
      labels: [1, 3, 0, -1],
      radioItems: ["单图", "三图", "无图", "自动"],
      status: 1,
      channelID: null,
    };
  },
  methods:{
    sendCancel(){
      this.$emit("cancelDialog")
    },
    sendReady(){
      this.$emit("readyDialog")
    }
  }
};
</script>

<style lang="less">
.dialog-footer{
  display: flex;
  justify-content: center;
  align-items:center;
}
</style>
