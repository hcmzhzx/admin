<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="between">
            <div class="opera">
               <a href="javascript:;" @click="$router.push({name:'admin_qrcodeadd'})" class="btn btn-primary ajax-call" title="添加二维码">添加二维码</a>
            </div>
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="admin_id" class="form-control">
                     <option value="">所属客服</option>
                     <option value="17">洪浩明</option>
                     <option value="34">伍文波</option>
                     <option value="35">洪江明</option>
                     <option value="36">覃峥嵘</option>
                     <option value="38">冯美娇</option>
                     <option value="39">皮蝉</option>
                     <option value="40">李书琴</option>
                     <option value="43">肖添禹</option>
                     <option value="44">王世富</option>
                     <option value="45">刘嘉伟</option>
                     <option value="50">余腊</option>
                     <option value="52">付正伟</option>
                     <option value="53">赖海燕</option>
                     <option value="55">张雄军</option>
                     <option value="56">刘威</option>
                     <option value="60">周超</option>
                     <option value="61">邱德奇</option>
                     <option value="62">张永</option>
                     <option value="63">贺乐乐</option>
                     <option value="64">李玉流</option>
                     <option value="65">何强</option>
                     <option value="66">李叶山</option>
                     <option value="67">鲍伟明</option>
                  </select>
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option v-for="item in brandList" :key="item.value" :value="item.value">{{item.text}}</option>
                  </select>
                  <input type="submit" value="查询" class="form-control btn btn-primary">
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>二维码</th>
                  <th>所属客服</th>
                  <th>所属品牌</th>
                  <th>添加时间</th>
                  <th>状态</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in qrcodeData" :key="item.id">
                  <td>
                     <img :src="item.qrcode" width="80" height="80">
                  </td>
                  <td>
                     <!--{{item.admin.account}}-->
                     <a href="#" data-type="select" :data-pk="item.id" data-name="admin_id" data-value="35" class="editable editable-click"></a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click">{{source(item.brand.title)}}</a>
                  </td>
                  <td>{{item.create_time}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="state" data-source="[{text:'禁止',value:0},{text:'正常',value:1}]" :data-value="item.state" class="editable editable-click">{{item.is_state}}</a>
                  </td>
                  <td>
                     <button class="btn btn-danger btn-xs del" :data-pk="item.id" @click="del(item.id)"><i class="glyphicon glyphicon-trash"></i></button>
                  </td>
               </tr>
               </tbody>
            </table>
            <div class="flexitem end block">
               <el-pagination
                  @current-change="pageChange"
                  :current-page.sync="currentPage"
                  :page-size="meta.per_page"
                  layout="prev, pager, next, jumper"
                  :background=true
                  :total="meta.total">
               </el-pagination>
            </div>
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
            text: [{txt: '客服二维码'}],
            qrcodeData: [], // 二维码列表
            brandsList:[],   // 品牌列表

            meta:{},  // 分页列表
            currentPage: 1,

            search:{}, //搜索内容
            URL:''     //搜索链接
         }
      },
      created(){
         // 获取客服列表
         this.$http.get('admins').then(res=>{
            //console.log(res);
         });

         // 获取品牌列表
         this.$store.dispatch('BrandsData').then(res=>{
            this.brandsList = res
         });

         // 获取二维码列表
         this.$http.get('admin_qrcode?include=brand').then(res=>{
            //console.log(res);
            this.qrcodeData = res.data;
            this.meta = res.meta.pagination;
         })
      },
      updated(){
         // 填写下拉框内容
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const name = this.getAttribute('data-name'), Id = this.getAttribute('data-pk'), form={};
               form[name] = parseInt(val);
               _this.$http.patch(`admin_qrcode/${Id}`, form)
            }
         })
      },
      methods:{
         // 拼接首拼.品牌名
         source(selec){return `${this.PY(selec).substr(0, 1)}.${selec}`},

         // 搜索
         sendForm(e){
            let inputs = e.target.querySelectorAll('select'),posts = {};
            inputs.forEach((item)=>{
               if(item.value != ''){
                  posts[item.getAttribute('name')] = item.value
               }
            });
            this.search = posts;

            // 不能写在 data 里,防止下次选择累积添加参数
            this.URL = 'admin_qrcode?include=brand';
            // 判断搜索内容是否为空--拼接搜索链接
            if(Object.keys(posts).length){
               if(posts.admin_id && posts.brand_id){
                  this.URL += `&admin_id=${posts.admin_id}&brand_id=${posts.brand_id}`;
               } else if(posts.admin_id){
                  this.URL += `&admin_id=${posts.admin_id}`;
               } else {
                  this.URL += `&brand_id=${posts.brand_id}`;
               }
               this.$http.get(this.URL).then(res=>{
                  //console.log(res);
                  this.qrcodeData = res.data;
                  this.meta = res.meta.pagination;
               })
            }
         },

         // 分页
         pageChange(val){
            // 判断有无搜索内容
            if(Object.keys(this.search).length == 0){
               this.$http.get(`admin_qrcode?include=brand&page=${val}`).then(res=>{
                  //console.log(res);
                  this.qrcodeData = res.data;
                  this.meta = res.meta.pagination;
               })
            } else {
               this.$http.get(this.URL += `&page=${val}`).then(res=>{
                  //console.log(res);
                  this.qrcodeData = res.data;
                  this.meta = res.meta.pagination;
               })
            }
         },

         // 删除
         del(id){
            this.$confirm('确定删除此记录?', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               this.$http.delete(`admin_qrcode/${id}`).then(()=>{
                  this.qrcodeData = this.qrcodeData.filter((item)=>{return item.id != id})
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
