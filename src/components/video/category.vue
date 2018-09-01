<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'video_cateadd'})" class="btn btn-primary ajax-call" title="添加分类">添加分类</a>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>分类标题</th>
                  <th>排序</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in videoList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="oid" class="editable editable-click">{{item.oid}}</a>
                  </td>
                  <td>{{item.create_time}}</td>
                  <td>
                     <button class="btn btn-danger btn-xs del" :data-pk="item.id" @click="del(item.id)"><i class="glyphicon glyphicon-trash"></i></button>
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
            text: [{txt:'视频分类'}],
            videoList:[]  //视频分类列表
         }
      },
      created(){
         // 请求分类列表
         this.$http.get('video_category').then(video=>{
            this.videoList = video.data;
         })
      },
      updated(){
         const _this = this;
         // 编辑框
         $('.table a[data-type="text"]').editable({
            emptytext: '--',
            success: function (res, val) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form = {};
               form[name] = val;
               _this.$http.patch(`video_category/${ID}`,form)
            }
         })
      },
      methods:{
         // 删除分类
         del(id){
            this.$confirm(`确定删除此记录?`, {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`video_category/${id}`).then(()=>{
                  this.videoList = this.videoList.filter((item)=>{return item.id != id})
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
