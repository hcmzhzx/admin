<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="admin_id">所属客服</label>
               <select name="admin_id" id="admin_id" class="form-control small" data-rule="*" data-errmsg="所属客服必须选择" data-sync="true">
                  <option value="">请选择</option>
                  <option :value="item.id" v-for="item in beginList" :key="item.id">{{item.username}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="brand_id">所属品牌</label>
               <select name="brand_id" id="brand_id" class="form-control small" data-rule="*" data-errmsg="所属品牌必须选择" data-sync="true">
                  <option value="0">请选择</option>
                  <option v-for="item in brandsList" :key="item.value" :value="item.value">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="picker">二维码</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="qrcode" data-authority="qrcode_add"><span>点击选择图片</span>
                     </div>
                  </div>
                  <input type="hidden" :value="qrcode" data-rule="*" data-errmsg="二维码必须填写" data-sync="true">
               </div>
            </div>
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
            text:[{txt:'客服二维码', src:'admin_qrcode'}, {txt:'添加二维码'}],
            brandsList:[],  // 品牌列表
            beginList:[],  // 售前客服列表
            qrcode:''  // 二维码图地址
         }
      },
      created(){
         // 获取客服列表
         this.$store.dispatch('beginSale').then(res=>{
            this.beginList = res
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });
      },
      updated(){
         const _this = this;
         $('.picker input[type=file]').change(function(){
            const files = this.files[0];
            if(files.length == 0) return;
            const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
            $(ele).siblings().remove();
            $(ele).before(`<div class="box list"><img src="${window.URL.createObjectURL(files)}"><i class="progress"></i><a href="javascript:;" class="preview">上传中</a><input type="hidden" name="${type}" value=""></div>`);
            _this.readFile(type,files,authority,$(ele.parentNode.firstElementChild));
            $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
            // 修改删除图片
            $('#main').on('click','.trash',function (){
               _this.delImg($(this),()=>{
                  if($(this).parent().children('input').attr('name') == 'qrcode'){
                     _this.qrcode=''
                  }
               })
            })
         })
      },
      methods:{
         // 更换图片请求
         readFile(type,files,authority,ev){
            const form = new FormData();
            form.append('type',type);
            form.append('image',files);
            form.append('authority',authority);
            this.$http.post('image',form).then(url=>{
               if(type=='qrcode'){this.qrcode = url.path};
               ev.find('input[type=hidden]').val(url.path);
               ev.find('span').remove();
               ev.find('a.preview').addClass('trash').text('修改');
            })
         },

         // 提交全部列表
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
               this.$http.post('admin_qrcode',Form).then(res=>{
                  this.$router.go(-1)
               }).catch(err=>{
                  console.log(err);
                  this.$message({
                     message: err,
                     type: 'warning'
                  })
               })
            })
         }
      }
   }
</script>
