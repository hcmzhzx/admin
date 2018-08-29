<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="flex end">
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="service_type" class="form-control">
                     <option value="">服务情况</option>
                     <option value="1">未服务</option>
                     <option value="2">已服务</option>
                  </select>
                  <select name="sort_field" class="form-control">
                     <option value="u.id">注册时间倒序</option>
                     <option value="bs.add_time">分配时间倒序</option>
                     <option value="bs.service_time">服务时间倒序</option>
                  </select>
                  <select name="condition" class="form-control">
                     <option value="phone">手机号码</option>
                     <option value="name">姓名</option>
                     <option value="wechat">微信号</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="word" class="form-control">
                  </div>
                  <input type="submit" value="查询" class="form-control btn btn-primary">
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-striped">
               <thead>
               <tr class="active">
                  <th style="width: 5em">ID</th>
                  <th>所属品牌</th>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>微信号</th>
                  <th>QQ</th>
                  <th>注册时间</th>
                  <th>备注</th>
                  <th>留言</th>
               </tr>
               </thead>
               <tbody>

               </tbody>
            </table>
         </div>
      </div>
   </div>
</template>

<script>
   import crumb from '../header/crumb'

   export default {
      components: {
         crumb
      },
      data(){
         return {
            text: [{txt:'售前名单'}],
            beginsaleList: [],  // 售前名单
            brandsList: [], // 品牌列表

         }
      },
      created(){
         // 售前列表


         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         })

      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"][data-name!="dealer_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const ID = this.getAttribute('data-pk');

            }
         });

         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, value) {
               const name = this.getAttribute('data-name'), form = {}, ID = this.getAttribute('data-pk');
               form[name] = value;
               console.log(form);
            }
         })
      },
      methods:{
         // 搜索
         sendForm(e){
            this.currentPage = 1;

         },

         // 分页

      }
   }
</script>
