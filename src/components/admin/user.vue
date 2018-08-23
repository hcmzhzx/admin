<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="flexv content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" data-url="/admin/useradd.html" class="btn btn-primary ajax-call" title="添加管理员">添加管理员</a>
            </div>
            <div class="search">
               <form action="/admin/user.html" class="form-inline">
                  <select name="condition" class="form-control">
                     <option value="account">账号</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="word" class="form-control">
                  </div>
                  <input type="submit" value="查询" class="form-control btn btn-primary">
               </form>
            </div>
         </header>

         <table class="table table-bordered table-hover table-condensed table-striped">
            <thead>
            <tr class="active">
               <th>ID</th>
               <th>账号</th>
               <th>密码</th>
               <th>root用户</th>
               <th>角色</th>
               <th>状态</th>
               <th>创建时间</th>
               <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td>1</td>
               <td>
                  <a href="#" data-type="text" data-pk="1" data-url="/admin/update.html" data-name="account" class="editable editable-click">陈建平</a>
               </td>
               <td>
                  <a href="#" data-type="text" data-pk="1" data-url="/admin/chpwd.html" data-name="pwd" data-value="" class="editable editable-click editable-empty">--</a>
               </td>
               <td>
                  <a href="#" data-type="select" data-pk="1" data-url="/admin/update.html" data-name="is_root" data-value="1" class="editable editable-click">是</a>
               </td>
               <td>
                  <a href="#" data-pk="1" data-type="checklist" data-value="17" data-url="/admin/usersetgroup.html" data-title="请选择角色" class="editable editable-click">售前主管</a>
               </td>
               <td>
                  <a href="#" data-type="select" data-pk="1" data-url="/admin/update.html" data-name="is_lock" data-value="0" class="editable editable-click">有效</a>
               </td>
               <td>2016-10-18 11:17</td>
               <td>
                  <button class="btn btn-danger btn-xs del" data-pk="1" data-url="/admin/delete.html"><i class="glyphicon glyphicon-trash"></i></button>
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
            text: [{txt:'系统管理员'}]
         }
      }
   }
</script>
