<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <bread-crumb title="素材管理"></bread-crumb>
      </div>
      <div class="action-head">
        <el-radio-group
          v-model="isCollect"
          size="mini"
          @change="handleRadioChange"
        >
          <el-radio-button :label="false" :disabled="imagesLoading"
            >全部</el-radio-button
          >
          <el-radio-button :label="true" :disabled="imagesLoading"
            >收藏</el-radio-button
          >
        </el-radio-group>
        <el-button type="success" size="mini" @click="dialogTableVisible = true"
          >上传素材</el-button
        >
      </div>

      <!-- 图片列表 -->
      <div class="imageBox" v-loading="imagesLoading">
        <el-row :gutter="10">
          <el-col
            v-for="(item, index) in images"
            :key="index"
            :lg="4"
            :sm="6"
            :md="6"
            :xs="12"
          >
            <div
              class="img-box"
              @mouseover="handleMouseOver(index)"
              @mouseleave="handleMouseLeave"
            >
              <el-image
                style="height: 100px; width: 150px"
                :src="item.url"
              ></el-image>
              <div
                :class="{
                  operation: true,
                  operation_active: currentIndex === index ? true : false,
                  operation_hidde: currentIndex !== index ? true : false,
                }"
              >
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="isCollect ? '取消收藏' : '收藏图片'"
                  placement="left-start"
                >
                  <el-button
                    type="warning"
                    icon="el-icon-star-off"
                    circle
                    size="mini"
                    @click="handleCollect(item)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除图片"
                  placement="right-start"
                >
                  <el-popconfirm
                    title="确定删除这张图片？"
                    @confirm="handleDelete(item.id)"
                  >
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      slot="reference"
                    ></el-button>
                  </el-popconfirm>
                </el-tooltip>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- dialog操作 -->
      <el-dialog
        title="上传素材"
        :visible.sync="dialogTableVisible"
        append-to-body
        center
      >
        <el-upload
          class="upload-demo"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          multiple
          :headers="uploadHeaders"
          name="image"
          :on-success="uploadImageSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-dialog>
      <my-pagination
        :counter="Counter"
        DataType="images"
        @getPageImages="handlePageImage"
        :isCollect="isCollect"
      />
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "../../components/breadCrumb.vue";
import myPagination from "../../components/myPagination.vue";
import { deleteImage, collectImage } from "../../service/image_request";
import { mapState } from "vuex";
import MyCache from "../../utils/cache";
export default {
  components: {
    breadCrumb,
    myPagination,
  },
  data() {
    //获取存储到本地的token，用于图片上传
    const user = MyCache.getItem("token");
    return {
      isCollect: false, //默认查询全部素材列表
      images: [],
      Counter: 0,
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      imagesLoading: false,
      dialogTableVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user}`,
      },
      currentIndex: null,
    };
  },
  computed: mapState("m_article", ["Images", "imageCounter"]),
  created() {
    this.loadImages();
  },
  watch: {
    Images(newValue) {
      this.Counter = this.imageCounter;
      this.images = newValue;
    },
  },
  methods: {
    //请求图片素材
    async loadImages(collect = false, page = 1) {
      this.imagesLoading = true;
      const res = await this.$store.dispatch("m_article/getImages", {
        collect,
        page,
      });
      this.Counter = res;
      this.images = this.Images;
      this.imagesLoading = false;
    },
    //单选按钮处理逻辑
    handleRadioChange(value) {
      // this.isCollect = value;
      this.loadImages(value);
    },
    //上传素材成功的回调处理
    uploadImageSuccess() {
      this.dialogTableVisible = false;
      this.$message({
        type: "success",
        message: "图片上传成功！",
        center: true,
      });
      //刷新图片列表
      this.loadImages();
    },
    //点击分页数据处理
    handlePageImage() {
      this.images = this.$store.state.m_article.Images;
    },

    // 获取指定的图片索引，为该item动态添加收藏删除div
    handleMouseOver(index) {
      this.currentIndex = index;
    },
    handleMouseLeave() {
      this.currentIndex = null;
    },
    // 处理收藏图片按钮
    handleCollect(item) {
      console.log(item.id, !item.is_collected);
      collectImage(item.id, !item.is_collected)
        .then((res) => {
          let message = this.isCollect ? "取消收藏成功!" : "收藏图片成功!";
          this.$message({
            type: "success",
            message,
            center: true,
          });
          if (this.isCollect) {
            this.loadImages(this.isCollect, 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 处理删除图片按钮
    handleDelete(id) {
      console.log(id);
      deleteImage(id)
        .then(() => {
          this.$message({
            type: "success",
            message: "图片删除成功!",
            center: true,
          });
          let currentPage = this.$store.state.m_article.imageCurrentPage;
          //刷新图片列表
          this.loadImages(this.isCollect, currentPage);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less">
.action-head {
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.upload-demo {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.img-box {
  width: 150px;
  height: 100px;
  margin-bottom: 20px;
  overflow: hidden;
  .operation {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 150px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
  }
  .operation_active {
    transform: translateY(-45px);
  }
  .operation_hidde {
    transform: translateY(0);
  }
}
</style>
