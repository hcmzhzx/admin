<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="flex end">
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm1">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="admin_id" class="form-control">
                     <option value="">所属员工</option>
                     <option value="17">洪浩明</option>
                     <option value="34">伍文波</option>
                     <option value="35">洪江明</option>
                     <option value="36">覃峥嵘</option>
                     <option value="38">冯美娇</option>
                     <option value="39">皮蝉</option>
                     <option value="40">李书琴</option>
                     <option value="43">肖添禹</option>
                     <option value="44">王世富</option>
                     <option value="45">刘嘉伟</option>
                     <option value="50">余腊</option>
                     <option value="52">付正伟</option>
                     <option value="53">赖海燕</option>
                     <option value="55">张雄军</option>
                     <option value="56">刘威</option>
                     <option value="60">周超</option>
                     <option value="61">邱德奇</option>
                     <option value="62">张永</option>
                     <option value="63">贺乐乐</option>
                     <option value="64">李玉流</option>
                     <option value="65">何强</option>
                     <option value="66">李叶山</option>
                     <option value="67">鲍伟明</option>
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
                  <select name="sort_field" class="form-control">
                     <option value="u.id">注册时间倒序</option>
                     <option value="bs.service_time">服务时间倒序</option>
                     <option value="bs.add_time">分配时间倒序</option>
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
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th style="width: 5em;"><label><input type="checkbox" id="choose-all">全选</label></th>
                  <th>所属品牌</th>
                  <th>姓名</th>
                  <th>手机号码</th>
                  <th>微信号</th>
                  <th>QQ</th>
                  <th>注册时间</th>
                  <th>服务时间</th>
                  <th>所属员工</th>
                  <th>备注</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in beginsaleList" :key="item.id">
                  <td><input type="checkbox" name="ids[]" :value="item.id"></td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click"></a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="name" class="editable editable-click">{{item.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="phone" class="editable editable-click">{{item.phone}}</a><i class="glyphicon glyphicon-ok" v-if="item.begin.is_tel" style="color: limegreen"></i>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="wechat" class="editable editable-click">{{item.wechat}}</a><i class="glyphicon glyphicon-ok" v-if="item.begin.is_wechat" style="color: limegreen"></i>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="qq" class="editable editable-click editable-empty">{{item.qq}}</a>
                  </td>
                  <td>{{item.created_at}}</td>
                  <td>{{item.begin.service_time}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="admin_id" :data-source="JSON.stringify(their(beginList))" :data-value="item.begin.admin_id" class="editable editable-click editable-empty"></a>
                  </td>
                  <td>{{item.begin.comment}}</td>
               </tr>
               </tbody>
            </table>
            <footer class="between block" @submit.prevent="sendForm2">
               <div>
                  <form class="form-inline">
                     <select name="admin_id" class="form-control">
                        <option v-for="item in beginList" :key="item.id" :value="item.id">{{item.username}}</option>
                     </select>
                     <button type="submit" class="form-control btn btn-primary alloc">分配</button>
                  </form>
               </div>
               <el-pagination
                  @current-change="pageChange"
                  :current-page.sync="currentPage"
                  :page-size="meta.per_page"
                  layout="prev, pager, next, jumper"
                  :background=true
                  :total="meta.total">
               </el-pagination>
            </footer>
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
            text: [{txt:'售前总名单'}],
            beginsaleList:[],  // 售前名单
            brandsList: [], // 品牌列表
            beginList:[],  // 售前客服列表

            search:{},  // 搜索
            meta: {},  // 分页列表
            currentPage: 1
         }
      },
      created(){
         // 售前列表
         this.$http.get('begin_sale?include=begin,brand').then(res=>{
            this.beginsaleList = res.data;
            this.meta = res.meta.pagination;
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         })

         // 售前客服列表
         this.$http.get('begin_sale/admin').then(res=>{
            this.beginList = res
         })
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"][data-name!="admin_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`users/${ID}`,form)
            }
         });

         // 编辑框
         $('.table a[data-type!="select"]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`users/${ID}`,form)
            }
         });

         // 所属员工
         $('.table a[data-type="select"][data-name="admin_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const ID = this.getAttribute('data-pk'), users=[ID];
               _this.$http.post('begin_sale/distribution',{admin_id:val,users}).then(res=>{
                  _this.$message({
                     type: 'success',
                     message: res.message
                  });
               })
            }
         });

         // 全选
         $('.table-content').on('click','#choose-all',function () {
            $('[name="ids[]"]').prop('checked',$(this).prop('checked'));
         });
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
         sendForm1(e){
            this.currentPage = 1; // 重置分页
            let inputs = e.target.querySelectorAll('select,input'),posts = {};
            inputs.forEach((item)=>{
               posts[item.getAttribute('name')] = item.value
            });
            this.search = posts;
            this.$http.get(`begin_sale?include=begin,brand&brand_id=${posts.brand_id}&admin_id=${posts.admin_id}&service=${posts.service}&distribution=${posts.distribution}&member=${posts.member}&date_type=${posts.date_type}&start_at=${posts.start_at}&end_at=${posts.end_at}&sort_field=${posts.sort_field}&search_type=${posts.search_type}&key=${posts.key}`).then(res=>{
               this.beginsaleList = res.data;
               this.meta = res.meta.pagination
            })
         },

         //分配
         sendForm2(e){
            let sel = e.target.querySelectorAll('select')[0],id= sel.value;
            let users = $('[name="ids[]"]').serializeArray().map((item)=>{
                let arr = [];
                arr.push(item.value);
                return arr.join('');
            });
            if(!users.length){  //未选择分配用户
               this.$message({
                  type: 'warning',
                  message: '分配失败'
               });
            } else {
               this.$http.post('begin_sale/distribution',{admin_id:id,users}).then(res=>{
                  this.$message({
                     type: 'success',
                     message: res.message
                  })
               })
            }
         },

         // 分页
         pageChange(val){
            if(Object.keys(this.search).length == 0){
               this.$http.get(`begin_sale?include=begin,brand&page=${val}`).then(res=>{
                  this.beginsaleList = res.data;
                  this.meta = res.meta.pagination;
               })
            } else {
               this.$http.get(`begin_sale?include=begin,brand&brand_id=${this.search.brand_id}&admin_id=${this.search.admin_id}&service=${this.search.service}&distribution=${this.search.distribution}&member=${this.search.member}&date_type=${this.search.date_type}&start_at=${this.search.start_at}&end_at=${this.search.end_at}&sort_field=${this.search.sort_field}&search_type=${this.search.search_type}&key=${this.search.key}&page=${val}`).then(res=>{
                  this.beginsaleList = res.data;
                  this.meta = res.meta.pagination
               })
            }
            $('#choose-all').prop('checked',false);  // 取消全选
         }
      }
   }
</script>
