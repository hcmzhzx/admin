<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">商品标题</label>
               <input type="text" class="form-control small" name="title" v-model.trim="goodsList.title" id="title" data-rule="*" data-errmsg="商品标题必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="spec">规格</label>
               <input type="text" class="form-control small" name="spec" v-model.trim="goodsList.specification" id="spec">
            </div>
            <div class="form-group">
               <label for="price">价格</label>
               <input type="text" class="form-control small" name="price" v-model.trim="goodsList.price" id="price" data-rule="*" data-errmsg="价格必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="pv">积分</label>
               <input type="text" class="form-control small" name="pv" v-model.trim="goodsList.pv" id="pv">
            </div>
            <div class="form-group">
               <label for="brand_id">所属品牌</label>
               <select name="brand_id" id="brand_id" @change="sort" class="form-control small" data-rule="*" data-errmsg="所属品牌必须选择" data-sync="true">
                  <option value="">请选择所属品牌</option>
                  <option v-for="item in brandsList" :key="item.value" :value="item.value" :selected="item.value == goodsList.brand.id">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="cid">商品分类</label>
               <select name="cid" id="cid" class="form-control small">
                  <option v-for="item in sortList" :key="item.value" :value="item.value" :selected="item.value == goodsList.category.id">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="cover">缩略图</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box list">
                        <img :src="goodsList.cover">
                        <input type="hidden" name="cover" :value="Substr(goodsList.cover)">
                     </div>
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
               <label><input type="checkbox" name="type" value="1" v-model="goodsList.type==1 || goodsList.type==3">推荐</label>
               <label><input type="checkbox" name="type" value="2" v-model="goodsList.type==2 || goodsList.type==3">热门</label>
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
            text: [{txt:'商品列表', src:'goods_index'}, {txt:'编辑商品'}],
            id:'',        // 商品id
            goodsList:[],  // 商品数据
            brandsList: [], // 品牌列表
            sortList:[],    // 分类列表
            cover:'',      // 缩略图
            checkeds:[],   // 记录复选框长度
         }
      },
      created(){
         const ID = this.id = this.$route.query.id, _this = this;
         // 获取商品数据
         this.$http.get(`product/${ID}?include=brand,category`).then(goods=>{
            this.goodsList = goods;
            this.cover = this.Substr(goods.cover);

            // 预先请求品牌
            this.$http.get(`product_category_list/${goods.brand.id}?include=brand`).then(product=>{
               this.sortList = product.data.map((item)=>{
                  let json={};
                  json.text = item.title;
                  json.value = item.id;
                  return json;
               })
            })
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(brand=>{
            this.brandsList = brand
         });

         this.$nextTick(()=>{
            // 初始化编辑器
            $.ajax({url:'/static/ueditor/ueditor.all.js',dataType:'script',cache:true,success:function (){
               _this.UE = UE.getEditor('editor',{enableAutoSave:false,autoHeightEnabled:false});
               // 设置编辑器内容
               setTimeout(()=>{
                  _this.UE.setContent(_this.goodsList.content)
               },500)
            }});

            // 上传图片
            $('.picker input[type=file]').change(function(){
               if(this.files.length == 0) return;
               const files = this.files[0];
               const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src=""><i class="progress"></i><a href="javascript:;" class="preview">上传中</a><input type="hidden" name="cover" value=""></div>`);
               _this.readFile(type,files,authority,$(ele.parentNode.firstElementChild));
               $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
               // 修改删除图片
               $('#main').on('click','.trash',function (){
                  _this.delImg($(this),()=>{
                    _this.cover = ''
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
               let form = new FormData(); this.checkeds = [];
               const Formdata = $(e.path[0]).serializeArray().filter((item)=>{
                  return item.value !== '' && item.name != 'editorValue';
               });
               Formdata.forEach((item)=>{
                  // 判断复选框值
                  if(item.name == 'type'){
                     if(item.value==1){
                        form.append('type',item.value); // 添加复选值
                     } else {
                        form.append('type',item.value); // 添加复选值
                     }
                     this.checkeds.push(item.value)
                  } else {
                     form.append(item.name,item.value); // 添加其他项
                  }
               });
               // 判断长度是否全选
               if(this.checkeds.length==2){
                  form.delete('type');
                  form.append('type',3); // 添加复选值
               }
               if(UE.getEditor('editor').getContent()){
                  form.append('content',UE.getEditor('editor').getContent()); // 介绍内容
               }
               this.$http.post(`product/${this.id}`,form).then(res=>{
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
