<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'goods_add'})" class="btn btn-primary ajax-call" title="添加商品">添加商品</a>
            </div>
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="condition" class="form-control">
                     <option value="title">商品标题</option>
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
                  <th>ID</th>
                  <th>所属品牌</th>
                  <th>商品分类</th>
                  <th>商品标题</th>
                  <th>规格</th>
                  <th>价格</th>
                  <th>浏览数</th>
                  <th>推荐</th>
                  <th>热门</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in goodsList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click">{{source(item.brand.title)}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.brand_id" data-name="cid" :data-value="item.category.id" class="editable editable-click">{{item.category.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="spec" class="editable editable-click">{{item.specification}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="price" class="editable editable-click">{{item.price}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="view_num" class="editable editable-click">{{item.view_num}}</a>
                  </td>
                  <td>
                     <span style="color:#ccc" v-if="item.type==0 || item.type==2">否</span>
                     <span style="color: red" v-else>是</span>
                  </td>
                  <td>
                     <span style="color:#ccc" v-if="item.type==0 || item.type==1">否</span>
                     <span style="color: red" v-else>是</span>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="status" data-source="[{text:'下架',value:0},{text:'上架',value:1}]" :data-value="item.status" class="editable editable-click">{{item.is_status}}</a>
                  </td>
                  <td>{{item.create_time}}</td>
                  <td>
                     <a href="javascript:;" class="btn btn-primary btn-xs ajax-call" @click="$router.push({name:'goods_edit',query:{id:item.id}})" title="编辑商品"><i class="glyphicon glyphicon-pencil"></i></a>
                     <button class="btn btn-danger btn-xs del" @click="del(item.id)" :data-pk="item.id"><i class="glyphicon glyphicon-trash"></i></button>
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
   import {API_URL} from '../../assets/js/api'

   export default {
      components: {
         crumb
      },
      data(){
         return {
            text: [{txt:'商品列表'}],
            goodsList:[],  // 商品名单
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
         // 商品列表
         this.$http.get('product?include=brand,category').then(res=>{
            this.goodsList = res.data;
            this.meta = res.meta.pagination;
            loading.close(); // 结束loading
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });
      },
      updated(){
         const _this = this;
         // 商品分类
         $('.table a[data-type="select"][data-name="cid"]').editable({
            emptytext: '--',
            showbuttons: false,
            source: function () {
               let json = $.ajax({
                  type:'get',
                  async:false,
                  headers:{'Authorization':localStorage.getItem('access_token')},
                  url:`${API_URL}/admin/product_category_list/${this.getAttribute('data-pk')}?include=brand`,
                  success:function(data){return data}
               });
               return JSON.stringify(json.responseJSON.data.map((item)=>{
                  let json={};
                  json.text = item.title;
                  json.value = item.id;
                  return json;
               }))
            },
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`product/${ID}`,form)
            }
         });

         // 下拉框
         $('.table a[data-type="select"][data-name!="cid"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`product/${ID}`,form)
            }
         });

         // 编辑框
         $('.table a[data-type!="select"]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`product/${ID}`,form)
            }
         })
      },
      methods:{
         // 搜索
         sendForm(e){
            this.currentPage = 1;
            let inputs = e.target.querySelectorAll('select,input'), posts = {};
            inputs.forEach((item) => {
               posts[item.getAttribute('name')] = item.value
            });
            this.search = posts;
            this.$http.get(`product?include=brand,category&brand_id=${posts.brand_id}&condition=${posts.condition}&key=${posts.key}`).then(res=>{
               this.goodsList = res.data;
               this.meta = res.meta.pagination;
            })
         },

         // 分页
         pageChange(val){
            if(Object.keys(this.search).length == 0){
               this.$http.get(`product?include=brand,category&page=${val}`).then(res=>{
                  this.goodsList = res.data;
                  this.meta = res.meta.pagination;
               })
            } else {
               this.$http.get(`product?include=brand,category&brand_id=${this.search.brand_id}&condition=${this.search.condition}&key=${this.search.key}&page=${val}`).then(res=>{
                  this.goodsList = res.data;
                  this.meta = res.meta.pagination;
               })
            }
         },

         // 删除商品
         del(id){
            this.$confirm(`确定删除此记录?`, {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`product/${id}`).then(()=>{
                  this.goodsList = this.goodsList.filter((item)=>{return item.id != id})
               })
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               })
            }).catch(()=>{});
         }
      }
   }
</script>
