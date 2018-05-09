<template>
  <div class="app-container">
    <div class="wrapper">
      <div class="filter-container">
        <div class="filter-item">
          <label>更新时间：</label>
          <el-date-picker
            v-model="listQuery.startTime"
            type="date"
            size="small"
            placeholder="选择日期">
          </el-date-picker>
          -
          <el-date-picker
            v-model="listQuery.endTime"
            type="date"
            size="small"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="filter-item">
          <label>模糊查询：</label>
          <el-input  size="small" class="form-input" placeholder="标题／子标题／作者" v-model="listQuery.keyword"></el-input>
        </div>
        <div class="filter-item">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </div>
        <div class="filter-item">
          <el-button type="primary" size="small" icon="el-icon-plus" ><a href="#/article/add">添加</a></el-button>
        </div>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="50" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <a :href="'#/article/load?id=' + scope.row.id">{{scope.row.title}}</a>
        </template>
      </el-table-column>
      <el-table-column label="子标题"  align="center">
        <template slot-scope="scope">
          <span>{{scope.row.subtitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="插图" align="center">
        <template slot-scope="scope">
          <img style="height: 50px;weight:50px;cursor:pointer" v-if="scope.row.subimg" :src="scope.row.subimg" @click="bigImg(scope.row.subimg)">
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center">
        <template slot-scope="scope">
          {{scope.row.author_name}}
        </template>
      </el-table-column>
      <el-table-column label="所属类型" align="center">
        <template slot-scope="scope">
          {{scope.row.type | type_filter}}
        </template>
      </el-table-column>
      <el-table-column label="是否发布到前台" align="center">
        <template slot-scope="scope">
          {{scope.row.is_public_show | is_public_show_filter}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最后更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.update_time}}</span>
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
import { getList } from '@/api/article'

const is_public_show_options = [
  { label: '否', key: 0 },
  { label: '是', key: 1 }
]

const type_options = [
  { label: '政策法规', key: 1 },
  { label: '武装部工作', key: 2 },
  { label: '纠察队建设', key: 3 },
  { label: '安全知识', key: 4 },
  { label: '失物招领', key: 5 },
  { label: '典型案例', key: 6 }
]

const is_public_show_key_value = is_public_show_options.reduce((acc, cur) => {
  acc[cur.key] = cur.label
  return acc
}, {})

const type_key_value = type_options.reduce((acc, cur) => {
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
        keyword: null
      },
      total: 0
    }
  },
  filters: {
    is_public_show_filter(value) {
      return is_public_show_key_value[value]
    },
    type_filter(value) {
      return type_key_value[value]
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
    },
    bigImg(path) {
      window.open(path)
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
a:hover{
 text-decoration:underline;  /*鼠标放上去有下划线*/
}
</style>