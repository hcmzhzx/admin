<template>
   <div class="flexitemv">
      <crumb :content="text"></crumb>
      <div class="content">
         <form method="post" class="post" @submit.prevent="sendForm">
            <div class="form-group">
               <label for="title">模板标题</label>
               <input type="text" id="title" class="form-control small" name="title" :value="themeList.title" data-rule="*" data-errmsg="请填写模板标题" data-sync="true">
            </div>
            <div class="form-group">
               <label for="desc">模板描述</label>
               <input type="text" id="desc" class="form-control medium" name="desc" :value="themeList.desc" data-rule="*" data-errmsg="请填写模板描述" data-sync="true">
            </div>
            <div class="form-group">
               <label for="dir">模板目录</label>
               <input type="text" id="dir" class="form-control small" name="dir" :value="themeList.directory" data-rule="*" data-errmsg="请填写模板目录" data-sync="true">
            </div>
            <div class="form-group">
               <label for="cover">缩略图</label>
               <div class="uploader">
                  <div class="lists">
                     <div class="box list" style="width:120px;height:200px;" v-for="item in themeList.cover">
                        <img :src="item">
                        <a href="javascript:;" class="preview trash">删除</a>
                     </div>
                     <div class="box picker" style="width:120px;height:200px;">
                        <input type="file" accept="image/*" multiple class="upfile" data-type="theme" data-authority="theme_upload">
                        <span>点击选择图片</span>
                     </div>
                  </div>
               </div>
            </div>
            <input type="hidden" id="cover" name="cover" :value="themeArr.join(',')" data-rule="*" data-errmsg="请上传缩略图" data-sync="true">
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
            text: [{txt:'模板设置', src:'template_index'}, {txt:'编辑模板'}],
            ID:0, // 模板id
            themeList:[], // 模板列表
            fileList:[],  // file 对象数组
            fileType: /(jpg)|(png)|(jpeg)|(gif)|(bmp)/i,  // 上传文件的类型
            state: false, // 上传状态
            themeArr:[]   // 图片数组
         }
      },
      created(){
         // 模板id
         const id = this.ID = this.$route.query.id;
         this.$http.get(`theme/${id}`).then(theme=>{
            this.themeList = theme;

            // 截取相对地址
            theme.cover.forEach((item)=>{
               this.themeArr.push(this.Substr(item));
            })
         });

         // 上传文件
         const _this = this;
         this.$nextTick(()=>{
            $('.picker input[type=file]').change(function(){
               const files = this.fileList = this.files;
               if(files.length == 0) return;
               const ele = $(this).parent(), type = this.getAttribute('data-type'), authority = this.getAttribute('data-authority');
               [...files].forEach((item)=>{
                  let type = item.type.split("").join("").split("/")[1];
                  if(_this.fileType.test(type)){
                     ele.before(`<div class="box list" style="width:120px;height:200px;"><img src="${window.URL.createObjectURL(item)}"><i class="progress"></i><a href="javascript:;" class="preview">上传中</a></div>`);
                     $('.lists .list').eq($('.lists .list').size()-1).append(`<span style="color:#ccc;font-size:0.8em;">预览中</span>`);
                     _this.state = true;
                  } else {
                     _this.$message({message: '图片格式不正确', type: 'warning'})
                  }
               });
               if(_this.state){_this.readFile(type,files,authority,$('.lists .list'))}
            })
         })
      },
      updated(){
         const _this = this;
         // 修改删除图片
         $('#main').on('click','.trash',function (){
            _this.$confirm('确定删除这一项', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
            }).then(() => {
               _this.themeArr.splice($(this).parent().index(),1);
               $(this).parent().remove();
               _this.$message({
                  type: 'success',
                  message: '删除成功!'
               })
            }).catch(()=>{})
         })
      },
      methods:{
         // 图片请求
         readFile(type,files,authority,ev){
            const form = new FormData();
            form.append('type',type);
            [...files].forEach((item)=>{
               form.append('image[]',item);
            })
            form.append('authority',authority);
            // 上传loading
            const loading = this.$loading({
               lock: true,
               text: '上传中...',
               spinner: 'el-icon-loading',
               background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.post('image',form).then(url=>{
               url.split(',').forEach((item)=>{
                  this.themeArr.push(item)
               });
               ev.find('span').remove();
               ev.find('a.preview').addClass('trash').text('修改');
               loading.close(); // 结束loading
            }).catch(err=>{
               this.$message({
                  message: err.errors.image[0],
                  type: 'warning'
               })
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
               // 上传loading
               const loading = this.$loading({
                  lock: true,
                  text: '上传中...',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
               });
               this.$http.patch(`theme/${this.ID}`,Form).then(res=>{
                  loading.close(); // 结束loading
                  this.$router.go(-1);
               }).catch(err=>{
                  console.log(err);
                  this.$message({
                     message: err.errors.fg_domain[0],
                     type: 'warning'
                  })
               })
            })
         }
      }
   }
</script>
