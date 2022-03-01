<template>
  <div class="image-container">
    <!-- radio选项 -->
    <el-radio-group v-model="isCollect" size="mini" @change="handleRadioChange">
      <el-radio-button :label="false" :disabled="imagesLoading"
        >全部</el-radio-button
      >
      <el-radio-button :label="true" :disabled="imagesLoading"
        >收藏</el-radio-button
      >
    </el-radio-group>
    <!-- 素材图片展示 -->
    <el-row :gutter="20">
      <el-col v-for="(item, index) in images" :key="index" :span="6">
        <div class="imageBox" @click="chooseImage(item, index)">
          <el-image
            style="height: 100px; width: 100px"
            :src="item.url"
          ></el-image>
          <div :class="{ cover: true, coverActive: currentImage === index }">
            <img
              src="../assets/images/icon-img.png"
              style="width: 80%; height: 80%"
            />
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <my-pagination
      :counter="Counter"
      DataType="images"
      @getPageImages="handlePageChanged"
      :isCollect="isCollect"
      :isShow="true"
    ></my-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
import myPagination from "./myPagination.vue";
export default {
  components: {
    myPagination,
  },
  data() {
    return {
      isCollect: false,
      images: [],
      Counter: 0,
      imagesLoading: false,
      currentImage: null,
    };
  },
  created() {
    this.loadImages();
  },
  computed: mapState("m_article", ["Images"]),
  methods: {
    //请求图片素材
    async loadImages(collect = false, page = 1) {
      this.imagesLoading = true;
      const res = await this.$store.dispatch("m_article/getImages", {
        collect,
        page,
        per_page: 8,
      });
      this.Counter = res;
      this.images = this.Images;
      this.imagesLoading = false;
    },
    //收藏radio切换加载图片
    handleRadioChange(value) {
      this.loadImages(value);
    },
    //点击分页加载数据
    handlePageChanged() {
      this.images = this.$store.state.m_article.Images;
    },
    //选择素材添加蒙板
    chooseImage(item, index) {
      this.currentImage = index;
      this.$emit("getOnlineURL", item.url);
    },
  },
};
</script>

<style lang="less" scoped>
.imageBox {
  width: 100px;
  height: 100px;
  margin-top: 20px;
  cursor: pointer;
  overflow: hidden;

  .cover {
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .coverActive {
    transform: translateY(-105px);
  }
}
</style>
