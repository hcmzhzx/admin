<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="flexv content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'goods_cateadd',query:{id:ID}})" class="btn btn-primary ajax-call" title="添加分类">添加分类</a>
            </div>
            <div class="search">
               <form class="form-inline">
                  <select name="condition" class="form-control">
                     <option value="title">分类名</option>
                  </select>
                  <div class="form-group">
                     <input type="text" class="form-control" name="word">
                  </div>
                  <input type="submit" class="btn btn-primary form-control" value="查询">
               </form>
            </div>
         </header>

         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>所属品牌</th>
                  <th>分类名</th>
                  <th>排序</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in brandData" :key='item.id'>
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(select)" :data-value="item.brand.id" class="editable editable-click">{{py(item.brand.title)}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="title" class="editable editable-click">{{item.title}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="oid" class="editable editable-click">{{item.oid}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="status" data-source='[{text:"正常",value:1},{text:"下架",value:0}]' :data-value="item.status=='正常'?1:0" class="editable editable-click">{{item.status}}</a>
                  </td>
                  <td>{{item.create_time}}</td>
                  <td>
                     <button class="btn btn-danger btn-xs del" @click="del(item.id)" :data-pk="item.id"><i class="glyphicon glyphicon-trash"></i></button>
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
            text: [{txt:'品牌设置', src:'brand_index'}, {txt:'商品分类'}],
            ID:'',  // 品牌ID
            brandData:[],
            select:[]  // 下拉框
         }
      },
      created(){
         this.ID = this.$route.query.id;
         // 请求分类列表
         this.$http.get(`product_category_list/${this.ID}?&include=brand`).then(res=>{
            this.brandData = res.data
         });

         // 下拉框选项内容
         this.$http.get('brands?sort=1').then(selec=>{
            this.select = selec.data.map((item)=>{
               let list = {};
               list.value = item.id;
               list.text = `${item.pinyin.substr(0, 1)}.${item.title}`;
               return list
            })
         })
      },
      updated(){
         // 初始化编辑框
         const _this = this;
         this.$nextTick(()=>{
            // 下拉框
            $('.table a[data-type="select"][data-name="brand_id"]').editable({
               showbuttons: false,
               success: function (res, val) {
                  let value = _this.select.filter((item)=>{
                     return item.value == val
                  })[0].value;
                  const ID = this.getAttribute('data-pk');
                  _this.$http.patch(`product_category/${ID}`,{brand_id:value})
               }
            });
            // 状态
            $('.table a[data-type="select"][data-name="status"]').editable({
               showbuttons: false,
               success: function (res, val) {
                  const ID = this.getAttribute('data-pk');
                  _this.$http.patch(`product_category/${ID}`,{status:val})
               }
            })
            // 编辑框
            $('.table a[data-type!="select"][data-type="text"]').editable({
               emptytext: '--',
               success: function (response, value) {
                  const ID = this.getAttribute('data-pk');
                  _this.$http.patch(`product_category/${ID}`,{title:value})
               }
            })
         })
      },
      methods:{
         // 拼接首拼加文字
         py(str){
            return `${this.PY(str).substring(0, 1)}.${str}`;
         },

         //删除分类
         del(id){
            this.$confirm(`确定删除此记录?`, {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`product_category/${id}`).then(res=>{
                  this.brandData = this.brandData.filter((item)=>{return item.id != id})
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
