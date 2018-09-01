<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'video_add'})" class="btn btn-primary ajax-call" title="添加视频">添加视频</a>
            </div>
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="condition" class="form-control">
                     <option value="title">视频标题</option>
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
                  <th>视频分类</th>
                  <th>视频标题</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in videoList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click"></a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="cid" :data-source="JSON.stringify(sortList)" :data-value="item.category.id" class="editable editable-click">{{item.category.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                     <a :href="item.video_url" target="_blank" style="color:#aaa">点击预览</a>
                  </td>
                  <td>{{item.create_time}}</td>
                  <td>
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
            text: [{txt:'视频列表'}],
            brandsList:[],   //品牌列表
            sortList:[],     //视频分类列表
            videoList:[],    //视频列表

            meta:{},  // 分页列表
            currentPage: 1,
            search:{} //搜索内容
         }
      },
      created(){
         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });

         // 请求分类列表
         this.$http.get('video_category').then(video=>{
            this.sortList = video.data.map((item)=>{
               let json={};
               json.text = item.title;
               json.value = item.id;
               return json;
            })
         })

         // 获取视频列表
         this.$http.get('video?include=brand,category').then(viode=>{
            this.videoList = viode.data;
            this.meta = viode.meta.pagination;
         })
      },
      updated(){
         const _this = this;
         // 下拉框(品牌)
         $('.table a[data-type="select"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`video/${ID}`, form)
            }
         });
         // 编辑框
         $('.table a[data-type="text"]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`video/${ID}`, form)
            }
         })
      },
      methods: {
         // 搜索
         sendForm(e){
            this.currentPage = 1;
            let inputs = e.target.querySelectorAll('select,input'), posts = {};
            inputs.forEach((item) => {
               posts[item.getAttribute('name')] = item.value
            });
            this.search = posts;
            this.$http.get(`video?include=brand,category&brand_id=${posts.brand_id}&key=${posts.key}`).then(res => {
               this.videoList = res.data;
               this.meta = res.meta.pagination;
            })
         },

         // 分页
         pageChange(val){
            // 判断有无搜索内容
            if (Object.keys(this.search).length == 0) {
               this.$http.get(`video?include=brand,category&page=${val}`).then(res => {
                  this.videoList = res.data;
                  this.meta = res.meta.pagination;
               })
            } else {
               this.$http.get(`video?include=brand,category&brand_id=${this.search.brand_id}&key=${this.search.key}&page=${val}`).then(res => {
                  this.videoList = res.data;
                  this.meta = res.meta.pagination;
               })
            }
         },

         // 删除视频
         del(id){
            this.$confirm(`确定删除此记录?`, {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`video/${id}`).then(() => {
                  this.videoList = this.videoList.filter((item) => {
                     return item.id != id
                  })
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
