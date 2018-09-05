<template>
   <header id="header">
      <h1 class="logo"><a href="/"><i class="glyphicon glyphicon-leaf"></i>线下直销管理后台</a></h1>
      <div class="btn-group pull-right op">
         <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="http://pic.zhzxr.com/upic/nopic.png" alt="我的头像">
            <span class="welcome">{{userData.username}}</span>
            <span class="caret"></span>
         </button>
         <ul class="dropdown-menu">
            <li><a href="/admin/logout.html">退出</a></li>
         </ul>
      </div>
   </header>
</template>

<script>
   export default {
      data(){
         return{
            userData:{}  // 用户信息
         }
      },
      created(){
         this.$store.dispatch('userInfo').then(user=>{
            this.userData = user
         })
      }
   }
</script>

<style>
   #header{position:relative;height:46px;background:#438EB9;padding:0 20px}
   #header .logo{display:inline-block;margin:0}
   #header .logo a{display:block;height:46px;line-height:46px;font-size:20px;color:#fff;text-decoration:none}
   #header .logo a i{margin-right:8px}
   #header .op{height:46px;padding:2px 5px;background:rgba(255,255,255,.2)}
   #header .op button{background:0 0;border:none;border-radius:0;padding:0;color:#fff}
   #header .op img{width:40px;height:40px;border-radius:20px}
</style>
