<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="flex end">
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <select name="brand_id" class="form-control">
                     <option value="">所属品牌</option>
                     <option :value="item.value" v-for="item in brandsList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="partner_id" class="form-control">
                     <option value="">所属合作</option>
                     <option :value="item.value" v-for="item in partnerList" :key="item.value">{{item.text}}</option>
                  </select>
                  <select name="type" class="form-control">
                     <option value="">会员类型</option>
                     <option value="0">普通会员</option>
                     <option value="1">经销商</option>
                  </select>
                  <select name="condition" class="form-control">
                     <option value="phone">手机号码</option>
                     <option value="name">姓名</option>
                     <option value="wechat">微信号</option>
                  </select>
                  <div class="form-group">
                     <input type="text" name="word" class="form-control">
                  </div>
                  <button type="submit" class="form-control btn btn-primary">查询</button>
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>ID</th>
                  <th>所属品牌</th>
                  <th>所属合作</th>
                  <th>姓名</th>
                  <th>会员类型</th>
                  <th>经销商</th>
                  <th>推广人</th>
                  <th>手机号码</th>
                  <th>微信号</th>
                  <!--<th>登陆密码</th>-->
                  <th title="推广用户付费所得">奖励1</th>
                  <th title="名下经销商推广用户付费所得">奖励2</th>
                  <th>状态</th>
                  <th>创建时间</th>
                  <th>开通时间</th>
                  <th>到期时间</th>
                  <th>操作</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="item in userList" :key="item.id">
                  <td>{{item.id}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="brand_id" :data-source="JSON.stringify(brandsList)" :data-value="item.brand.id" class="editable editable-click"></a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="partner_id" :data-source="JSON.stringify(partnerList)" :data-value="item.partner.id" class="editable editable-click">{{item.partner.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="name" class="editable editable-click">{{item.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="type" data-source="[{text:'普通会员',value:0},{text:'经销商',value:1}]" :data-value="item.is_dealer" class="editable editable-click">{{item.type}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" data-name="dealer_id" :data-pa="item.partner.id" :data-value="item.dealer.id" class="editable editable-click">{{item.dealer.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="pid" :data-value="item.parent.id" class="editable editable-click">{{item.parent.name}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="phone" class="editable editable-click">{{item.phone}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="wechat" class="editable editable-click">{{item.wechat}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="normal_rate" :data-value="item.normal_rate" class="editable editable-click">{{item.normal_rate}}%</a>
                  </td>
                  <td>
                     <a href="#" data-type="text" :data-pk="item.id" data-name="dealer_rate" :data-value="item.dealer_rate" class="editable editable-click">{{item.dealer_rate}}%</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="status" data-source="[{text:'禁用',value:0},{text:'正常',value:1}]" :data-value="item.is_status" class="editable editable-click">{{item.status}}</a>
                  </td>
                  <td>{{item.created_at}}</td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-name="up_time" data-source="" class="editable editable-click editable-empty">{{item.up_time}}</a>
                  </td>
                  <td>
                     <a href="#" data-type="select" :data-pk="item.id" data-source="" class="editable editable-click editable-empty">{{item.lock_time}}</a>
                  </td>
                  <td>
                     <a class="btn btn-primary btn-xs editable editable-click" href="#" data-type="text" :data-pk="item.id" data-name="pwd" data-value="" data-original-title="" title="">改密</a>
                     <a class="btn btn-primary btn-xs" target="_blank">留言</a><!--href="http://afgj.wasd1.com/contact/index/pid/189683.html"-->
                     <button class="btn btn-danger btn-xs del" :data-pk="item.id"><i class="glyphicon glyphicon-trash"></i></button>
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
            text: [{txt:'会员名单'}],
            userList: [], // 会员列表
            brandsList: [], // 品牌列表
            partnerList: [], // 合作列表


            meta: {},  // 分页列表
            currentPage: 1,

         }
      },
      created(){
         // 获取会员列表
         this.$http.get('users?include=brand,partner,dealer,parent').then(res=>{
            this.userList = res.data;
            this.meta = res.meta.pagination;
         });

         // 获取品牌列表
         this.$http.get('brands?sort=1').then(brands=>{
            this.brandsList = brands.data.map((item)=>{
               let list = {};
               list.value = item.id;
               list.text = `${item.pinyin.substr(0, 1)}.${item.title}`;
               return list;
            })
         });

         // 获取合作列表
         this.$http.get('partner?include=brand').then(partner=>{
             this.partnerList = partner.data.map((item)=>{
                let list = {};
                list.value = item.id;
                list.text = item.name;
                return list;
             })
         })
      },
      updated(){
         const _this = this;
         // 下拉框
         $('.table a[data-type="select"][data-name!="dealer_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            success: function (res, val) {
               const ID = this.getAttribute('data-pk');

            }
         });

         $('.table a[data-type="select"][data-name="dealer_id"]').editable({
            emptytext: '--',
            showbuttons: false,
            source:function () {
               let json = [];
               let bb = _this.$http.get(`users?include=brand,partner,dealer,parent&partner_id=${this.getAttribute('data-pa')}&type=1`).then(res=>{
                  res.data.map((item)=>{
                     json.push({text: item.name, value: item.id})
                  })

                  return json;
               });

               console.log(bb)
            }
         },function(){
            console.log(1);
         })

         // 编辑框
         $('.table a[data-type!="select"][data-type]').editable({
            emptytext: '--',
            success: function (res, value) {
               const name = this.getAttribute('data-name'), form = {}, ID = this.getAttribute('data-pk');
               form[name] = value;
               console.log(form);
            }
         })
      },
      methods: {
         // 经销商
        /* partner(id){
            return this.$http.get(`users?include=brand,partner,dealer,parent&partner_id=${id}&type=1`).then(res=>{
               return JSON.stringify(res.data.map((item)=>{
                  let json={};
                  json.text = item.name;
                  json.value = item.id;
                  return json;
               }))
            })
         },*/

         // 搜索
         sendForm(e){
            let inputs = e.target.querySelectorAll('select,input'),posts = {};
            inputs.forEach((item)=>{
                posts[item.getAttribute('name')] = item.value
            });
            console.log(posts);
         },

         // 分页
         pageChange(val){

         }
      }
   }
</script>
