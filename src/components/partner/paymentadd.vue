<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">支付标题</label>
               <input type="text" class="form-control medium" name="title" data-rule="*" data-errmsg="支付标题必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="attr">支付描述</label>
               <input type="text" class="form-control small" name="attr" data-rule="*" data-errmsg="支付描述必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="price">价格</label>
               <input type="number" class="form-control small" name="price" data-rule="n" data-errmsg="价格必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="market_price">市场价</label>
               <input type="number" class="form-control small" name="market_price" data-rule="n" data-errmsg="市场价必须填写" data-sync="true">
            </div>
            <div class="form-group">
               <label for="month">使用时间(月)</label>
               <input type="number" class="form-control small" name="month" data-rule="n" data-errmsg="使用时间必须填写" data-sync="true">
            </div>
            <input type="hidden" name="partner_id" :value="ID">
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
            text: [
               {txt:'品牌设置', src:'brand_index'},
               {txt:'合作名单', src:`partner_index`},
               {txt:'会员价格', src:`partner_payment`},
               {txt:'添加会员价格'}
            ],
            ID:'' // 品牌id
         }
      },
      created(){
         this.ID = this.$route.query.Id
      },
      methods:{
         // 表单验证提交
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
               this.$http.post('partner/member',Form).then(res=>{
                  this.$router.go(-1);
               })
            })
         }
      }
   }
</script>
