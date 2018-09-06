<template>
   <div class='flexitemv'>
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label>缩略图</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker" data-type="product_category" data-authority="pc_image_upload">
                        <input type="file" accept="image/*" class="upfile" data-trash="" data-rule="*" data-errmsg="缩略图必选" data-sync="true"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <div class="form-group">
               <label for="title">分类名</label>
               <input type="text" class="form-control small" name="title" id="title" data-rule="*" data-errmsg="分类名必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="oid">排序</label>
               <input type="text" id="oid" class="form-control small" name="oid" value="1000">
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
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'商品分类', src:`goods_category?id=${this.$route.query.id}`}, {txt:'添加分类'}],
            ID:''  // 品牌ID
         }
      },
      created(){
         this.ID = this.$route.query.id;
         // 上传文件
         const _this = this;
         this.$nextTick(()=>{
            $('.picker input[type=file]').change(function(e){
               const files = e.target.files[0];
               if(files.length == 0) return;
               const ele = this.parentNode, type = ele.getAttribute('data-type'), authority = ele.getAttribute('data-authority');
               $(ele).siblings().remove();
               $(ele).before(`<div class="box list"><img src="${window.URL.createObjectURL(files)}"><i class="progress"></i><a href="javascript:;" class="preview trash">上传中</a><input type="hidden" name="cover" value=""></div>`);
               _this.readFile(type,files,authority,$(ele.parentNode.firstChild));
               $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
               // 修改删除图片
               $('#main').on('click','.trash',function (){
                  _this.delImg($(this));
               })
            })
         })
      },
      methods: {
         // 提交全部列表
         sendForm(e){
            new CheckForm(e,err => {
               this.$message({    // 此处搞不懂为什么不能使用 layer
                  message: err,
                  type: 'warning'
               });
            },() => {
               const Formdata = $(e.path[0]).serializeArray().filter((item) => {
                  return item.value !== '';
               });
               let Form = {};
               Formdata.forEach((item) => {
                  Form[item.name] = item.value.trim();
               });
               Form.brand_id = this.ID;  //商品ID
               this.$http.post('product_category',Form).then(res=>{
                  this.$router.push({name:'goods_category',query:{id:this.ID}});
               }).catch(()=>{})
            })
         },
         // 更换图片请求
         readFile(type,files,authority,ev){
            const form = new FormData();
            form.append('type',type);
            form.append('image',files);
            form.append('authority',authority);
            this.$http.post('image',form).then(url=>{
               ev.find('input[type=hidden]').val(this.Substr(url.path));
               ev.find('span').remove();
               ev.find('a.preview').text('修改');
            })
         }
      }
   }
</script>
