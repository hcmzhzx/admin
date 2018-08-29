<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="brand_id">所属品牌</label>
               <select name="brand_id" id="brand_id" class="form-control small" data-rule="*" data-errmsg="所属品牌必须选择" data-sync="true">
                  <option value="0">请选择所属品牌</option>
                  <option v-for="item in brandsList" :key="item.value" :value="item.value" >{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="site_title">网站名称</label>
               <input type="text" class="form-control small" name="site_title" id="site_title" data-rule="*" data-errmsg="网站名称必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="name">姓名</label>
               <input type="text" id="name" class="form-control small" name="name" data-rule="*" data-errmsg="姓名必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="phone">客服号码</label>
               <input type="tel" class="form-control small" maxlength="11" name="phone" id="phone" data-rule="m" data-errmsg="请填写正确客服号码" data-sync="true">
            </div>
            <div class="form-group">
               <label for="wechat">客服微信</label>
               <input type="text" class="form-control small" name="wechat" id="wechat">
            </div>
            <div class="form-group">
               <label for="fg_domain">前台域名</label>
               <input type="text" class="form-control small" name="fg_domain" id="fg_domain" data-rule="*" data-errmsg="前台域名必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>logo图片</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="logo" data-authority="partner_logo"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="form-group">
               <label>二维码</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="qrcode" data-authority="partner_qrcode"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="form-group">
               <label>分享二维码</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="share_qrcode" data-authority="partner_fx_qrcode"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="form-group">
               <label>客服二维码</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="service_qrcode" data-authority="partner_kf_qrcode"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <input type="hidden" name="logo" :value="logo" data-rule="*" data-errmsg="logo图必须填写" data-sync="true">
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
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'合作名单', src:`partner_index`}, {txt:'添加合作'}],
            brandsList:[], // 品牌列表
            logo:'' // logo图地址
         }
      },
      created(){
         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         })
      },
      updated(){
         // 上传文件
         const _this = this;
         this.$nextTick(()=>{
            $('.picker input[type=file]').change(function(){
               if(this.files.length == 0) return;
               const files = this.files[0];
               const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src="${window.URL.createObjectURL(files)}"><i class="progress"></i><a href="javascript:;" class="preview">上传中</a><input type="hidden" name="${type}" value=""></div>`);
               _this.readFile(type,files,authority,$(ele.parentNode.firstElementChild));
               $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
               // 修改删除图片
               $('#main').on('click','.trash',function (){
                  _this.delImg($(this),()=>{
                     if($(this).parent().children('input').attr('name') == 'logo'){
                        _this.logo=''
                     }
                  })
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
               if(type=='logo'){this.logo = url.path};
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
                  Form[item.name] = item.value;
               });
               this.$http.post('partner',Form).then(res=>{
                  this.$router.go(-1)
               }).catch(err=>{
                  console.log(err);
                  this.$message({
                     message: err.errors.fg_domain[0],
                     type: 'warning'
                  })
               })
            })
         }
      }
   }
</script>
