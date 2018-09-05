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

//格式化时间
Date.prototype.Format=function(fmt){
   var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
   };
   if (/(y+)/.test(fmt)){
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   }
   for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
         fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
   }
   return fmt;
}

Vue.mixin({
   methods:{
      //地址截取
      Substr(str){
         if(!str) return false;
         return str.substring(str.lastIndexOf('cn/')+3);
      },

      // 初始化富文本编辑器
      getUE(){
         UE.getEditor('editor', {enableAutoSave: false, autoHeightEnabled: false});
      },

      // 首拼
      PY(str){
         return makePy(str);
      },

      // 拼接首拼品牌名
      source(text){
         return `${this.PY(text).substr(0, 1)}.${text}`;
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
      },

      // 所属员工
      their(data){
         return data.map((item)=>{
            let json={};
            json.text = item.username;
            json.value = item.id;
            return json
         })
      },

      // 行求和
      rowTotal(item){
         let arrNuber = Object.values(item).filter((item) => {
            return Number.isFinite(item);
         });
         return arrNuber.reduce((prev, cur) => {
            return prev + cur
         })
      },
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
