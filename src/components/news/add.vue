<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content" style="">
         <form class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">文章标题</label>
               <input type="text" class="form-control large" name="title" id="title" data-rule="*" data-errmsg="文章标题必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="brand_id">所属品牌</label>
               <select name="brand_id" id="brand_id" class="form-control small">
                  <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="cid">文章分类</label>
               <select name="cid" id="cid" class="form-control small">
                  <option :value="item.value" v-for="item in sortList" :key="item.value">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="cid">缩略图</label>
               <div class="uploader">
                  <div class="box picker">
                     <input type="file" accept="image/*" class="upfile" data-type="article" data-authority="article_upload"><span>点击选择图片</span></div>
               </div>
            </div>
            <div class="form-group">
               <label for="audio">发布音频</label>
               <input type="text" class="form-control medium" name="audio" id="audio" placeholder="音频标题">
               <input type="text" class="form-control medium" name="desc" placeholder="音频描述">
               <input type="text" class="form-control medium" name="src" placeholder="音频地址">
            </div>
            <div class="form-group">
               <label for="audio">文章内容</label>
               <div id="editor" style="width:900px;height:400px;"></div>
            </div>
            <input type="hidden" :value="cover" data-rule="*" data-errmsg="缩略图必须上传" data-sync="true">
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
            text: [{txt:'文章列表', src:'news_index'}, {txt:'添加文章'}],
            brandsList: [],   //品牌列表
            sortList: [],     //文章分类列表
            cover:''          //缩略图
         }
      },
      created(){
         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res => {
            this.brandsList = res
         });

         // 请求分类列表
         this.$http.get('article_category').then(article => {
            this.sortList = article.data.map((item) => {
               let json = {};
               json.text = item.title;
               json.value = item.id;
               return json;
            })
         })

         const _this = this;
         this.$nextTick(()=>{
            // 初始化编辑器
            this.getUE();

            // 上传图片
            $('.picker input[type=file]').change(function(){
               if(this.files.length == 0) return;
               const files = this.files[0];
               const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src="${window.URL.createObjectURL(files)}"><i class="progress"></i><a href="javascript:;" class="preview">上传中</a><input type="hidden" name="cover" value=""></div>`);
               _this.readFile(type,files,authority,$(ele.parentNode.firstElementChild));
               $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
               // 修改删除图片
               $('#main').on('click','.trash',function (){
                  _this.delImg($(this),()=>{
                     _this.cover=''
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
               this.cover = url.path;
               ev.find('input[type=hidden]').val(url.path);
               ev.find('span').remove();
               ev.find('a.preview').addClass('trash').text('修改');
            })
         },

         // 表单验证提交
         sendForm(e){
            new CheckForm(e,err=>{
               this.$message({
                  message: err,
                  type: 'warning'
               });
            },()=>{
               let Form = {}; this.checkeds = [];
               if(UE.getEditor('editor').getContent()){  // 判断文章内容是否为空
                  Form.content = UE.getEditor('editor').getContent(); // 介绍内容
               } else {
                  this.$message({
                     message: '文章内容不能为空',
                     type: 'warning'
                  });
                  UE.getEditor('editor').focus(true); // 获取编辑器的焦点
                  return;
               }
               const Formdata = $(e.path[0]).serializeArray().filter((item)=>{  //序列化表单
                  return item.value !== '' && item.name != 'editorValue';
               });
               Formdata.forEach((item)=>{
                   Form[item.name] = item.value
               });
               this.$http.post('article',Form).then(res=>{
                  this.$router.go(-1)
               })
            })
         }
      }
   }
</script>
