<template>
  <div class="articles">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <bread-crumb title="内容管理" />
      </div>
      <div class="text item">
        <el-form ref="form" label-width="50px" size="mini">
          <el-form-item label="状态:">
            <el-radio-group v-model="status" size="small">
              <el-radio :label="null">全部</el-radio>
              <el-radio label="0">草稿</el-radio>
              <el-radio label="1">待审核</el-radio>
              <el-radio label="2">审核通过</el-radio>
              <el-radio label="3">审核失败</el-radio>
              <el-radio label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道:">
            <my-channels />
          </el-form-item>
          <el-form-item label="日期:">
            <el-date-picker
              v-model="dateTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button
              type="primary"
              @click="getTableData(1)"
              :disabled="loading"
              >筛选</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="table-card">
      <div slot="header" class="clearfix">
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
              <el-button
                size="medium"
                circle
                type="primary"
                icon="el-icon-edit"
                style="margin-right: 5px"
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-popconfirm
                title="确定要删除这篇文章吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
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
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="counter / 10"
            class="page-style"
            @current-change="onCurrentChange"
            :disabled="loading"
            :current-page.sync="currentPage"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  articleTableRequest,
  articleDeleteRequest,
} from "../../service/article_request";

import breadCrumb from "../../components/breadCrumb.vue";
import myChannels from "../../components/myChannels.vue";
export default {
  name: "Article",
  components: {
    breadCrumb,
    myChannels,
  },
  data() {
    return {
      counter: 0,
      articles: [],
      articleStatus: [
        { status: 0, text: "草稿", type: "info" },
        { status: 1, text: "待审核", type: "" },
        { status: 2, text: "审核通过", type: "success" },
        { status: 3, text: "审核失败", type: "warning" },
        { status: 4, text: "已删除", type: "danger" },
      ],
      dateTime: [], //日期范围
      status: null, //radio的状态选择
      channels: [], //文章频道列表
      channelId: null, //查询指定频道索引
      loading: true, //table加载loading
      currentPage: 0, //拿到分页器当前页数
    };
  },
  methods: {
    // 获取table当中的数据
    getTableData(page = 1) {
      this.loading = true;
      articleTableRequest({
        page,
        per_page: 10,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.dateTime ? this.dateTime[0] : null,
        end_pubdate: this.dateTime ? this.dateTime[1] : null,
      }).then((res) => {
        this.loading = false;
        this.counter = res.data.data.total_count;
        this.articles = res.data.data.results;
      });
    },
    //监听分页点击，传递分页位置
    onCurrentChange(page) {
      this.getTableData(page);
    },
    // table删除数据处理
    handleDelete(index, row) {
      console.log(index, row.id);
      articleDeleteRequest(row.id).then((res) => {
        console.log(res);
        this.$message({
          type: "success",
          message: "删除成功!",
          center: true,
        });
        //删除成功后刷新table同时传入删除文章所在的页数
        this.getTableData(this.currentPage);
      });
      this.visible = false;
    },
  },

  created() {
    this.getTableData();
  },
};
</script>

<style lang="less" scoped>
.filter-card {
  margin-bottom: 30px;
}
.page {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
