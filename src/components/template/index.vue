<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'template_add'})" data-url="/template/add.html" class="btn btn-primary ajax-call" title="添加模板">添加模板</a>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>模板标题</th>
                  <th>模板描述</th>
                  <th>模板目录</th>
                  <th>缩略图</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in themeList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="desc" class="editable editable-click">{{item.desc}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="dir" class="editable editable-click">{{item.directory}}</a>
                  </td>
                  <td>
                     <img :src="val" v-for="val in item.cover" width="60" height="60">
                  </td>
                  <td>{{item.created_at}}</td>
                  <td>
                     <a href="javascript:;" class="btn btn-primary btn-xs ajax-call" @click="$router.push({name:'template_edit', query:{id:item.id}})" title="编辑模板"><i class="glyphicon glyphicon-pencil"></i></a>
                     <button class="btn btn-danger btn-xs del" @click="del(item.id)"><i class="glyphicon glyphicon-trash"></i></button>
                  </td>
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
            text: [{txt:'模板设置'}],
            themeList:[], // 模板列表
         }
      },
      created(){
         const loading = this.$loading({
            lock: true,
            text: '加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
         });
         this.$http.get('theme').then(res=>{
            this.themeList = res.data;
            loading.close(); // 结束loading
         })
      },
      updated(){
         // 初始化编辑框
         const _this = this;
         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, value) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form={};
               form[name] = value;
               _this.$http.patch(`theme/${ID}`,form)
            }
         })
      },
      methods:{
         // 删除模板
         del(id){
            this.$confirm('确定删除这一项', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`theme/${id}`).then(()=>{
                  this.themeList = this.themeList.filter((item)=>{return item.id != id})
               })
               this.$message({
                  type: 'success',
                  message: '删除成功!'
               })
            }).catch(()=>{})
         }
      }
   }
</script>
