<template>
  <div class="app-container">
    <div class="wrapper">
      <div class="filter-container">
        <div class="filter-item">
          <label>上传日期</label>
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
          <el-input  size="small" class="form-input" placeholder="文件名" v-model="listQuery.keyword"></el-input>
        </div>
        <div class="filter-item">
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleFilter">查询</el-button>
        </div>
        <div class="filter-item">
          <el-button type="primary" size="small" icon="el-icon-upload" @click="dialogVisible = true">上传</el-button>
        </div>
    </div>
    <el-dialog
      title="上传文件面板"
      :visible.sync="dialogVisible"
      width="50%">
      <el-upload
        class="upload-demo"
        :headers="{'X-Token': token}"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="5"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">可上传图片和office文档</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="50" label='序号'>
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="文件名" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="路径"  align="center">
        <template slot-scope="scope">
          <a :href="scope.row.url">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column label="是否发布到前台" align="center">
        <template slot-scope="scope">
          {{scope.row.is_public_show | is_public_show_filter}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传时间" width="200">
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
import { getList } from '@/api/file'
import { getToken } from '@/utils/auth'

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
      token: getToken(),
      fileList: [],
      uploadUrl: process.env.BASE_API + '/admin/file/add',
      dialogVisible: false,
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
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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