<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="flex end">
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <div class="form-group">
                     <input type="date" name="start_at" placeholder="开始时间" class="form-control">
                  </div>
                  <div class="form-group">
                     <input type="date" name="end_at" placeholder="结束时间" class="form-control">
                  </div>
                  <button type="submit" class="btn btn-primary">查询</button>
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-striped">
               <thead>
               <tr class="active">
                  <th>品牌/日期</th>
                  <th v-for="(item,key) in dateline" :key="key">{{item}}</th>
                  <th style="color:red">总计</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="(val,keys,index) in reportList" :key="val.index" ref="listTr">
                  <td>{{val.name}}</td>
                  <td v-for="(item,key,index) of val" v-if="key!='name'" :data-id="keys" :data-day="key">
                     <span v-if="item!=0">{{item}}</span>
                     <span style="color:#ccc" v-else>-</span>
                  </td>
                  <td style="color:red">{{rowTotal(val)}}</td>
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
            text: [{txt:'合作推广业绩'}],
            dateline: [],  //日期
            reportList: {},  //合作推广业绩报表
            search:{}      //搜索
         }
      },
      created(){
         const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
         });
         this.$http.get(`report/dealer_achievement`).then(res => {
            for (let [key, val] of Object.entries(res)) {
               key == 0 ? this.dateline = val : this.reportList[key] = val;
            }
            loading.close(); // 结束loading
         })
      },
      methods: {
         //搜索
         sendForm(e){
            let inputs = e.target.querySelectorAll('select,input'), posts = {};
            inputs.forEach((item) => {
               posts[item.getAttribute('name')] = item.value
            });
            if (posts.start_at || posts.end_at) {
               this.search = posts;
               const loading = this.$loading({
                  lock: true,
                  text: '加载中...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
               });
               this.$http.get(`report/dealer_achievement?begin_time=${posts.start_at}&end_time=${posts.end_at}`).then(res => {
                  for (let [key, val] of Object.entries(res)) {
                     key == 0 ? this.dateline = val : this.reportList[key] = val;
                  }
                  loading.close(); // 结束loading
               })
            }
         }
      }
   }
</script>
