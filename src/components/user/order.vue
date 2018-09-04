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
                  <select name="partner_id" class="form-control">
                     <option value="">所属合作</option>
                     <option :value="item.value" v-for="item in partnerList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="admin_id" class="form-control">
                     <option value="">所属员工</option>
                     <option :value="item.id" v-for="item in beginList" :key="item.id">{{item.username}}</option>
                  </select>
                  <select name="pay_status" class="form-control">
                     <option value="">支付类型</option>
                     <option value="1">已支付</option>
                     <option value="0">未支付</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="order" class="form-control" placeholder="商户订单号">
                  </div>
                  <select name="search_type" class="form-control">
                     <option value="name">姓名</option>
                     <option value="phone">手机号码</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="key" class="form-control">
                  </div>
                  <button type="submit" class="form-control btn btn-primary">查询</button>
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover  table-striped">
               <thead>
               <tr class="active">
                  <th>订单编号</th>
                  <th>所属品牌</th>
                  <th>所属合作</th>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>属性</th>
                  <th>价格</th>
                  <th>经销商[推广经销商奖励]</th>
                  <th>经销商[推广会员奖励]</th>
                  <th>所属员工</th>
                  <th>注册时间</th>
                  <th>下单时间</th>
                  <th>支付时间</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in orderList" :key="item.id">
                  <td>{{item.order}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click">{{item.brand.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="partner_id" :data-source="JSON.stringify(partnerList)" :data-value="item.partner.id" class="editable editable-click">{{item.partner.name}}</a>
                  </td>
                  <td>{{item.user.name}}</td>
                  <td>{{item.user.phone}}</td>
                  <td>{{item.attr}}</td>
                  <td>{{item.price}}</td>
                  <td><a href="#" data-type="text" :data-pk="item.id" data-name="dealer_award" data-value="0" class="editable editable-click">{{item.dealer_award}}元</a>
                  </td>
                  <td>{{item.user.normal_name}}<a href="#" data-type="text" :data-pk="item.id" data-name="normal_award" data-value="119" class="editable editable-click" v-if="item.normal_award || item.user.normal_name">[{{item.normal_award}}元]</a></td>
                  <td>
                     <a href="#" data-type="select" data-url="" :data-pk="item.id" data-name="admin_id" :data-source="JSON.stringify(their(beginList))" :data-value="item.user.begin_admin_id" class="editable editable-click"></a>
                  </td>
                  <td>{{item.user.create_time}}</td>
                  <td>{{item.create_time}}</td>
                  <td>{{item.pay_time}}</td>
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
            text: [{txt:'支付订单'}],
            orderList:[], // 订单列表
            brandsList: [], // 品牌列表
            partnerList: [], // 合作列表
            beginList:[],  // 员工列表

            search:{},  // 搜索
            meta: {},  // 分页列表
            currentPage: 1,
         }
      },
      created(){
         // 订单列表
         this.$http.get('order?include=user,brand,partner').then(res=>{
            this.orderList = res.data;
            this.meta = res.meta.pagination;
         });

         // 获取员工列表
         this.$store.dispatch('beginSale').then(res=>{
            this.beginList = res
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });

         // 获取合作列表
         this.$store.dispatch('PartnerData').then(res=>{
            this.partnerList = res
         })
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"][data-name!="dealer_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), form = {};
               form[name] = val;
               _this.$http.patch(`users`,form).then(res=>{
                  console.log(res);
               })
            }
         });

         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), form = {};
               form[name] = val;
               _this.$http.patch(`users`,form).then(res=>{
                  console.log(res);
               })
            }
         })
      },
      methods:{
         // 所属员工
         their(data){
            return data.map((item)=>{
               let json={};
               json.text = item.username;
               json.value = item.id;
               return json
            })
         },

         // 搜索
         sendForm(e){
            this.currentPage = 1;
            let inputs = e.target.querySelectorAll('select,input'),posts = {};
            inputs.forEach((item)=>{
               posts[item.getAttribute('name')] = item.value
            });
            this.search = posts;
            this.$http.get(`order?include=user,brand,partner&brand_id=${posts.brand_id}&partner_id=${posts.partner_id}&admin_id=${posts.admin_id}&pay_status=${posts.pay_status}&order=${posts.order}&search_type=${posts.search_type}&key=${posts.key}`).then(res=>{
               this.orderList = res.data;
               this.meta = res.meta.pagination;
            })
         },

         // 分页
         pageChange(val){
            // 判断有无搜索内容
            if(Object.keys(this.search).length == 0){
               this.$http.get(`order?include=user,brand,partner&page=${val}`).then(res=>{
                  this.orderList = res.data;
                  this.meta = res.meta.pagination;
               });
            } else {
               this.$http.get(`order?include=user,brand,partner&brand_id=${posts.brand_id}&partner_id=${posts.partner_id}&admin_id=${posts.admin_id}&pay_status=${posts.pay_status}&order=${posts.order}&search_type=${posts.search_type}&key=${posts.key}&page=${val}`).then(res=>{
                  this.userList = res.data;
                  this.meta = res.meta.pagination;
               })
            }
         }
      }
   }
</script>
