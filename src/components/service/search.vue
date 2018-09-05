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
                  <select name="admin_id" class="form-control">
                     <option value="">所属员工</option>
                     <option :value="item.id" v-for="item in beginList" :key="item.id">{{item.username}}</option>
                  </select>
                  <select name="service" class="form-control">
                     <option value="">服务情况</option>
                     <option value="0">未服务</option>
                     <option value="1">已服务</option>
                  </select>
                  <select name="distribution" class="form-control">
                     <option value="">分配情况</option>
                     <option value="0">未分配</option>
                     <option value="1">已分配</option>
                  </select>
                  <select name="member" class="form-control">
                     <option value="0">试用会员</option>
                     <option value="1">正式会员</option>
                  </select>
                  <select name="date_type" class="form-control">
                     <option value="u.create_time">筛选注册时间</option>
                     <option value="bs.service_time">筛选服务时间</option>
                     <option value="u.up_time">筛选开通时间</option>
                  </select>
                  <div class="form-group">
                     <input type="date" name="start_at" class="form-control" placeholder="开始日期">
                     <input type="date" name="end_at" class="form-control" placeholder="结束日期">
                  </div>
                  <select name="search_type" class="form-control">
                     <option value="phone">手机号码</option>
                     <option value="name">姓名</option>
                     <option value="wechat">微信号</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="key" class="form-control">
                  </div>
                  <button type="submit" class="form-control btn btn-primary">查询</button>
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-striped">
               <thead>
               <tr class="active">
                  <th>所属品牌</th>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>微信号</th>
                  <th>QQ</th>
                  <th>注册时间</th>
                  <th>服务时间</th>
                  <th>所属员工</th>
                  <th>备注</th>
                  <th>旧备注</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in memberList" :key="item.id">
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click"></a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="name" class="editable editable-click">{{item.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="phone" class="editable editable-click">13479457245</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="wechat" class="editable editable-click">13479457245</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="qq" class="editable editable-click editable-empty">--</a>
                  </td>
                  <td>2018-09-05 15:15</td>
                  <td></td>e
                  <td>
                     <a href="#" data-type="slect" :data-pk="item.id" data-name="admin_id" :data-source="JSON.stringify(their(beginList))" data-value="34" class="editable editable-click"></a>
                  </td>
                  <td></td>
                  <td></td>
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
            text:[{txt:'会员搜索'}],
            brandsList:[],  // 品牌列表
            beginList:[],   // 售前客服列表
            memberList:[],  // 会员列表

            search:{},  // 搜索
            meta:{},    // 分页列表
            currentPage:1
         }
      },
      created(){
         const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
         });
         this.$http.get('begin_sale?include=begin,brand').then(res=>{
            this.memberList = res.data;
            this.meta = res.meta.pagination;
            loading.close(); // 结束loading
         });

         // 售前客服列表
         this.$store.dispatch('beginSale').then(res=>{
            this.beginList = res
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"][data-name!="dealer_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), form = {}, ID = this.getAttribute('data-pk');
               form[name] = val;

            }
         });

         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), form = {}, ID = this.getAttribute('data-pk');
               form[name] = val;
               console.log(form);
            }
         })
      },
      methods: {
         // 搜索
         sendForm(e){
            this.currentPage = 1;
            let inputs = e.target.querySelectorAll('select,input'),posts = {};
            inputs.forEach((item)=>{
               posts[item.getAttribute('name')] = item.value
            });
            //this.search = posts;
            console.log(posts);

            this.$http.get(`begin_sale?include=begin,brand&brand_id=${posts.brand_id}&admin_id=${posts.admin_id}&service=${posts.service}&distribution=${posts.distribution}&member=${posts.member}&date_type=${posts.date_type}&start_at=${posts.start_at}&end_at=${posts.end_at}&search_type=${posts.search_type}&key=${posts.key}`).then(res=>{
               this.memberList = res.data;
               console.log(res);
               //this.meta = res.meta.pagination
            })
         },

         // 分页

      }
   }
</script>
