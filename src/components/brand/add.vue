<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">品牌名</label>
               <input type="text" class="form-control small" ref="title" name="title" data-rule="*" data-errmsg="品牌必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>banner横幅</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="brand" data-authority="brand_upload"><span>点击选择图片</span>
                     </div>
                  </div>
                  <input type="hidden" v-model="banner" data-rule="*" data-errmsg="banner图必须上传" data-sync="true">
               </div>
            </div>
            <div class="form-group">
               <label>公司介绍</label>
               <div id="editor" style="width:900px;height:400px;"></div>
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
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'添加品牌'}],
            banner:''  // banner图地址
         }
      },
      created(){
         const _this = this;
         this.$nextTick(()=>{
            // 初始化编辑器内容高度 关闭自动长高
            this.getUE();

            $('.picker input[type=file]').change(function(e){
               if(this.files.length == 0) return;
               const files = this.files[0];
               const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src="${window.URL.createObjectURL(files)}"><i class="progress"></i><a href="javascript:;" class="preview">上传中</a><input type="hidden" name="banner" value=""></div>`);
               _this.readFile(type,files,authority,$(ele.parentNode.firstElementChild));
               $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
               // 修改删除图片
               $('#main').on('click','.trash',function (){
                  _this.delImg($(this),()=>{
                     _this.banner=''
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
               this.banner = url.path;
               ev.find('input[type=hidden]').val(url.path);
               ev.find('span').remove();
               ev.find('a.preview').addClass('trash').text('修改');
            })
         },

         // 表单验证提交
         sendForm(e){
            new CheckForm(e,err=>{
               this.$message({    // 此处搞不懂为什么不能使用 layer
                  message: err,
                  type: 'warning'
               });
            },post=>{
               const form = new FormData();
               form.append('title',post.title.trim());  // 标题
               form.append('pinyin',this.PY(this.$refs.title.value.trim())); //首拼
               if(UE.getEditor('editor').getContent()){
                  form.append('intro',UE.getEditor('editor').getContent()); // 介绍内容
               } else {
                  this.$message({
                     message: '公司介绍不能为空',
                     type: 'warning'
                  });
                  UE.getEditor('editor').focus(true); // 获取编辑器的焦点
                  return;
               }
               if(e.target.querySelector('input[type=hidden]')){
                  form.append('banner',this.banner); // banner图片
               }
               this.$http.post('brands',form).then(res=>{
                  this.$router.go(-1);
               })
            })
         }
      }
   }
</script>
