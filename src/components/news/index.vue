<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'news_add'})" class="btn btn-primary ajax-call" title="添加文章">添加文章</a>
            </div>
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="condition" class="form-control">
                     <option value="title">文章标题</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="key" class="form-control">
                  </div>
                  <input type="submit" value="查询" class="form-control btn btn-primary">
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>所属品牌</th>
                  <th>文章分类</th>
                  <th>文章标题</th>
                  <th>浏览数</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in articleList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click"></a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="cid" :data-source="JSON.stringify(sortList)" :data-value="item.category.id" class="editable editable-click">{{item.category.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="view_num" class="editable editable-click">{{item.view_num}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="status" data-source="[{text:'隐藏',value:0},{text:'显示',value:1}]" :data-value="item.status" class="editable editable-click">{{item.is_status}}</a>
                  </td>
                  <td>{{item.create_time}}</td>
                  <td>
                     <a href="javascript:;" @click="$router.push({name:'news_edit',query:{id:item.id}})" data-url="/news/edit/id/11934.html" class="btn btn-primary btn-xs ajax-call" title="编辑文章"><i class="glyphicon glyphicon-pencil"></i></a>
                     <button class="btn btn-danger btn-xs del" :data-pk="item.id" @click="del(item.id)"><i class="glyphicon glyphicon-trash"></i></button>
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
            text:[{txt:'文章列表'}],
            brandsList:[],   //品牌列表
            sortList:[],     //文章分类列表
            articleList:[],  //文章列表

            meta:{},  // 分页列表
            currentPage: 1,
            search:{}, //搜索内容
         }
      },
      created(){
         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });

         // 请求分类列表
         this.$http.get('article_category').then(article=>{
            this.sortList = article.data.map((item)=>{
                let json={};
                json.text = item.title;
                json.value = item.id;
                return json;
            })
         })

         // 获取文章列表
         this.$http.get('article?include=brand,category').then(article=>{
            this.articleList = article.data;
            this.meta = article.meta.pagination;
         })
      },
      updated(){
         // 初始化编辑框
         const _this = this;
         // 下拉框(品牌)
         $('.table a[data-type="select"][data-name!="status"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};form[name] = val;
               _this.$http.patch(`article/${ID}`,form)
            }
         });
         // 编辑框
         $('.table a[data-type!="select"][data-type="text"]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};form[name] = val;
               _this.$http.patch(`article/${ID}`,form)
            }
         });
         // 状态
         $('.table a[data-type="select"][data-name="status"]').editable({
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};form[name] = val;
               _this.$http.patch(`article/${ID}`,form)
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
            this.$http.get(`article?include=brand,category&brand_id=${posts.brand_id}&key=${posts.key}`).then(res=>{
               this.articleList = res.data;
               this.meta = res.meta.pagination;
            })
         },

         // 分页
         pageChange(val){
            // 判断有无搜索内容
            if(Object.keys(this.search).length == 0){
               this.$http.get(`article?include=brand,category&page=${val}`).then(res=>{
                  this.articleList = res.data;
                  this.meta = res.meta.pagination;
               })
            } else {
               this.$http.get(`article?include=brand,category&brand_id=${this.search.brand_id}&key=${this.search.key}&page=${val}`).then(res=>{
                  this.articleList = res.data;
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
               this.$http.delete(`article/${id}`).then(()=>{
                  this.articleList = this.articleList.filter((item)=>{return item.id != id})
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
