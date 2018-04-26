<template>
  <div class="app-container">
    <div class="wrapper">
      <div class="filter-container">
        <div class="filter-item">
          <label>留言日期</label>
          <el-date-picker
            v-model="listQuery.start_time"
            type="date"
            size="small"
            placeholder="选择日期">
          </el-date-picker>
          -
          <el-date-picker
            v-model="listQuery.end_time"
            type="date"
            size="small"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="filter-item">
          <label>模糊查询：</label>
          <el-input  size="small" class="form-input" placeholder="内容／回复" v-model="listQuery.keyword"></el-input>
        </div>
        <div class="filter-item">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="50" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column label="回复"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.answer}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否发布到前台" align="center">
        <template slot-scope="scope">
          {{scope.row.is_public_show | is_public_show_filter}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="留言时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container" align="center">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="listQuery.currentPage"
                     :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.size"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/message'

const is_public_show_options = [
  { label: '否', key: 0 },
  { label: '是', key: 1 }
]

const is_public_show_key_value = is_public_show_options.reduce((acc, cur) => {
  acc[cur.key] = cur.label
  return acc
}, {})
export default {
  options: {
    is_public_show_options
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        size: 50,
        startTime: null,
        endTime: null,
        keyword: null,
        is_public_show: 1
      },
      total: 0
    }
  },
  filters: {
    is_public_show_filter(value) {
      return is_public_show_key_value[value]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.list
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.currentPage = val
      this.getList()
    },
    handleFilter() {
      this.listQuery.currentPage = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
.wrapper {
  padding: 20px;
  background: #fff;
}
.app-container {
  min-height: 100vh;
  background: #f0f2f5 !important;
}
.form-input {
  width: 150px;
}
.filter-container .filter-item {
  font-size: 14px;
  margin-right: 10px;
  float: left;
}
.filter-container .filter-item label {
  font-weight: normal;
}
</style>