<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="flexv content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'partner_add'})" class="btn btn-primary ajax-call" title="添加合作">添加合作</a>
            </div>
            <div class="search">
               <form class="form-inline">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option v-for="item in brandsList" :key="item.value" :value="item.value">{{item.text}}</option>
                  </select>
                  <select name="condition" class="form-control">
                     <option value="site_title">网站名称</option>
                     <option value="name">姓名</option>
                     <option value="phone">客服号码</option>
                     <option value="fg_domain">前台域名</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="word" class="form-control">
                  </div>
                  <input type="button" value="查询" class="form-control btn btn-primary">
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>所属品牌</th>
                  <th>网站名称</th>
                  <th>姓名</th>
                  <th>客服号码</th>
                  <th>客服微信</th>
                  <th>前台域名</th>
                  <th>后台域名</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in brandList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click">{{source(item.brand.title)}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="site_title" class="editable editable-click">{{item.site_title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="name" class="editable editable-click">{{item.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="phone" class="editable editable-click">{{item.phone}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="wechat" class="editable editable-click">{{item.wechat}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="fg_domain" class="editable editable-click">{{item.fg_domain}}</a>
                  </td>
                  <td>{{item.bg_domain}}</td>
                  <td>{{item.create_time}}</td>
                  <td>
                     <a href="javascript:;" @click="$router.push({name:'partner_edit',query:{id:item.brand.id, ID:item.id}})" class="btn btn-primary btn-xs ajax-call" title="编辑合作"><i class="glyphicon glyphicon-pencil"></i></a>
                     <a href="javascript:;" @click="$router.push({name:'partner_user',query:{id:item.brand.id, ID:item.id}})" class="btn btn-primary btn-xs ajax-call" title="合作管理员">管理员</a>
                     <a href="javascript:;" @click="$router.push({name:'partner_wechat',query:{id:item.brand.id, ID:item.id, is_w:item.is_wechat}})" class="btn btn-primary btn-xs ajax-call" title="合作微信配置">微信配置</a>
                     <a href="javascript:;" @click="$router.push({name:'partner_payment',query:{id:item.brand.id, ID:item.id}})" data-url="/partner/payment/partner_id/23.html" class="btn btn-primary btn-xs ajax-call" title="会员价格">会员价格</a>
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
         return{
            text: [{txt:'合作名单'}],
            brandsList:[],  // 品牌列表
            brandList:[] // 合作名单列表
         }
      },
      created(){
         // 所属品牌id
         const id = this.$route.query.id;
         // 判断进去的路由
         if(id){
            this.$http.get(`partner?include=brand`).then(brand=>{
               this.brandList = brand.data.filter((item)=>{
                  return item.brand.id == id;
               })
            });
            this.text.unshift({txt:'品牌设置', src:'brand_index'});
         } else {
            this.$http.get(`partner?include=brand`).then(brand=>{
               this.brandList = brand.data
            })
         }

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         })
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               let value = _this.select.filter((item)=>{
                  return item.value == val
               })[0].value;
               const ID = this.getAttribute('data-pk');
               _this.$http.patch(`partner/${ID}`,{brand_id:value})
            }
         });

         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, value) {
               const name = this.getAttribute('data-name'), ID = this.getAttribute('data-pk'), form={};
               form[name] = value;
               _this.$http.patch(`partner/${ID}`,form)
            }
         })
      },
      methods:{
         // 删除合作
         del(id){
            this.$confirm('确定删除此记录?', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`partner/${id}`).then(()=>{
                  this.brandList = this.brandList.filter((item)=>{return item.id != id})
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
