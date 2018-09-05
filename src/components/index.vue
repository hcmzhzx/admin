<template>
   <div class="flexitem nbr">
      <nav id="aside">
         <ul id="accordion" role="tablist" aria-multiselectable="true" @click="panel">
            <li class="panel">
               <a title="系统管理" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-cog"></i>系统管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseOne" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'admin_rule'})" title="系统权限" class="ajax-call">系统权限</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'admin_group'})" title="系统角色" class="ajax-call">系统角色</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'admin_user'})" title="系统管理员" class="ajax-call">系统管理员</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'brand_index'})" title="品牌设置" class="ajax-call">品牌设置</a></li>
                  <li><a href="javascript:;" data-url="/admin/operlog.html" title="操作日志" class="ajax-call">操作日志</a></li>
                  <li><a href="javascript:;" data-url="/admin/chownpwd.html" title="修改密码" class="ajax-call">修改密码</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'admin_qrcode'})" title="客服二维码" class="ajax-call">客服二维码</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'template_index'})" title="模板设置" class="ajax-call">模板设置</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="合作管理" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-globe"></i>合作管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'partner_index'})" title="合作名单" class="ajax-call">合作名单</a></li>
                  <li><a href="javascript:;" data-url="/partner/rule.html" title="合作权限" class="ajax-call">合作权限</a></li>
                  <li><a href="javascript:;" data-url="/partner/group.html" title="合作角色" class="ajax-call">合作角色</a></li>
                  <li><a href="javascript:;" data-url="/partner/user.html" title="合作管理员" class="ajax-call">合作管理员</a></li>
                  <li><a href="javascript:;" data-url="/push/cash.html" title="提现订单" class="ajax-call">提现订单</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="会员管理" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-user"></i>会员管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'user_index'})" title="会员名单" class="ajax-call">会员名单</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'user_order'})" title="支付订单" class="ajax-call">支付订单</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="售前管理" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-earphone"></i>售前管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseFour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'service_beginsales'})" title="售前总名单" class="ajax-call">售前总名单</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'service_beginsale'})" title="售前名单" class="ajax-call">售前名单</a></li>
                  <!--<li><a href="javascript:;" @click="$router.push({name:'service_search'})" title="会员搜索" class="ajax-call">会员搜索</a></li>-->
               </ul>
            </li>
            <li class="panel">
               <a title="售后管理" data-toggle="collapse" data-parent="#accordion" href="#collapseFive" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-earphone"></i>售后管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseFive" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'service_aftersales'})" title="售后总名单" class="ajax-call">售后总名单</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'service_aftersale'})" title="售后名单" class="ajax-call">售后名单</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="商品管理" data-toggle="collapse" data-parent="#accordion" href="#collapseSix" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-shopping-cart"></i>商品管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseSix" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'goods_index'})" title="商品列表" class="ajax-call">商品列表</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="文章管理" data-toggle="collapse" data-parent="#accordion" href="#collapseSeven" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-list-alt"></i>文章管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseSeven" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'news_category'})" title="文章分类" class="ajax-call">文章分类</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'news_index'})" title="文章列表" class="ajax-call">文章列表</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="视频管理" data-toggle="collapse" data-parent="#accordion" href="#collapseEight" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-film"></i>视频管理<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseEight" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'video_category'})" title="视频分类" class="ajax-call">视频分类</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'video_index'})" title="视频列表" class="ajax-call">视频列表</a></li>
               </ul>
            </li>
            <li class="panel">
               <a title="数据报表" data-toggle="collapse" data-parent="#accordion" href="#collapseNine" aria-expanded="false" aria-controls="collapsed">
                  <i class="glyphicon glyphicon-signal"></i>数据报表<i class="glyphicon glyphicon-menu-down"></i>
               </a>
               <ul id="collapseNine" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
                  <li><a href="javascript:;" @click="$router.push({name:'report_common'})" title="常规报表" class="ajax-call">常规报表</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_register'})" title="入驻报表" class="ajax-call">入驻报表</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_sale'})" title="销售额报表" class="ajax-call">销售额报表</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_beginsalemoney'})" title="销售额" class="ajax-call">销售额</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_beginsalecounter'})" title="销售量" class="ajax-call">销售量</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_partnersale'})" title="推广销售额" class="ajax-call">推广销售额</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_aftersalecounter'})" title="售后服务报表" class="ajax-call">售后服务报表</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_partner'})" data-url="/report/partner.html" title="合作推广业绩" class="ajax-call">合作推广业绩</a></li>
                  <li><a href="javascript:;" @click="$router.push({name:'report_partnercount'})" data-url="/report/partnercount.html" title="合作推广订单" class="ajax-call">合作推广订单</a></li>
               </ul>
            </li>
         </ul>
      </nav>
      <div id="main" class="flexitem">
         <router-view></router-view>
      </div>
   </div>

</template>

<script>
   export default {
      created(){
         // 判断本地token及获取code
         if(!localStorage.getItem('access_token')){
            if(location.search.includes('?code=')){
               const code = location.search.substr(location.search.indexOf('=')+1);
               localStorage.setItem('access_token',`Bearer ${code}`);
            }
         } else {
            if(location.search.includes('?code=')){
               const code = location.search.substr(location.search.indexOf('=')+1);
               localStorage.setItem('access_token',`Bearer ${code}`);
            }
         }
         //localStorage.setItem('access_token',`Bearer 123pdiI6IlF3dm53RzREXC9ScER6SlNqc1B3WUpRPT0iLCJ2YWx1ZSI6IklmMk9lRzVqUnB4N3BJbWg0YUdhWmNnQzlzY0JMWXNJZE9hRVcrVk1vK29BWGlobWZjNVlZajc2UmRuM3E0MUxKM1NieUhMY2ZaRmlyTmJHUGRldmh3UW45QVJXZlIrc2NMZVdrK0tXOTZtN1c2eTJiYlwvUUh4XC8rbk9WUitqRzkiLCJtYWMiOiI5YjNmMGJiNjY2Yzc2MDRhYmYxZTMyMTNkZTgwYTVlMTQ3MWFjYzcwZjJhZjllNGU0YTI4MzYyMzhlNjlhZGFmIn0%3D`);
      },
      data(){
         return{

         }
      },
      methods:{
         panel(e){
            //判断一级菜单
            if(e.target.nodeName.toLowerCase() == 'a'){
               $('.ajax-call').removeClass('on')
               $(e.target).toggleClass('on').parent().siblings().children('a').removeClass('on');
            } else {
               $('.ajax-call').removeClass('on')
               $(e.target.parentNode).toggleClass('on').parent().siblings().children('a').removeClass('on');
            }
            //判断二级菜单
            if(e.target.classList.contains('ajax-call')){
               $(e.target).addClass('on').siblings().removeClass('on')
            }
         }
      }
   }
</script>
