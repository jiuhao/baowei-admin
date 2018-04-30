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
                        <el-input size="small" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="子标题">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="文章配图">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                    </el-form-item>
                    <el-form-item label="作者">
                        <el-input size="small" v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item size="small" label="文章分类">
                        <el-select v-model="form.region" placeholder="请选择类型">
                            <el-option label="政策法规" value="1"></el-option>
                            <el-option label="武装部工作" value="2"></el-option>
                            <el-option label="纠察队建设" value="3"></el-option>
                            <el-option label="安全知识" value="4"></el-option>
                            <el-option label="失物招领" value="5"></el-option>
                            <el-option label="典型案例" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="前台显示">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="last">上一步</el-button>
                        <el-button type="primary" @click="next">发布</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                    </el-form>
            </div>
            <div v-show="active === 2" >
                <a style="color:#409EFF;display:block">发布完成，点我查看</a>
                <a style="color:rgba(19, 206, 102)" href="#/artical/list">返回列表</a>
            </div>
        </div>
    </div>
</template>

<script>
import { create } from '@/components/wangEditer'
export default {
  data() {
    return {
      editor: '',
      active: 0,
      imageUrl: 'http://img3.imgtn.bdimg.com/it/u=4279702637,1278251882&fm=27&gp=0.jpg',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [
        {
          label: '政策法规',
          value: 1
        },
        {
          label: '武装部工作',
          value: 2
        },
        {
          label: '纠察队建设',
          value: 3
        },
        {
          label: '安全知识',
          value: 4
        },
        {
          label: '失物招领',
          value: 5
        },
        {
          label: '典型案例',
          value: 6
        }
      ]
    }
  },
  mounted() {
    return create()
  },
  methods: {
    add() {
      console.log('html', this.editor.$txt.html())
      console.log('text', this.editor.$txt.text())
    },
    next() {
      if (this.active++ > 2) this.active = 0
    },
    last() {
      if (this.active-- < 0) this.active = 0
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
.editor {
    height:800px;
    max-height:500px;
}
.filter-container .filter-item label {
  font-weight: normal;
} 
</style>
