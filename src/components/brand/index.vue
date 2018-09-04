<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="flexv content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'brand_add'})" class="btn btn-primary ajax-call" title="添加品牌">添加品牌</a>
            </div>
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="condition" class="form-control">
                     <option value="pinyin">首拼</option>
                     <option value="title">品牌名</option>
                  </select>
                  <div class="form-group">
                     <input type="text" class="form-control" name="word">
                  </div>
                  <button type="submit" class="btn btn-primary form-control">查询</button>
               </form>
            </div>
         </header>

         <table class="table table-bordered table-hover table-condensed table-striped">
            <thead>
            <tr class="active">
               <th>ID</th>
               <th>首拼</th>
               <th>品牌名</th>
               <th>创建时间</th>
               <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in brandData" :key="item.id">
               <td>{{item.id}}</td>
               <td>
                  <a href="javascript:;" data-type="text" :data-pk="item.id" data-name="pinyin" class="editable editable-click">{{item.pinyin}}</a>
               </td>
               <td>
                  <a href="javascript:;" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
               </td>
               <td>{{item.create_time}}</td>
               <td>
                  <a href="javascript:;" @click="$router.push({name:'brand_edit', query:{id:item.id}})" class="btn btn-primary btn-xs ajax-call" title="编辑品牌">
                     <i class="glyphicon glyphicon-pencil"></i>
                  </a>
                  <a href="javascript:;" @click="$router.push({name:'partner_index', query:{id:item.id}})" class="btn btn-primary btn-xs ajax-call" title="合作名单">合作名单</a>
                  <a href="javascript:;" @click="$router.push({name:'goods_category', query:{id:item.id}})" class="btn btn-primary btn-xs ajax-call" title="商品分类">商品分类</a>
                  <button class="btn btn-danger btn-xs del" :data-pk="item.id" @click="del(item.id)"><i class="glyphicon glyphicon-trash"></i></button>
               </td>
            </tr>
            </tbody>
         </table>

         <!--<div class="flexitem end block">
            <el-pagination
               @current-change="pageChange"
               :current-page.sync="currentPage"
               :page-size="meta.per_page"
               layout="prev, pager, next, jumper"
               :background=true
               :total="meta.total">
            </el-pagination>
         </div>-->
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
            text: [{txt:'品牌设置'}],
            brandData:[],
            //meta:{},
            //currentPage: 1
         }
      },
      created(){
         // 初始请求数据
         this.$http.get('brands').then(res=>{
            this.brandData = res.data;
            //this.meta = res.meta.pagination;
         });
      },
      updated(){
         // 初始化编辑框
         const _this = this;
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (response, value) {
               const tit = this.getAttribute('data-name');
               if(tit == 'pinyin'){
                  _this.$http.patch(`brands/${this.getAttribute('data-pk')}`,{pinyin:value})
               } else {
                  _this.$http.patch(`brands/${this.getAttribute('data-pk')}`,{title:value})
               }
            }
         })
      },
      methods:{
         // 使用选择框(分页)
         /*pageChange(val) {
            this.$http.get(`http://zx.eyooh.com/api/admin/brands?page=${val}`).then(res=>{
               this.brandData = res.data;
               this.meta = res.meta.pagination;
            })
         },*/

         // 删除品牌
         del(id){
            const tit = this.brandData.filter((item)=>{return item.id == id})[0].title;
            this.$confirm(`确定删除'${tit}'记录?`, {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`brands/${id}`).then(()=>{
                  this.brandData = this.brandData.filter((item)=>{return item.id != id})
               })
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               })
            }).catch(()=>{});
         },

         // 搜索
         sendForm(e){
            //this.currentPage = 1;
            let inputs = e.target.querySelectorAll('input,textarea,select'),posts = {};
            inputs.forEach((item)=>{
               posts[item.getAttribute('name')] = item.value
            });
            this.$http.get(`/brands?type=${posts.condition}&key=${posts.word}`).then(res=>{
               this.brandData = res.data;
            })
         }
      }
   }
</script>
