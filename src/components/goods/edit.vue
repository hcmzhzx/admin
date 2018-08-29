<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
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
            text: [{txt:'商品列表', src:'goods_index'}, {txt:'编辑商品'}],
         }
      }

   }
</script>
