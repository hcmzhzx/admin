import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import axios from'./assets/js/axios'

import {makePy} from './assets/js/pinyin'  // 首拼文件

// 引入文本编辑器静态文件
import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

Vue.use(ElementUi);

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.mixin({
   methods:{
      //地址截取
      Substr(str){
         if(!str) return false;
         return str.substring(str.lastIndexOf('cn/')+3)
      },

      // 初始化富文本编辑器
      getUE(){
         UE.getEditor('editor', {enableAutoSave: false, autoHeightEnabled: false});
      },

      // 首拼
      PY(str){
         return makePy(str)
      },

      // 删除上传的图片
      delImg(ele,callback){
          this.$confirm('确定删除这一项', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {
            ele.parent().remove();
            this.$message({
               type: 'success',
               message: '删除成功!'
            });
            callback();
         }).catch(()=>{});
      }
   }
})

/* eslint-disable no-new */
new Vue({
   el: '#app',
   router,
   store,
   components: {App},
   template: '<App/>'
})
