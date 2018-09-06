<template>
   <div id="wechat" class='flexitemv'>
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label>app_id</label>
               <input type="text" class="form-control medium" name="app_id" :value="dataList.app_id" data-rule="*" data-errmsg="app_id必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>app_secret</label>
               <input type="text" class="form-control medium" name="app_secret" :value="dataList.app_secret" data-rule="*" data-errmsg="app_secret必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>key</label>
               <input type="text" class="form-control medium" name="key" :value="dataList.key" data-rule="*" data-errmsg="key必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>mch_id</label>
               <input type="text" class="form-control small" name="mch_id" :value="dataList.mch_id" data-rule="*" data-errmsg="mch_id必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>账户统计模板消息</label>
               <input type="text" class="form-control large" name="tpl_count" :value="dataList.tpl_count" data-rule="*" data-errmsg="tpl_count必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>访客来咨询模板消息</label>
               <input type="text" class="form-control large" name="tpl_visitor" :value="dataList.tpl_visitor" data-rule="*" data-errmsg="tpl_visitor必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>用户咨询提醒模板消息</label>
               <input type="text" class="form-control large" name="tpl_ask" :value="dataList.tpl_ask" data-rule="*" data-errmsg="tpl_ask必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>服务到期提醒模板消息</label>
               <input type="text" class="form-control large" name="tpl_lock" :value="dataList.tpl_lock" data-rule="*" data-errmsg="tpl_lock必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>卡卷详细介绍图</label>
               <input type="hidden" name="card_image" :value="dataList.card_image">
               <input type="file" class="form-control medium" accept="image/*" data-type="image" data-type_name="card">
            </div>
            <div class="form-group">
               <label>卡卷详细介绍内容</label>
               <textarea name="card_detail" class="form-control large" rows="7" :value="dataList.card_detail" data-sync=""></textarea>
            </div>
            <div class="form-group">
               <label>ssl_key</label>
               <input type="hidden" name="ssl_key" :value="dataList.ssl_key">
               <input type="file" class="form-control medium" accept="image/*" data-type="ssl" data-type_name="key">
            </div>
            <div class="form-group">
               <label>ssl_cert</label>
               <input type="hidden" name="ssl_cert" :value="dataList.ssl_cert">
               <input type="file" class="form-control medium" accept="image/*" data-type="ssl" data-type_name="cert">
            </div>
            <input type="hidden" name="partner_id" :value="ID" v-if="is_w=='0'">
            <button type="submit" class="btn btn-primary">提交</button>
         </form>
      </div>
   </div>
</template>

<script>
   import crumb from '../header/crumb'
   import {CheckForm} from '../../assets/js/checkForm'

   export default {
      components: {
         crumb
      },
      data(){
         return {
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'合作名单', src:`partner_index?id=${this.$route.query.id}`}, {txt:'合作微信配置'}],
            ID: '',  // 品牌ID
            dataList:[],  //微信配置数据
            is_w:''  // 判断有无配置信息 0:无

         }
      },
      created(){
         this.ID = this.$route.query.ID;
         this.is_w = this.$route.query.is_w;
         // 判断有无微信配置
         if(this.is_w != '0'){
            this.$http.get(`partner/wechat/${this.ID}`).then(res=>{
               this.dataList = res
            })
         };

         this.$nextTick(()=>{
            const _this = this;
            // 上传图片地址
            $('.form-group input[type=file]').change(function(){
               const files = this.files[0];
               if(files.length == 0) return;
               const ele = this.parentNode, type = this.getAttribute('data-type'), type_name = this.getAttribute('data-type_name');
               _this.readFile(type,type_name,files,$(ele));
            })
         })
      },
      methods:{
         // 图片请求
         readFile(type,name,files,ev){
            const form = new FormData();
            form.append('type',type);
            form.append('type_name',name);
            form.append('image',files);
            form.append('authority','wechat_upload');
            this.$http.post('partner/wechat/upload',form).then(res=>{
               ev.find('input[type=hidden]').val(res.path);
            })
         },

         // 表单提交验证
         sendForm(e){
            new CheckForm(e,err=>{
               this.$message({
                  message: err,
                  type: 'warning'
               });
            },()=>{
               const Formdata = $(e.path[0]).serializeArray().filter((item)=>{
                  return item.value !== '';
               });
               let Form = {};
               Formdata.forEach((item)=>{
                  Form[item.name] = item.value.trim();
               });
               // 判断有无原始数据
               if(this.is_w != '0'){
                  this.$http.patch(`partner/wechat/${this.ID}`,Form).then(res=>{
                     this.$router.go(-1);
                  })
               } else {
                  this.$http.post('partner/wechat',Form).then(res=>{
                     this.$router.go(-1);
                  })
               }
            })
         }
      }
   }
</script>

<style>
   #wechat input[type=file]{position:unset;opacity:1}
</style>
