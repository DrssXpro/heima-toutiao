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
            <el-tiptap
              v-model="article.content"
              :extensions="extensions"
              height="350"
              placeholder="请输入文章内容"
            ></el-tiptap>
          </el-form-item>
          <el-form-item label="封面:">
            <my-radio :labels="labels" :items="radioItems" />
          </el-form-item>
          <el-form-item label="频道">
            <my-channels
              :getChannel="channelID"
              @channelChanged="handleChannelChanged"
              :isAll="false"
            />
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
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Image,
} from "element-tiptap";

import { articlePublishRequest } from "../../service/article_request";

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
          type: -1,
          images: [],
        },
      },
      labels: [1, 3, 0, -1],
      radioItems: ["单图", "三图", "无图", "自动"],
      status: 1,
      channelID: null,
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new Image(),
        new HorizontalRule(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
      ],
    };
  },
  methods: {
    publichArticle() {
      const channel_id = this.channelID;
      const Ac = this.article;
      const data = { ...Ac, channel_id };
      console.log(data);
      articlePublishRequest(data)
        .then((res) => {
          this.$message({
            type: "success",
            message: "发布成功!",
            center: true,
          });
          console.log(res);
        })
        .catch((err) => {
          this.$message({
            type: "error",
            message: "发布失败!",
            center: true,
          });
          console.log(err);
        });
    },
    handleChannelChanged(value) {
      this.channelID = value;
    },
  },
};
</script>

<style></style>
