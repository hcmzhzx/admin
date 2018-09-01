<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
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
            text: [{txt:'文章分类', src:'news_category'}, {txt:'添加分类'}]
         }
      },
      methods:{
         sendForm(e){
            new CheckForm(e,err => {
               this.$message({
                  message: err,
                  type: 'warning'
               });
            },post => {
               if(post.oid == '') {post.oid = 1000};
               this.$http.post('article_category',post).then(res=>{
                  this.$router.go(-1)
               })
            })
         }
      }
   }
</script>
