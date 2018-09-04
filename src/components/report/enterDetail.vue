<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <div class="table-content">
            <table class="table table-bordered table-hover">
               <thead>
               <tr class="active">
                  <th>品牌</th>
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
                  <th>{{brand(item.brand_id)}}</th>
                  <td>{{item.name}}</td>
                  <td>{{item.phone}}</td>
                  <td>{{item.wechat}}</td>
                  <td>{{item.qq}}</td>
                  <td>{{item.created_at}}</td>
                  <td>{{item.up_time}}</td>
                  <td>{{item.lock_time}}</td>
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
            text: [{txt:'入驻报表',src:'report_register'},{txt:'入驻详情'}],
            detailList:[],  // 详情数据
            brandsList:[],   // 品牌列表
            ID:'',  // 品牌id
            time:'',  //日期时间
            member:1, //默认是会员

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

         // 获取详情数据
         const id = this.ID = this.$route.query.id, time = this.time = this.$route.query.time, member = this.member = this.$route.query.member;
         this.$http.get(`report/brand_user?menber=${member}&brand_id=${id}&begin_time=${time}`).then(res=>{
            this.detailList = res.data;
            this.meta = res.meta.pagination;

            loading.close(); // 结束loading
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         })
      },
      methods:{
         // 品牌
         brand(id){
            return this.brandsList.filter((item)=>{
                return item.value == id
            })[0].text.substr(2);
         },

         // 分页
         pageChange(val){
            const loading = this.$loading({
               lock: true,
               text: '加载中...',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)'
            });

            this.$http.get(`report/brand_user?brand_id=${this.ID}&begin_time=${this.time}&page=${val}`).then(res=>{
               this.detailList = res.data;
               this.meta = res.meta.pagination;

               loading.close(); // 结束loading
            })
         }
      }
   }
</script>
