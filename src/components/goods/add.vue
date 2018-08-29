<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">商品标题</label>
               <input type="text" class="form-control small" name="title" id="title" data-rule="*" data-errmsg="商品标题必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="spec">规格</label>
               <input type="text" class="form-control small" name="spec" id="spec">
            </div>
            <div class="form-group">
               <label for="price">价格</label>
               <input type="text" class="form-control small" name="price" id="price">
            </div>
            <div class="form-group">
               <label for="pv">积分</label>
               <input type="text" class="form-control small" name="pv" id="pv">
            </div>
            <div class="form-group">
               <label for="brand_id">所属品牌</label>
               <select name="brand_id" id="brand_id" @change="sort" class="form-control small" data-rule="*" data-errmsg="所属品牌必须选择" data-sync="true">
                  <option value="">请选择所属品牌</option>
                  <option v-for="item in brandsList" :key="item.value" :value="item.value">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="cid">商品分类</label>
               <select name="cid" id="cid" class="form-control small">
                  <option v-for="item in sortList" :key="item.value" :value="item.value">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="cover">缩略图</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="product" data-authority="product_upload"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="form-group" style="">
               <label for="content">商品描述</label>
               <div id="editor" style="width:900px;height:400px;"></div>
            </div>
            <div class="form-group">
               <label><input type="checkbox" name="type[]" value="1">推荐</label>
               <label><input type="checkbox" name="type[]" value="2">热门</label>
            </div>
            <input type="hidden" name="cover" :value="cover" data-rule="*" data-errmsg="缩略图必须上传" data-sync="true">
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
            text: [{txt:'商品列表', src:'goods_index'}, {txt:'添加商品'}],
            brandsList: [], // 品牌列表
            sortList:[],    // 分类列表
            cover:''      // 缩略图
         }
      },
      created(){
         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });

         const _this = this;
         this.$nextTick(()=>{
            // 初始化编辑器
            this.getUE();
            // 上传图片
            $('.picker input[type=file]').change(function(){
               const files = this.files[0];
               if(files.length == 0) return;
               const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src=""><i class="progress"></i><a href="javascript:;" class="preview">上传中</a></div>`);
               _this.readFile(type,files,authority,$(ele.parentNode.firstChild));
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
         // 通过选择品牌获取不同分类
         sort(e){
            if(e.target.value=='') return false;
            this.$http.get(`product_category_list/${e.target.value}?include=brand`).then(res=>{
               this.sortList = res.data.map((item)=>{
                  let json={};
                  json.text = item.title;
                  json.value = item.id;
                  return json;
               })
            })
         },

         // 更换图片请求
         readFile(type,files,authority,ev){
            const form = new FormData();
            form.append('type',type);
            form.append('image',files);
            form.append('authority',authority);
            ev.find('img').attr('src',window.URL.createObjectURL(files));
            this.$http.post('image',form).then(url=>{
               this.cover = url.path;
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
            },()=>{
               let form = new FormData();
               const Formdata = $(e.path[0]).serializeArray().filter((item)=>{
                  return item.value !== '';
               });
               Formdata.forEach((item)=>{
                  form.append(item.name,item.value); // 介绍内容
               });
               if(UE.getEditor('editor').getContent()){
                  form.append('intro',UE.getEditor('editor').getContent()); // 介绍内容
               }

               this.$http.post('product',form).then(res=>{
                  console.log(res);
                  //this.$router.go(-1)
               }).catch(err=>{
                  console.log(err);
                  this.$message({
                     message: err.errors.fg_domain[0],
                     type: 'warning'
                  })
               })

            })
         },
      }
   }
</script>
