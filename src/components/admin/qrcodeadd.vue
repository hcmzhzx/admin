<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="admin_id">所属客服</label>
               <select name="admin_id" id="admin_id" class="form-control small" data-rule="*" data-errmsg="所属客服必须选择" data-sync="true">
                  <option value="0">请选择</option>
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
            </div>
            <div class="form-group">
               <label for="brand_id">所属品牌</label>
               <select name="brand_id" id="brand_id" class="form-control small" data-rule="*" data-errmsg="所属品牌必须选择" data-sync="true">
                  <option value="0">请选择</option>
                  <option v-for="item in brandList" :key="item.value" :value="item.value">{{item.text}}</option>
               </select>
            </div>
            <div class="form-group">
               <label for="picker">二维码</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box picker">
                        <input type="file" accept="image/*" class="upfile" data-type="qrcode" data-authority="qrcode_add" data-rule="*" data-errmsg="二维码必须填写" data-sync="true"><span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
         </form>
      </div>
   </div>
</template>

<script>
   import crumb from '../header/crumb'
   import {CheckForm} from '../../assets/js/checkForm'

   export default {
      components: {
         crumb
      },
      data(){
         return {
            text: [{txt: '客服二维码', src: 'admin_qrcode'}, {txt: '添加二维码'}],
            brandList: []  // 品牌列表
         }
      },
      created(){
         //获取品牌
         this.$http.get('brands?sort=1').then(selec => {
            this.brandList = selec.data.map((item) => {
               let list = {};
               list.value = item.id;
               list.text = `${item.pinyin.substr(0, 1)}.${item.title}`;
               return list
            })
         })
      },
      updated(){
         const _this = this;
         $('.picker input[type=file]').change(function(){
            const files = this.files[0];
            if(files.length == 0) return;
            const ele = this.parentNode, type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
            $(ele).siblings().remove();
            $(ele).before(`<div class="box list"><img src=""><i class="progress"></i><a href="javascript:;" class="preview trash">上传中</a><input type="hidden" name="${type}" value=""></div>`);
            _this.readFile(type,files,authority,$(ele.parentNode.firstChild));
            $(ele.parentNode.firstChild).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
            // 修改删除图片
            $('#main').on('click','.trash',function (){
               _this.delImg($(this));
            })
         })
      },
      methods:{
         // 更换图片请求
         readFile(type,files,authority,ev){
            const form = new FormData();
            form.append('type',type);
            form.append('image',files);
            form.append('authority',authority);
            ev.find('img').attr('src',window.URL.createObjectURL(files));
            this.$http.post('image',form).then(url=>{
               ev.find('input[type=hidden]').val(url.path);
               ev.find('span').remove();
               ev.find('a.preview').text('修改');
            })
         },

         // 提交全部列表
         sendForm(e){
            new CheckForm(e,err=>{
               this.$message({
                  message: err,
                  type: 'warning'
               });
            },()=>{
               const Formdata = $(e.path[0]).serializeArray().filter((item)=>{
                  return item.value !== '';
               });
               let Form = {};
               Formdata.forEach((item)=>{
                  Form[item.name] = item.value;
               });
               this.$http.post('admin_qrcode',Form).then(res=>{
                  this.$router.go(-1)
               }).catch(err=>{
                  console.log(err);
                  this.$message({
                     message: err,
                     type: 'warning'
                  })
               })

            })
         }
      }
   }
</script>
