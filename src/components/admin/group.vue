<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" data-url="/admin/groupadd.html" title="添加角色" class="btn btn-primary ajax-call">添加角色</a>
            </div>
         </header>

         <table class="table table-bordered table-hover table-condensed table-striped">
            <thead>
            <tr class="active">
               <th>序号</th>
               <th>角色名</th>
               <th>状态</th>
               <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td>2</td>
               <td>
                  <a href="#" data-type="text" data-pk="2" data-url="/group/update.html" data-name="title" class="editable editable-click">超级管理员</a>
               </td>
               <td>
                  <a href="#" data-type="select" data-pk="2" data-url="/group/update.html" data-value="1" data-name="status" class="editable editable-click">有效</a>
               </td>
               <td>
                  <a href="javascript:;" data-url="/admin/grouprule/id/2.html" class="btn btn-primary btn-xs ajax-call" title="分配权限">
                     <i class="glyphicon glyphicon-plus"></i>
                  </a>
                  <button class="btn btn-danger btn-xs del" data-pk="2" data-url="/group/delete.html">
                     <i class="glyphicon glyphicon-trash"></i>
                  </button>
               </td>
            </tr>
            </tbody>
         </table>
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
            text: [{txt:'系统角色'}]
         }
      }
   }
</script>
