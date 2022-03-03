<template>
  <div class="updateDialog">
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
          lang="zh"
        ></el-tiptap>
      </el-form-item>
      <el-form-item label="封面:">
        <my-radio
          :labels="labels"
          :items="radioItems"
          @radioStatusChange="handleRadioChanged"
          :isHasCover="true"
        />
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
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
import formRules from "../../../../utils/formRules";
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
  Image,
} from "element-tiptap";
import { editArticleRequest } from "../../../../service/article_request";
import { mapState } from "vuex";
export default {
  components: {
    myChannels,
    myRadio,
  },
  props: {
    contentId: {
      type: String,
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
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
      formRules,
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
      this.channelID = newValue.channel_id;
      this.article = newValue;
    },
  },
  methods: {
    handleRadioChanged(status) {
      this.article.cover.type = status;
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
      this.$refs["article-form"].validate((valid) => {
        if (!valid) return;
        editArticleRequest(this.contentId, this.article)
          .then((res) => {
            this.$message({
              type: "success",
              message: "修改成功！",
              center: true,
            });
          })
          .catch((err) => {
            this.$message({
              type: "warning",
              message: "修改失败",
              center: true,
            });
          });
        this.$emit("readyDialog");
      });
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