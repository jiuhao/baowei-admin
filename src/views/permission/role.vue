<template>
  <div class="app-container">
    <el-row>
        <el-col :span="10">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">
                <el-table-column align="center" width="50" label='序号'>
                    <template slot-scope="scope">
                    {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column label="code值" align="center">
                    <template slot-scope="scope">
                    {{scope.row.code}}
                    </template>
                </el-table-column>
                <el-table-column label="角色名"  align="center">
                    <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="14">
            <el-card>
                <div slot="header" class="clearfix">
                    <span>权限详情</span>
                    <el-button style="float: right; padding: 3px 0" type="text">更新</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'列表内容 ' + o }}
                </div>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { getList, load } from '@/api/role'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      permissions: {},
      listQuery: {
        id: 0
      },
      total: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data
        this.listQuery.id = this.list[0] && this.list[0].id
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    load() {
      this.listLoading = true
      load(this.listQuery).then(response => {
        this.permissions = response.data
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.listQuery.id = val.id
      this.load()
    }
  }
}
</script>

