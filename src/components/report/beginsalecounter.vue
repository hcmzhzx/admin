<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="flex end">
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <!--<div class="form-group">
                     <select name="member" class="form-control">
                        <option value="1">正式会员</option>
                        <option value="">全部用户</option>
                     </select>
                  </div>-->
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
                  <th>姓名/日期</th>
                  <th v-for="(item,key) in dateline" :key="key">{{item}}</th>
                  <th style="color:red">总计</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="(val,keys,index) in reportList" :key="val.index" ref="listTr">
                  <td>{{val.name}}</td>
                  <td v-for="(item,key,index) of val" v-if="key!='name'" :data-id="keys" :data-day="key">
                     <a title="服务详情" href="javascript:;" class="ajax-call" v-if="item!=0" @click="started">{{item}}</a>
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
            text:[{txt:'销售量'}],
            dateline: [],  //日期
            reportList: {},  //销售额报表
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

         this.$http.get(`report/begin_sale_count`).then(res => {
            for (let [key, val] of Object.entries(res)) {
               key == 0 ? this.dateline = val : this.reportList[key] = val;
            }
            loading.close(); // 结束loading
         })
      },
      methods: {
         // 行求和
         rowTotal(item){
            let arrNuber = Object.values(item).filter((item) => {
               return Number.isFinite(item);
            });
            return arrNuber.reduce((prev, cur) => {
               return prev + cur
            })
         },

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
               this.$http.get(`report/begin_sale_count?begin_time=${posts.start_at}&end_time=${posts.end_at}`).then(res => {
                  for (let [key, val] of Object.entries(res)) {
                     key == 0 ? this.dateline = val : this.reportList[key] = val;
                  }
                  loading.close(); // 结束loading
               })
            }
         },

         // 详情
         started(e){
            let year = new Date().Format("yyyy-"), id = e.target.parentNode.getAttribute('data-id')=='总计'?'':e.target.parentNode.getAttribute('data-id'), time = '';
            // 未搜索过
            if (Object.keys(this.search).length == 0) {
               time = year + e.target.parentNode.getAttribute('data-day');
               this.$router.push({name:'report_salesDetail', query:{id,time}})
            } else {
               // 搜索过
               time = this.search.start_at.substr(0, 5) + e.target.parentNode.getAttribute('data-day');
               this.$router.push({name:'report_salesDetail', query:{id,time}})
            }
         }
      }
   }
</script>
