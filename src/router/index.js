import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import admin_rule from '@/components/admin/rule'
import admin_group from '@/components/admin/group'
import admin_user from '@/components/admin/user'
import admin_qrcode from '@/components/admin/qrcode'
import admin_qrcodeadd from '@/components/admin/qrcodeadd'

import brand_index from '@/components/brand/index'
import brand_add from '@/components/brand/add'
import brand_edit from '@/components/brand/edit'

import partner_index from '@/components/partner/index'
import partner_add from '@/components/partner/add'
import partner_edit from '@/components/partner/edit'
import partner_user from '@/components/partner/user'
import partner_wechat from '@/components/partner/wechat'
import partner_payment from '@/components/partner/payment'
import partner_paymentadd from '@/components/partner/paymentadd'

import goods_category from '@/components/goods/category'
import goods_cateadd from '@/components/goods/cateadd'

import template_index from '@/components/template/index'
import template_add from '@/components/template/add'
import template_edit from '@/components/template/edit'



Vue.use(Router)

export default new Router({
   routes: [
      {
         path: '/',
         name: 'index',
         component: index,
         children:[
            {
               path: 'admin/rule',
               name: 'admin_rule',
               component: admin_rule
            },
            {
               path: 'admin/group',
               name: 'admin_group',
               component: admin_group
            },
            {
               path: 'admin/user',
               name: 'admin_user',
               component: admin_user
            },
            {
               path: 'admin/qrcode',
               name: 'admin_qrcode',
               component: admin_qrcode
            },
            {
               path: 'admin/qrcodeadd',
               name: 'admin_qrcodeadd',
               component: admin_qrcodeadd
            },
            {
               path: 'brand/index',
               name: 'brand_index',
               component: brand_index
            },
            {
               path: 'brand/add',
               name: 'brand_add',
               component: brand_add
            },
            {
               path: 'brand/edit',
               name: 'brand_edit',
               component: brand_edit
            },
            {
               path: 'partner/index',
               name: 'partner_index',
               component: partner_index
            },
            {
               path: 'partner/add',
               name: 'partner_add',
               component: partner_add
            },
            {
               path: 'partner/edit',
               name: 'partner_edit',
               component: partner_edit
            },
            {
               path: 'partner/user',
               name: 'partner_user',
               component: partner_user
            },
            {
               path: 'partner/wechat',
               name: 'partner_wechat',
               component: partner_wechat
            },
            {
               path: 'partner/payment',
               name: 'partner_payment',
               component: partner_payment
            },
            {
               path: 'partner/paymentadd',
               name: 'partner_paymentadd',
               component: partner_paymentadd
            },
            {
               path: 'goods/category',
               name: 'goods_category',
               component: goods_category
            },
            {
               path: 'goods/cateadd',
               name: 'goods_cateadd',
               component: goods_cateadd
            },
            {
               path: 'template/index',
               name: 'template_index',
               component: template_index
            },
            {
               path: 'template/add',
               name: 'template_add',
               component: template_add
            },
            {
               path: 'template/edit',
               name: 'template_edit',
               component: template_edit
            },








         ]
      },
      {path: '*', redirect: '/'},
   ],
   mode: 'history'
})
