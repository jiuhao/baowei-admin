<template>
    <div class="">
        <el-steps :active='active' simple>
                <el-step title="1.编辑文章" icon="el-icon-edit"></el-step>
                <el-step title="2.设置属性" icon="el-icon-setting"></el-step>
                <el-step title="3.发布完成" icon="el-icon-upload"></el-step>
        </el-steps>
        <div class="wrapper">
            <div v-show="active === 0">
                <div class="filter-container">
                    <div class="filter-item">
                        <el-button type="primary" size="small" @click="next" >下一步</el-button>
                    </div>
                    <div id="editor-toolbar" class="toolbar"></div>
                </div>
                <div id="editor-text" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
                    <p>请输入内容</p>
                </div>
            </div>
            <div v-show="active === 1">
                <el-form ref="form" :model="form" label-width="100px">
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
                    <el-form-item>
                        <el-button type="primary" @click="last" size="small">上一步</el-button>
                        <el-button type="primary" @click="add" size="small">发布</el-button>
                        <el-button size="small">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-show="active === 2" >
                <a style="color:#409EFF;display:block">发布完成，点我查看</a>
                <a style="color:rgba(19, 206, 102)" href="#/article/list">返回列表</a>
            </div>
        </div>
    </div>
</template>

<script>
import { add } from '@/api/article'
import WangEditor from 'wangeditor'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      token: getToken(),
      uploadUrl: process.env.BASE_API + '/admin/file/add',
      editor: null,
      active: 0,
      imageUrl: '',
      form: {
        title: '',
        subtitle: '',
        author_name: '',
        content: '',
        type: '',
        is_public_show: 0,
        subimg: ''
      }
    }
  },
  mounted() {
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
  },
  methods: {
    add() {
      this.listLoading = true
      add(this.form).then(response => {
        this.listLoading = false
        this.active++
      })
    },
    next() {
      if (this.active++ > 2) this.active = 0
    },
    last() {
      if (this.active-- < 0) this.active = 0
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 1) {
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
<style>
.text {
    min-height: 500px;
}
.wrapper {
  padding: 5px;
  background: #fff;
}
.app-container {
  min-height: 100vh;
  background: #f0f2f5 !important;
}
.form-input {
  width: 500;
}
.filter-container .filter-item {
  font-size: 14px;
  margin-right: 10px;
  float: left;
}
.filter-container .filter-item label {
  font-weight: normal;
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
width: 178px;
height: 178px;
line-height: 178px;
text-align: center;
}
.avatar {
width: 178px;
height: 178px;
display: block;
}
</style>
