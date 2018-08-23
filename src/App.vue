<template>
   <div id="app" class="flexv">
      <my-header></my-header>
      <router-view/>
   </div>
</template>

<script>
   import myHeader from './components/header/header'

   export default {
      name: 'App',
      components:{
         myHeader
      }
   }
</script>

<style>
   html,body{height:100%}
   *{margin:0;padding:0;box-sizing:border-box;font:inherit;vertical-align:baseline}
   body{font:1.1em '\5FAE\8F6F\96C5\9ED1',Arial,'\9ED1\4F53','\5B8B\4F53'}
   table{border-collapse:collapse}
   input{font-family:'\5FAE\8F6F\96C5\9ED1','\9ED1\4F53','\5B8B\4F53';-webkit-appearance:none}
   button,input,select,textarea{font:inherit;outline:0;border:0;border-radius:0;-webkit-tap-highlight-color:transparent;background:0 0;line-height:normal;-webkit-writing-mode:horizontal-tb;resize:none;color:inherit;white-space:pre-wrap;word-wrap:break-word;-webkit-rtl-ordering:logical;user-select:text}
   input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none!important}
   input[type=file]{position:absolute;top:0;left:0;bottom:0;right:0;opacity:0}
   .fitimg{width:100%;height:100%;}

   .flex{display:flex;flex-direction:row;}
   .flexv{display:flex;flex-direction:column;}
   .flexitem{display:flex;flex-direction:row;flex:1}
   .flexitemv{display:flex;flex-direction:column;flex:1}
   .center{justify-content:center;align-items:center;}
   .end{justify-content:flex-end;align-items:flex-end;}
   .endv{justify-content:flex-end;align-items:center;}
   .start{align-self:flex-start;}
   .self{align-self:flex-end;}
   .between{display:-webkit-box;justify-content:space-between;align-items:center;} /*两端对齐*/
   .around{display:-webkit-box;justify-content:space-around;align-items:center;}  /*等间距*/
   .br{display:-webkit-box;flex-wrap:wrap;}  /*换行*/
   .nbr{display:-webkit-box;flex-wrap:nowrap} /*不换行*/

   #app{height:100%}
   #aside{font-size:14px;margin-top:1px;width:12%;min-width:160px;}
   #aside #accordion{border-right:1px solid #ccc;}
   #aside .panel{margin:0;border:none;}
   #aside .panel>a.on{border-left:3px solid #438EB9;color:#438EB9;background:#fff}
   #aside ul a{display:block;height:40px;line-height:20px;text-decoration:none;padding:10px;color:#666}
   #aside>ul>li>a{position:relative;border-bottom:1px solid #ddd;border-top:1px solid #ddd;background:#F9F9F9;margin-top:-1px;border-left:3px solid transparent}
   #aside>ul>li>a:hover{border-left:3px solid #438EB9;color:#438EB9;background:#fff}
   #aside>ul>li>a i:first-of-type{margin-right:10px}
   #aside>ul>li>a i:last-of-type{position:absolute;right:10px;top:50%;transform:translateY(-50%)}
   #aside ul ul li{border-bottom:1px dotted #eee}
   #aside>ul ul li:before{content:'';position:absolute;margin-left:30px;margin-top:20px;width:10px;height:0;border-top:1px dotted #9DBDD6}
   #aside>ul ul li a:hover{color:#438EB9}
   #aside>ul ul li a.on{color:#438EB9}
   #aside>ul ul a{margin-left:30px;border-left:1px dotted #9DBDD6;padding-left:20px}

   #main{width:calc(100% - 12%);color:#666}
   #main .crumb{width:100%;height:40px;padding:10px;border:1px solid #ccc;background:#F9F9F9;margin-left:-1px}
   /*#main .crumb i{margin-right:10px}*/
   #main .crumb a:after{content:'>';display:inline-block;color:#aaa;margin:0 5px}
   #main header{margin-bottom:.5em}
   #main footer .page{float:right}
   #main .content{padding:.5em;height:100%}
   #main form.post{margin-bottom:50px;}
   .fix{zoom:1}
   .fix:after{content:'';display:block;height:0;clear:both;font-size:0;visibility:hidden}
   .xs{max-width:80px}
   .small{max-width:150px}
   .medium{max-width:300px}
   .large{max-width:450px}
   .pagination{margin:0!important}
   a.editable-click{border-bottom:none}
   .uploader:after{content:'';display:block;clear:both}
   .uploader .box{position:relative;width:140px;height:130px;background:#fafafa;float:left;margin-right:10px;border:1px solid #eee;overflow:hidden}
   .uploader .box img{width:100%;height:100%}
   .uploader .box span{position:absolute;top:50%;left:10px;right:10px;height:20px;line-height:20px;margin-top:-10px;overflow:hidden;text-align:center;z-index:8}
   .uploader .box i{position:absolute;top:0;left:0;width:100%;height:2px;background:red}
   .uploader .box a{position:absolute;bottom:0;left:0;right:0;padding:0 10px;height:30px;line-height:30px;background:rgba(0,0,0,.5);color:#fff;text-align:center}
   .uploader .picker{border-style:dashed}
   .uploader input.upfile{opacity:0;position:absolute;top:0;left:0;padding:0;width:100%;height:100%;opacity:0;z-index:9;cursor:pointer}


   /*Element-ui*/
   .el-icon-loading:before{font-size:26px}
</style>
