<template>
   <div class="crumb" v-html="cont"></div>
</template>

<script>
   export default {
      props: ['content'],
      created(){
         let arr = [...this.content].map((obj) => {
            return obj
         }), span = arr.pop();
         let str = '';
         if (arr.length > 0) {
            arr.forEach((item) => {
               str += `<a href="javascript:;" data-url=${item.src} id=${item.id} class="ajax-call" :title=${item.txt}>${item.txt}</a>`;
            })
         }
         str += `<span>${span.txt}</span>`;
         this.cont = str;
         this.$nextTick(() => {
            [...document.querySelectorAll('.crumb>a')].forEach((item) => {
               item.addEventListener('click', (e) => {
                  let url = e.target.getAttribute('data-url');
                  if (url.includes("?")) {
                     this.$router.push({name: url.substring(0,url.indexOf('?')), query: {id: url.substr(url.indexOf('=') + 1)}});
                  } else {
                     this.$router.push({name: url});
                  }
               })
            })
         })
      },
      data(){
         return {
            cont: ''
         }
      }
   }
</script>
