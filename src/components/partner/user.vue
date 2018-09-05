<template>
   <div id="partner_user" class='flexitemv'>
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" data-url="/partner/useradd.html" class="btn btn-primary ajax-call" title="添加管理员">添加管理员</a>
            </div>
            <div class="search">
               <form class="form-inline">
                  <select name="partner_id" class="form-control">
                     <option value="">所属合作</option>
                     <option v-for="item in partnerList" :key="item.value" :value="item.value">{{item.text}}</option>
                  </select>
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
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>所属合作</th>
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
                  <td>58</td>
                  <td>
                     <a href="#" data-type="select" data-pk="58" data-name="partner_id" :data-source="JSON.stringify(partnerList)" data-value="" class="editable editable-click">美体健康顾问</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" data-pk="58" data-name="account" class="editable editable-click">美体财务</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" data-pk="58" data-name="pwd" data-value="" class="editable editable-click editable-empty">--</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" data-pk="58" data-name="is_root" data-value="0" data-source="[{text:'否',value:0},{text:'是',value:1}]" class="editable editable-click">否</a>
                  </td>
                  <td>
                     <!--data-source="/partner/getgroups/partner_id/21.html" data-url="/admin/usersetgroup.html"-->
                     <a href="#" data-pk="58" data-type="checklist" data-value="1" data-source='[{text:"财务",value:1},{text:"会计",value:2}]' data-title="请选择角色" class="editable editable-click">财务</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" data-pk="58" data-value="0" data-source="[{text:'有效',value:0},{text:'禁用',value:1}]" data-name="is_lock" class="editable editable-click">有效</a>
                  </td>
                  <td>2018-03-01 09:51</td>
                  <td>
                     <button class="btn btn-danger btn-xs del" data-pk="58"><i class="glyphicon glyphicon-trash"></i></button>
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
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'合作名单', src:`partner_index?id=${this.$route.query.id}`}, {txt:'合作管理员'}],
            ID: '',  // 品牌ID
            partnerList:[], // 合作列表
         }
      },
      created(){
         const id = this.ID = this.$route.query.ID;
         console.log(id);

         // 获取合作列表
         this.$store.dispatch('PartnerData').then(res=>{
            this.partnerList = res
         });
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const ID = this.getAttribute('data-pk');

            }
         });
         // 编辑框
         $('.table a[data-type!="select"]').editable({
            emptytext: '--',
            success: function (res, value) {
               const name = this.getAttribute('data-name'), form={}, ID = this.getAttribute('data-pk');
               form[name] = value;

            }
         })
      },
      methods:{

      }
   }
</script>

<style>
   #partner_user input[type=checkbox]{-webkit-appearance:checkbox}
</style>
