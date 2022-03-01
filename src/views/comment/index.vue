<template>
  <el-card>
    <div slot="header">
      <bread-crumb title="评论管理"></bread-crumb>
    </div>

    <!-- table区域 -->
    <el-table :data="commentData" stripe style="width: 100%">
      <el-table-column prop="title" label="标题" width="400"> </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      ></el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
      ></el-table-column>
      <el-table-column prop="comment_status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.comment_status ? "正常" : "关闭" }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            @change="handleCommentStatus(scope.row)"
            :disabled="scope.row.statusDisabled"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <my-pagination
      DataType="comments"
      :counter="totalCounter / 10"
      @getComments="handleGetComments"
    ></my-pagination>
  </el-card>
</template>

<script>
import breadCrumb from "../../components/breadCrumb.vue";
import myPagination from "../../components/myPagination.vue";
import { changeCommentStatus } from "../../service/article_request";
export default {
  components: {
    breadCrumb,
    myPagination,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      commentData: [],
      totalCounter: 0,
    };
  },
  created() {
    this.getAllComments();
  },
  methods: {
    //获取评论数据
    getAllComments() {
      this.$store.dispatch("m_comment/getComments").then((res) => {
        this.commentData = this.$store.state.m_comment.Comments;
        this.totalCounter = res;
      });
    },

    //处理点击分页数据请求逻辑
    handleGetComments() {
      this.commentData = this.$store.state.m_comment.Comments;
    },

    handleCommentStatus(comment) {
      comment.statusDisabled = true;
      changeCommentStatus(comment.id, comment.comment_status).then((res) => {
        let message = !comment.comment_status
          ? "已成功关闭该评论!"
          : "已成功开启该评论!";
        this.$message({
          type: "success",
          message,
          center: true,
        });
        comment.statusDisabled = false;
      });
    },
  },
};
</script>

<style lang="less"></style>
