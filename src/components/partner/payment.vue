<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="#" class="btn btn-primary ajax-call" @click="$router.push({name:'partner_paymentadd', query:{id:$route.query.id, Id:ID}})" data-url="/partner/paymentadd/partner_id/21.html" title="添加会员价格">添加会员价格</a>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>所属合作</th>
                  <th>支付标题</th>
                  <th>支付描述</th>
                  <th>价格</th>
                  <th>市场价</th>
                  <th>使用时间(月)</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in dataList" :key='item.id'>
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="partner_id" :data-source="JSON.stringify(source)" :data-value="item.partner_id" class="editable editable-click">{{partner(item.partner_id)}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="attr" class="editable editable-click">{{item.attr}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="price" class="editable editable-click">{{item.price}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="market_price" class="editable editable-click">{{item.market_price}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="month" class="editable editable-click">{{item.month}}</a>
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
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'合作名单', src:`partner_index`}, {txt:'会员价格'}],
            ID: '',  // 合作ID
            dataList:[],
            source:[]  // 选择框内容
         }
      },
      created(){
         this.ID = this.$route.query.ID;
         // 请求品牌
         this.$http.get('partner?include=brand').then(res=>{
            this.source = res.data.map((item)=>{
                let json={text:'',value:''};
                json.text = item.name;
                json.value = item.id;
                return json;
            })
         });

         // 请求会员价格列表
         this.$http.get(`partner/member?partner_id=${this.ID}`).then(res=>{
            this.dataList = res.payments
         })
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               let value = _this.source.filter((item)=>{
                  return item.value == val
               })[0].value;
               const ID = this.getAttribute('data-pk');
               _this.$http.patch(`partner/member/${ID}`,{partner_id:value})
            }
         });

         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, value) {
               const name = this.getAttribute('data-name'), form={}, ID = this.getAttribute('data-pk');
               form[name] = value;
               _this.$http.patch(`partner/member/${ID}`,form)
            }
         })
      },
      methods:{
         // 所属合作名称
         partner(id){
            if(this.source.length == 0) return
            return this.source.filter((item)=>{
               return item.value == id
            })[0].text;
         },

         // 删除会员价格
         del(id){
            this.$confirm('确定删除此记录?', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`partner/member/${id}`).then(()=>{
                  this.dataList = this.dataList.filter((item)=>{return item.id != id})
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
