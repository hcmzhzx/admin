<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="flexv content">
         <form class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">品牌名</label>
               <input type="text" class="form-control small" name="title" id="title" :value="brandData.title" data-rule="*" data-errmsg="品牌必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label>banner横幅</label>
               <div class="uploader">
                  <div class="box list">
                     <input type="hidden" name="banner" :value="Substr(brandData.banner)">
                     <img :src="brandData.banner">
                  </div>
                  <div class="box picker" data-type="brand" data-authority="brand_upload">
                     <input type="file" accept="image/*" class="upfile"><span>点击选择图片</span>
                  </div>
               </div>
            </div>
            <div class="form-group" style="">
               <label>公司介绍</label>
               <div id="editor" style="width:900px;height:400px;"></div>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
         </form>
      </div>
      <!--<div class="box list" style="width:98px;height:98px;" id="file0">
         <img src="">
         <i class="progress" style="width:100%;"></i>
         <a href="javascript:;" class="preview trash">修改</a>
         <input type="hidden" name="banner" value="banner/20180813/5b717340d8dea.jpg">
      </div>-->
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
            text: [{txt: '品牌设置', src: 'brand_index'}, {txt: '编辑品牌'}],
            brandData: {},
            meta: {},
            UE:'',
            ID:'',

            currentPage: 1
         }
      },
      created(){
         const id = this.ID = this.$route.query.id, _this = this;
         this.$nextTick(()=> {
            // 初始化编辑器
            $.ajax({url:'/static/ueditor/ueditor.all.js',dataType:'script',cache:true,success:function (){
               _this.UE = UE.getEditor('editor',{enableAutoSave:false,autoHeightEnabled:false});
               _this.$http.get(`brands/${id}`).then(brand => {
                  _this.brandData = brand;
                  // 设置编辑器内容
                  _this.UE.setContent(brand.intro)
               })
            }});

            // 上传图片
            $('.picker input[type=file]').change(function(e){
               if(this.files.length == 0) return;
               const files = this.files[0];
               const ele = this.parentNode, type = ele.getAttribute('data-type'), authority = ele.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src="${window.URL.createObjectURL(files)}"><i class="progress"></i><a href="javascript:;" class="preview">上传中</a><input type="hidden" name="banner" value=""></div>`);
               _this.readFile(type,authority,files,$(ele.parentNode.firstElementChild));
               $(ele.parentNode.firstElementChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
               // 修改删除图片
               $('#main').on('click','.trash',function (){
                  _this.delImg($(this))
               })
            })
         })
      },
      methods: {
         sendForm(e){
            new CheckForm(e,err=>{
               this.$message({
                  message: err,
                  type: 'warning'
               });
            },()=>{
               let json = {};
               // input 内容
               [...e.target.querySelectorAll('input[type=text],input[type=hidden]')].filter((item)=>{
                  return item.value != ''
               }).forEach((item)=>{
                  json[item.name] = item.value;
               });
               // 获得编辑器内容 及 首拼
               const contact = this.UE.getContent(), py = this.PY(e.target.querySelector('#title').value);

               // 发送修改请求
               this.$http.patch(`brands/${this.ID}`,{title:json.title, banner:json.banner, pinyin:py, intro:contact}).then(()=>{
                  this.$router.go(-1);
               })
            })
         },
         // 更换图片请求
         readFile(type,authority,files,ev){
            const form = new FormData();
            form.append('type',type);
            form.append('image',files);
            form.append('authority',authority);
            this.$http.post('image',form).then(url=>{
               ev.find('input[type=hidden]').val(this.Substr(url.path));
               ev.find('span').remove();
               ev.find('a.preview').addClass('trash').text('修改');
            })
         }
      }
   }
</script>
