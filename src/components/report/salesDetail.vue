<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <div class="table-content">
            <table class="table table-bordered table-hover">
               <thead>
               <tr class="active">
                  <th>所属员工</th>
                  <th>站点</th>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>微信</th>
                  <th>QQ</th>
                  <th>注册时间</th>
                  <th>开通时间</th>
                  <th>到期时间</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in detailList" :key="item.id">
                  <td>{{item.user.begin_admin_id}}</td>
                  <td>{{item.partner.name}}</td>
                  <td>{{item.user.name}}</td>
                  <td>{{item.user.phone}}</td>
                  <td>{{item.user.wechat}}</td>
                  <td>{{item.user.qq}}</td>
                  <td>{{item.user.report_create_time}}</td>
                  <td>{{item.pay_time}}</td>
                  <td>{{item.user.lock_time}}</td>
               </tr>
               </tbody>
            </table>
            <div class="flexitem end block">
               <el-pagination
                  @current-change="pageChange"
                  :current-page.sync="currentPage"
                  :page-size="meta.per_page"
                  layout="prev, pager, next, jumper"
                  :background=true
                  :total="meta.total">
               </el-pagination>
            </div>
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
            text:[{txt:'销售量', src:'report_beginsalecounter'}, {txt:'销售详情'}],
            detailList:[],  // 详情数据
            ID:'',  // 员工id
            time:'',  //日期时间
            vip:'',

            meta:{},  // 分页列表
            currentPage: 1
         }
      },
      created(){
         const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
         });
         // 获取详情数据  , member = this.vip = this.$route.query.vip
         const id = this.ID = this.$route.query.id, time = this.time = this.$route.query.time;
         this.$http.get(`report/begin_sale_member?include=user,partner&admin_id=${id}&begin_time=${time}`).then(res=>{
            this.detailList = res.data;
            this.meta = res.meta.pagination;
            loading.close(); // 结束loading
         });
      },
      methods:{
         // 分页
         pageChange(val){
            const loading = this.$loading({
               lock: true,
               text: '加载中...',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.get(`report/begin_sale_member?include=user,partner&admin_id=${this.ID}&begin_time=${this.time}&page=${val}`).then(res=>{
               this.detailList = res.data;
               this.meta = res.meta.pagination;
               loading.close(); // 结束loading
            })
         }
      }
   }
</script>
