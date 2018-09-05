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
                  <select name="service" class="form-control">
                     <option value="">服务情况</option>
                     <option value="0">未服务</option>
                     <option value="1">已服务</option>
                  </select>
                  <select name="sort_field" class="form-control">
                     <option value="create_time">注册时间倒序</option>
                     <option value="bs.add_time">分配时间倒序</option>
                     <option value="bs.service_time">服务时间倒序</option>
                  </select>
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
                  <th style="width:8em">ID</th>
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
               <tr v-for="(item,index) in beginsaleList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand_id" class="editable editable-click">{{source(item.brand.title)}}</a>
                  </td>
                  <td>{{item.name}}</td>
                  <td>
                     {{item.phone}}
                     <i class="glyphicon glyphicon-ok" style="color:limegreen" v-if="item.begin.is_tel"></i>
                     <button type="button" class="btn btn-xs contact" :data-id="item.id" @click="mark(item.id,'is_tel',index)" data-field="is_tel" data-type="beginsale" v-else><i class="glyphicon glyphicon-ok"></i></button>
                  </td>
                  <td>
                     {{item.wechat}}
                     <i class="glyphicon glyphicon-ok" style="color:limegreen" v-if="item.begin.is_wechat"></i>
                     <button type="button" class="btn btn-xs contact" :data-id="item.id" @click="mark(item.id,'is_wechat',index)" data-field="is_wechat" data-type="beginsale" v-else><i class="glyphicon glyphicon-ok"></i></button>
                  </td>
                  <td>{{item.qq}}</td>
                  <td>{{item.created_at}}</td>
                  <td>
                     <a href="#" data-type="textarea" :data-pk="item.id" data-name="comment" class="editable editable-pre-wrapped editable-click">{{item.begin.comment}}</a>
                  </td>
                  <td>
                     <a class="btn btn-primary btn-xs" href="http://ly.wasd1.com/contact/index/pid/73487.html" target="_blank">留言</a>
                  </td>
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
            text: [{txt: '售前名单'}],
            beginsaleList: [],  // 售前名单
            brandsList: [], // 品牌列表

            search:{},  // 搜索
            meta: {},  // 分页列表
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
         // 售前列表
         this.$http.get(`begin_sale/own_sale?include=begin,brand`).then(res => {
            this.beginsaleList = res.data;
            this.meta = res.meta.pagination;
            loading.close(); // 结束loading
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res => {
            this.brandsList = res;
         });
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`users/${ID}`,form)
            }
         });

         // 备注框
         $('.table a[data-type!="select"]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.post(`begin_sale/comment/${ID}`,form)
            }
         })
      },
      methods: {
         // 标记
         mark(id,type,index){
            this.$http.post(`begin_sale/service/${id}`,{type:type}).then(()=>{
               this.beginsaleList[index].begin[type] = 1
            })
         },

         // 搜索
         sendForm(e){
            this.currentPage = 1;
            const loading = this.$loading({
               lock: true,
               text: '加载中...',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)'
            });
            let inputs = e.target.querySelectorAll('select,input'), posts = {};
            inputs.forEach((item) => {
               posts[item.getAttribute('name')] = item.value
            });
            this.search = posts;
            this.$http.get(`begin_sale/own_sale?include=begin,brand&brand_id${posts.brand_id}&service=${posts.service}&sort_field=${posts.sort_field}&search_type=${posts.search_type}$key=${posts.key}`).then(res => {
               this.beginsaleList = res.data;
               this.meta = res.meta.pagination;
               loading.close(); // 结束loading
            }).catch(()=>{
               loading.close(); // 结束loading
               this.$message({
                  message: '请求出错',
                  type: 'warning'
               });
            })
         },

         // 分页
         pageChange(pag){
            const loading = this.$loading({
               lock: true,
               text: '加载中...',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)'
            });
            if(Object.keys(this.search).length == 0) {
               this.$http.get(`begin_sale/own_sale?include=begin,brand&page=${pag}`).then(res => {
                  this.beginsaleList = res.data;
                  this.meta = res.meta.pagination;
                  loading.close(); // 结束loading
               })
            } else {
               this.$http.get(`begin_sale/own_sale?include=begin,brand&brand_id${this.search.brand_id}&service=${this.search.service}&sort_field=${this.search.sort_field}&search_type=${this.search.search_type}$key=${this.search.key}&page=${pag}`).then(res => {
                  this.beginsaleList = res.data;
                  this.meta = res.meta.pagination;
                  loading.close(); // 结束loading
               })
            }
         }
      }
   }
</script>
