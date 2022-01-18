<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <bread-crumb title="发布文章"></bread-crumb>
      </div>
      <div class="text item">
        <el-form ref="form" :model="form" label-width="50px">
          <el-form-item label="标题:">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input type="textarea" v-model="article.content"></el-input>
          </el-form-item>
          <el-form-item label="封面:">
            <el-radio-group v-model="form.cover">
              <el-radio label="单图"></el-radio>
              <el-radio label="三图"></el-radio>
              <el-radio label="无图"></el-radio>
              <el-radio label="自动"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <my-channels />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">发表</el-button>
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
export default {
  components: {
    breadCrumb,
    myChannels,
  },
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style></style>
