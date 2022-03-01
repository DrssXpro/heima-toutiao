<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <bread-crumb title="发布文章"></bread-crumb>
      </div>
      <div class="text item">
        <el-form
          ref="article-form"
          :model="article"
          :rules="formRules"
          label-width="60px"
        >
          <el-form-item label="标题:" prop="title">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容:" prop="content">
            <el-tiptap
              v-model="article.content"
              :extensions="extensions"
              height="350"
              placeholder="请输入文章内容"
            ></el-tiptap>
          </el-form-item>
          <el-form-item label="封面:">
            <my-radio
              :labels="labels"
              :items="radioItems"
              :isHasCover="true"
              @radioStatusChange="handleRadioChanged"
            />
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <my-channels
              :getChannel="article.channel_id"
              @channelChanged="handleChannelChanged"
              :isAll="false"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="publichArticle">发表</el-button>
            <el-button @click="publishDraft">存入草稿</el-button>
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
import formRules from "../../utils/formRules";
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

import {
  articlePublishRequest,
  uploadImage,
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
          type: -1,
          images: [],
        },
        channel_id: null,
      },
      labels: [1, 3, 0, -1],
      radioItems: ["单图", "三图", "无图", "自动"],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new Image({
          //自定义图片上传
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd).then((res) => {
              console.log(res);
              return res.data.data.url;
            });
          },
        }),
        new HorizontalRule(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
      ],
      formRules,
    };
  },
  methods: {
    //发布文章
    publichArticle() {
      this.HandlePublishArticle();
    },
    //发布草稿
    publishDraft() {
      this.HandlePublishArticle(true);
    },
    //文章发布处理
    HandlePublishArticle(draft = false) {
      this.$refs["article-form"].validate((valid) => {
        if (!valid) return;
        this.article.cover.images = this.$store.state.m_article.imageCoverURL;
        const Ac = this.article;
        console.log(Ac);
        const data = { ...Ac };
        articlePublishRequest(data, draft)
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
      });
    },
    //监听channel组件和radio选中内容，作为发布内容的参数
    handleChannelChanged(value) {
      this.article.channel_id = value;
    },
    handleRadioChanged(value) {
      this.article.cover.type = value;
    },
  },
};
</script>

<style></style>
