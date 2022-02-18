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
        <my-radio
          :labels="labels"
          :items="radioItems"
          @radioStatusChange="handleRadioChanged"
        />
      </el-form-item>
      <el-form-item label="频道">
        <my-channels :getChannel="channelID" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="sendCancel">取 消</el-button>
      <el-button type="primary" @click="sendReady">确 定</el-button>
    </div>
  </div>
</template>

<script>
import myChannels from "../../../../components/myChannels.vue";
import myRadio from "../../../../components/myRadio.vue";
import { editArticleRequest } from "../../../../service/article_request";
import { mapState } from "vuex";
export default {
  components: {
    myChannels,
    myRadio,
  },
  props: {
    contentId: {
      type: Number,
    },
  },
  data() {
    return {
      article: {
        title: "",
        content: "",
        cover: {
          type: -1,
          images: [],
        },
      },
      labels: [1, 3, 0, -1],
      radioItems: ["单图", "三图", "无图", "自动"],
      status: 1,
      channelID: null,
    };
  },
  //映射vuex中edit模块保存的article变量
  computed: {
    ...mapState("m_editArticle", ["editArticle"]),
  },
  //监听article变量，如果table中的编辑按钮点击，则会修改vux里的article里的值
  //通过监听来展示到该update组件上
  watch: {
    editArticle(newValue) {
      console.log(newValue.channel_id);
      this.channelID = newValue.channel_id
      this.article = newValue;
    },
  },
  methods: {
    handleRadioChanged(status) {
      console.log(status);
    },
    sendCancel() {
      this.$message({
        type: "success",
        message: "您取消了编辑！",
        center: true,
      });
      this.$emit("cancelDialog");
    },
    sendReady() {
      editArticleRequest(this.contentId, this.article).then((res) => {
        this.$message({
          type: "success",
          message: "修改成功！",
          center: true,
        });
      });
      this.$emit("readyDialog");
    },
  },
};
</script>

<style lang="less">
.dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
