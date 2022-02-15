<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <bread-crumb title="发布文章"></bread-crumb>
      </div>
      <div class="text item">
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

          <el-form-item>
            <el-button type="primary" @click="publichArticle">发表</el-button>
            <el-button>存入草稿</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../components/breadCrumb.vue";
import myChannels from "../../components/myChannels.vue";
import myRadio from "../../components/myRadio.vue";

import {
  articlePublishRequest,
  getArticleContent,
  editArticleRequest,
} from "../../service/article_request";
export default {
  components: {
    breadCrumb,
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
  methods: {
    publichArticle() {
      const channel_id = this.$store.state.channelValue;
      const Ac = this.article;
      const data = { ...Ac, channel_id };
      articlePublishRequest(data).then((res) => {
        console.log(res);
      });
    },
    getArticle(id) {
      getArticleContent(id).then((res) => {
        this.article = res.data.data;
        this.channelID = res.data.data.channel_id;
        console.log(res.data.data.channel_id);
        this.$store.commit("setChannelValue",this.channelID)
        console.log("提交了");
      });
    },
  },
};
</script>

<style></style>
