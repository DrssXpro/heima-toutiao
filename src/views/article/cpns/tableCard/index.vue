<template>
  <div class="table-card">
    <el-card class="table-card">
      <div slot="header">
        <span>根据筛选条件共查询到 {{ counter }} 条结果</span>
      </div>
      <div class="text item">
        <!-- table -->
        <el-table
          :data="articles"
          stripe
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column prop="date" label="封面">
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 60px"
                :src="scope.row.cover.images[0]"
                fit="fill"
                lazy
              >
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column label="状态">
            <!-- scope可以拿到对象的数据以及索引 -->
            <template slot-scope="scope">
              <el-tag :type="articleStatus[scope.row.status].type">{{
                articleStatus[scope.row.status].text
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- 编辑按钮 -->
              <el-button
                size="medium"
                circle
                type="primary"
                icon="el-icon-edit"
                style="margin-right: 5px"
                @click="handleEditClick(scope.row)"
              ></el-button>
              <!-- 编辑按钮触发dialog -->
              <el-dialog
                title="编辑文章"
                :visible.sync="dialogFormVisible"
                :modal-append-to-body="false"
                center
              >
                <update-form
                  @cancelDialog="handleCancel"
                  @readyDialog="handleReady"
                  :contentId="scope.row.id"
                />
              </el-dialog>
              <!-- 删除按钮触发popcofirm -->
              <el-popconfirm
                title="确定要删除这篇文章吗？"
                @confirm="handleDelete(scope.row)"
              >
                <el-button
                  size="medium"
                  type="danger"
                  circle
                  icon="el-icon-delete"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <my-pagination
          :counter="counter / 10"
          @getPageArticles="handleArticles"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import myPagination from "../../../../components/myPagination.vue";
import updateForm from "../updateForm/index.vue";
import {
  articleDeleteRequest,
  getArticleContent,
} from "../../../../service/article_request";
import { mapState } from "vuex";
export default {
  components: {
    myPagination,
    updateForm,
  },
  created() {
    this.loading = true;
    this.$store.dispatch("m_article/getTableArticles").then((res) => {
      this.counter = res;
      this.articles = this.Articles;
      this.loading = false;
    });
  },
  data() {
    return {
      articleStatus: [
        { status: 0, text: "草稿", type: "info" },
        { status: 1, text: "待审核", type: "info" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "warning" },
        { status: 4, text: "已删除", type: "danger" },
      ],
      counter: 0,
      articles: [],
      loading: false,
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapState("m_article", ["Articles"]),
  },
  //主要监听queryCard里查询的数据变化来更新tableCard的数据
  watch: {
    Articles(newValue) {
      this.articles = newValue;
    },
  },
  methods: {
    //处理删除按钮
    handleDelete(row) {
      this.loading = true;
      articleDeleteRequest(row.id)
        .then((res) => {
          this.$message({
            type: "success",
            message: "删除成功!",
            center: true,
          });
          //删除过后更新页码获取文章
          this.getCurrentPageArticle();
        })
        .catch((err) => console.log(err));
    },
    //处理编辑按钮
    handleEditClick(data) {
      getArticleContent(data.id).then((res) => {
        this.$store.commit("m_editArticle/setArticle", res.data.data);
      });
      this.dialogFormVisible = true;
    },
    //点击分页器，将store中的文章获取过来修改table里的数据
    handleArticles() {
      this.articles = this.$store.state.m_article.Articles;
    },
    //处理编辑按钮取消逻辑
    handleCancel() {
      this.dialogFormVisible = false;
    },
    //处理编辑按钮确认逻辑
    handleReady() {
      //编辑文章修改，重新渲染一下table数据
      this.getCurrentPageArticle();
      this.dialogFormVisible = false;
    },

    //获取currentPage后查询数据
    getCurrentPageArticle() {
      let currentPage = this.$store.state.m_article.currentPage;
      this.$store
        .dispatch("m_article/getTableArticles", currentPage)
        .then((res) => {
          this.articles = this.$store.state.m_article.Articles;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped></style>
