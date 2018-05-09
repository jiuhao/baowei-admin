<template>
  <div class="app-container">
    <div class="wrapper">      
      <div class="filter-container">
        <div class="filter-item">
          <el-button v-show="is_edit === 0" type="primary" size="small" icon="el-icon-setting" @click="dialogVisible = true">修改属性</el-button>
        </div>
        <div class="filter-item">
          <el-button v-show="is_edit === 0" type="primary" size="small" icon="el-icon-edit" @click="initEditor">编辑内容</el-button>
        </div>
      </div>
      <div v-show="is_edit === 1">
          <div class="filter-container">
              <div class="filter-item">
                  <el-button type="primary" size="small" @click="update" >保存</el-button>
              </div>
              <div id="editor-toolbar" class="toolbar"></div>
          </div>
          <div id="editor-text" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
              <p>请输入内容</p>
          </div>
      </div>
      <div v-show="is_edit === 0" v-html="form.content" class="content"></div>
      <el-dialog
        title="修改文章属性"
        :visible.sync="dialogVisible"
        width="60%">
        <el-form ref="form" :model="form" label-width="100px" style="index: 999">
            <el-form-item label="标题">
                <el-input size="small" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="子标题">
                <el-input type="textarea" v-model="form.subtitle"></el-input>
            </el-form-item>
            <el-form-item label="文章配图">
                <el-upload
                    class="avatar-uploader"
                    :headers="{'X-Token': token}"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
            <el-form-item label="作者">
                <el-input size="small" v-model="form.author_name"></el-input>
            </el-form-item>
            <el-form-item size="small" label="文章分类">
                <el-select v-model="form.type" placeholder="请选择类型">
                    <el-option label="政策法规" value="1"></el-option>
                    <el-option label="武装部工作" value="2"></el-option>
                    <el-option label="纠察队建设" value="3"></el-option>
                    <el-option label="安全知识" value="4"></el-option>
                    <el-option label="失物招领" value="5"></el-option>
                    <el-option label="典型案例" value="6"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="前台显示">
                <el-switch v-model="form.is_public_show"></el-switch>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取消</el-button>
          <el-button type="primary" @click="update" size="small">保存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
import { load, update } from '@/api/article'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      is_upload: 0,
      token: getToken(),
      uploadUrl: process.env.BASE_API + '/admin/file/add',
      imageUrl: '',
      is_edit: 0,
      dialogVisible: false,
      form: {
        id: '',
        title: '',
        subtitle: '',
        author_name: '',
        content: '',
        type: '',
        is_public_show: '',
        subimg: ''
      }
    }
  },
  filters: {
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.listLoading = true
      let name, value
      const obj = {}
      let str = window.location.href// 取得整个地址栏
      let num = str.indexOf('?')
      str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]
      const arr = str.split('&') // 各个参数放到数组里
      for (let i = 0; i < arr.length; i++) {
        num = arr[i].indexOf('=')
        if (num > 0) {
          name = arr[i].substring(0, num)
          value = arr[i].substr(num + 1)
          obj[name] = value
        }
      }
      load({ id: obj.id }).then(response => {
        const data = response.data
        this.form.id = data.id
        this.form.content = data.content
        this.form.title = data.title
        this.form.author_name = data.author_name
        this.form.type = data.type.toString()
        this.form.subtitle = data.subtitle
        this.form.subimg = data.subimg
        this.imageUrl = data.subimg
        this.form.is_public_show = data.is_public_show && true || false
      })
    },
    initEditor() {
      const editor = new WangEditor('#editor-toolbar', '#editor-text')
      editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo' // 重复
      ]
      editor.customConfig.onchange = (html) => {
        this.form.content = html
      }
      editor.create()
      editor.txt.html(this.form.content)
      this.is_edit = 1
    },
    update() {
      if (!this.is_upload) {
        delete this.form.subimg
      }
      update(this.form).then(response => {
        this.dialogVisible = false
        this.is_edit = 0
        this.load()
      })
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
        this.is_upload = 1
        this.form.subimg = res.data[0]
        this.imageUrl = URL.createObjectURL(file.raw)
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
.content {
  clear: both;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
border-color: #409EFF;
}
.avatar-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 100px;
height: 100px;
line-height: 100px;
text-align: center;
}
.avatar {
width: 100px;
height: 100px;
display: block;
}
</style>