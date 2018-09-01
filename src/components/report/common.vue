<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <div class="table-content">
            <table class="table table-bordered table-hover table-striped" style="width: 500px">
               <thead>
               <tr class="active">
                  <th>时间\类型</th>
                  <th>入驻用户</th>
                  <th>开通会员</th>
                  <th>销售额</th>
                  <th>提现</th>
                  <th>开通率</th>
               </tr>
               </thead>
               <tbody>
               <tr>
                  <td>今日</td>
                  <td v-cloak>{{commonList.today.user_fk}}</td>
                  <td v-cloak>{{commonList.today.member_count}}</td>
                  <td v-cloak>{{commonList.today.order_money}}</td>
                  <td v-cloak>{{commonList.today.use_cash}}</td>
                  <td v-cloak>{{commonList.today.member_rate}}%</td>
               </tr>
               <tr>
                  <td>昨日</td>
                  <td v-cloak>{{commonList.yesterday.user_fk}}</td>
                  <td v-cloak>{{commonList.yesterday.member_count}}</td>
                  <td v-cloak>{{commonList.yesterday.order_money}}</td>
                  <td v-cloak>{{commonList.yesterday.use_cash}}</td>
                  <td v-cloak>{{commonList.yesterday.member_rate}}%</td>
               </tr>
               <tr>
                  <td>前日</td>
                  <td v-cloak>{{commonList.before_yesterday.user_fk}}</td>
                  <td v-cloak>{{commonList.before_yesterday.member_count}}</td>
                  <td v-cloak>{{commonList.before_yesterday.order_money}}</td>
                  <td v-cloak>{{commonList.before_yesterday.use_cash}}</td>
                  <td v-cloak>{{commonList.before_yesterday.member_rate}}%</td>
               </tr>
               <tr>
                  <td>本月</td>
                  <td v-cloak>{{commonList.this_month.user_fk}}</td>
                  <td v-cloak>{{commonList.this_month.member_count}}</td>
                  <td v-cloak>{{commonList.this_month.order_money}}</td>
                  <td v-cloak>{{commonList.this_month.use_cash}}</td>
                  <td v-cloak>{{commonList.this_month.member_rate}}%</td>
               </tr>
               <tr>
                  <td>同比</td>
                  <td v-cloak>{{commonList.this_last_month.user_fk}}</td>
                  <td v-cloak>{{commonList.this_last_month.member_count}}</td>
                  <td v-cloak>{{commonList.this_last_month.order_money}}</td>
                  <td v-cloak>{{commonList.this_last_month.use_cash}}</td>
                  <td v-cloak>{{commonList.this_last_month.member_rate}}%</td>
               </tr>
               <tr>
                  <td>上月</td>
                  <td v-cloak>{{commonList.last_month.user_fk}}</td>
                  <td v-cloak>{{commonList.last_month.member_count}}</td>
                  <td v-cloak>{{commonList.last_month.order_money}}</td>
                  <td v-cloak>{{commonList.last_month.use_cash}}</td>
                  <td v-cloak>{{commonList.last_month.member_rate}}%</td>
               </tr>
               <tr>
                  <td>前月</td>
                  <td v-cloak>{{commonList.before_last_month.user_fk}}</td>
                  <td v-cloak>{{commonList.before_last_month.member_count}}</td>
                  <td v-cloak>{{commonList.before_last_month.order_money}}</td>
                  <td v-cloak>{{commonList.before_last_month.use_cash}}</td>
                  <td v-cloak>{{commonList.before_last_month.member_rate}}%</td>
               </tr>
               <tr>
                  <td>总计</td>
                  <td v-cloak>{{commonList.total.user_fk}}</td>
                  <td v-cloak>{{commonList.total.member_count}}</td>
                  <td v-cloak>{{commonList.total.order_money}}</td>
                  <td v-cloak>{{commonList.total.use_cash}}</td>
                  <td v-cloak>{{commonList.total.member_rate}}%</td>
               </tr>
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
            text: [{txt:'常规报表'}],
            //报表数据
            commonList:{
               today:{},   //今日
               yesterday:{},   //昨日
               before_yesterday:{},   //前日
               this_month:{},   //本月
               this_last_month:{},   //同比
               last_month:{},   //上月
               before_last_month:{},   //前月
               total:{}   //总计
            }
         }
      },
      created(){
         const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
         });

         this.$http.get('report/index').then(res=>{
            this.commonList.today = {...res.today};
            this.commonList.yesterday = {...res.yesterday};
            this.commonList.before_yesterday = {...res.before_yesterday};
            this.commonList.this_month = {...res.this_month};
            this.commonList.this_last_month = {...res.this_last_month};
            this.commonList.last_month = {...res.last_month};
            this.commonList.before_last_month = {...res.before_last_month};
            this.commonList.total = {...res.total};

            loading.close(); // 结束loading
         })
      },

   }
</script>
