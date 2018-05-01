// 阻止输出log
// wangEditor.customConfig.printLog = false;
import WangEditor from 'wangeditor'

export function create() {
  const editor = new WangEditor('#editor-toolbar', '#editor-text')
  console.log('WangEditor:', editor)

  // 上传图片
  editor.customConfig.uploadImgUrl = '/api/upload'
  editor.customConfig.uploadParams = {
    token: 'ggblog',
    user: 'ggblog'
  }

  editor.customConfig.uploadHeaders = {
    Accept: 'text/x-json'
  }

  // editor.customConfig.uploadImgFileName = 'myFileName';

  // 隐藏网络图片
  editor.customConfig.hideLinkImg = true

  // 表情显示项
  editor.customConfig.emotionsShow = 'value'
  editor.customConfig.emotions = {
    'default': {
      title: '默认',
      data: './emotions.data'
    },
    'weibo': {
      title: '微博表情',
      data: []
    }
  }

  // 插入代码时的默认语言
  // editor.customConfig.codeDefaultLang = 'html'

  // 只粘贴纯文本
  // editor.customConfig.pasteText = true;

  // 跨域上传
  // editor.customConfig.uploadImgUrl = 'http://localhost:8012/upload';

  // 第三方上传
  // editor.customConfig.customUpload = true;

  // 普通菜单配置
  // editor.customConfig.menus = [
  //     'img',
  //     'insertcode',
  //     'eraser',
  //     'fullscreen'
  // ];
  // 只排除某几个菜单（兼容IE低版本，不支持ES5的浏览器），支持ES5的浏览器可直接用 [].map 方法
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

  // onchange 事件
  // editor.onchange = function() {
  //   console.log('内容：', this.$txt.html())
  // }

  // 取消过滤js
  // editor.customConfig.jsFilter = false;

  // 取消粘贴过来
  // editor.customConfig.pasteFilter = false;

  // 设置 z-index
  // editor.customConfig.zindex = 20000;

  // 语言
  // editor.customConfig.lang = wangEditor.langs['en'];

  // 自定义菜单UI
  // editor.UI.menus.bold = {
  //     normal: '<button style="font-size:20px; margin-top:5px;">B</button>',
  //     selected: '.selected'
  // };
  // editor.UI.menus.italic = {
  //     normal: '<button style="font-size:20px; margin-top:5px;">I</button>',
  //     selected: '<button style="font-size:20px; margin-top:5px;"><i>I</i></button>'
  // };
  editor.create()
  // 初始化编辑器的内容
  // editor.$txt.html('<p>要初始化的内容</p>');
  console.log('asdsadsasaddsa', editor.txt.html())
  return editor
}
