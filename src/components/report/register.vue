<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <header class="flex end">
            <div class="search">
               <form class="form-inline" @submit.prevent="sendForm">
                  <div class="form-group">
                     <select name="type" class="form-control">
                        <option value="1">正式会员</option>
                        <option value="0">全部用户</option>
                     </select>
                  </div>
                  <div class="form-group">
                     <input type="date" name="started_at" placeholder="开始时间" class="form-control">
                  </div>
                  <div class="form-group">
                     <input type="date" name="ended_at" placeholder="结束时间" class="form-control">
                  </div>
                  <input type="submit" value="查询" class="btn btn-primary">
               </form>
            </div>
         </header>
         <div class="table-content">
            <table class="table table-bordered table-hover table-condensed table-striped">
               <thead>
               <tr class="active">
                  <th>品牌/日期</th>
                  <th>02</th>
                  <th>03</th>
                  <th>04</th>
                  <th>05</th>
                  <th>06</th>
                  <th>07</th>
                  <th>08</th>
                  <th>09</th>
                  <th>10</th>
                  <th>11</th>
                  <th>12</th>
                  <th>13</th>
                  <th>14</th>
                  <th>15</th>
                  <th>16</th>
                  <th>17</th>
                  <th>18</th>
                  <th>19</th>
                  <th>20</th>
                  <th>21</th>
                  <th>22</th>
                  <th>23</th>
                  <th>24</th>
                  <th>25</th>
                  <th>26</th>
                  <th>27</th>
                  <th>28</th>
                  <th>29</th>
                  <th>30</th>
                  <th>31</th>
                  <th>01</th>
                  <th style="color: red">总计</th>
               </tr>
               </thead>
               <tbody>
               <tr v-for="(item,index) in registerList" :key="item.name">
                  <!--<td>完美</td>
                  <td>
                     <a title="入驻详情" href="javascript:;" class="ajax-call" data-url="/report/registerdetail/started_at/1533139200/brand/%E5%AE%8C%E7%BE%8E.html">2</a>
                  </td>
                  <td><span style="color: #ccc">-</span></td>-->
                  <td>{{item.name}}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
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
            text: [{txt: '入驻报表'}],
            registerList:{}  //入驻报表
         }
      },
      created(){
         this.$http.get('report/brand?member=1').then(res=>{
            console.log(res);
            this.registerList = res;
         })
      }

   }
</script>
