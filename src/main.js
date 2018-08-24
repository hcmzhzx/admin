import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import axios from'./assets/js/axios'

import {makePy} from './assets/js/pinyin'  // 首拼文件

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

      // 请求编辑器文件
      getUE(){
         $.ajax({url:'../static/ueditor/ueditor.all.js',dataType:'script',cache:true,success:function (){
            UE.getEditor('editor',{enableAutoSave:false,autoHeightEnabled:false});
         }})
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
            callback();
            this.$message({
               type: 'success',
               message: '删除成功!'
            });
            ele.parent().remove();
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
