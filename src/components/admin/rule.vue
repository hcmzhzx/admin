<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" data-url="/admin/ruleadd/type/0.html" title="添加权限" class="btn btn-primary ajax-call">添加权限</a>
            </div>
         </header>

         <table class="table table-bordered table-hover table-condensed table-striped">
            <thead>
            <tr class="active">
               <th>ID</th>
               <th>权限名称</th>
               <th>权限标示</th>
               <th>图标</th>
               <th>排序</th>
               <th>可视</th>
               <th>状态</th>
               <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td>1</td>
               <td>
                  <a href="#" data-type="text" data-url="/rule/update.html" data-pk="1" data-name="title" class="editable editable-click">系统管理</a>
               </td>
               <td>
                  <a href="#" data-type="text" data-url="/rule/update.html" data-pk="1" data-name="name" class="editable editable-click editable-empty">--</a>
               </td>
               <td>
                  <a href="#" data-type="text" data-url="/rule/update.html" data-pk="1" data-name="icon" class="editable editable-click">glyphicon glyphicon-cog</a>
               </td>
               <td>
                  <a href="#" data-type="text" data-url="/rule/update.html" data-pk="1" data-name="oid" class="editable editable-click">6000</a>
               </td>
               <td>
                  <a href="#" data-type="select" data-url="/rule/update.html" data-pk="1" data-value="1" data-name="is_show" class="editable editable-click">显示</a>
               </td>
               <td>
                  <a href="#" data-type="select" data-url="/rule/update.html" data-pk="1" data-value="1" data-name="status" class="editable editable-click">有效</a>
               </td>
               <td>
                  <button class="btn btn-danger btn-xs del" data-pk="1" data-url="/rule/delete.html"><i class="glyphicon glyphicon-trash"></i></button>
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
            text: [{txt:'系统权限'}]
         }
      }
   }
</script>
