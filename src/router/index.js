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

import goods_index from '@/components/goods/index'
import goods_add from '@/components/goods/add'
import goods_edit from '@/components/goods/edit'
import goods_category from '@/components/goods/category'
import goods_cateadd from '@/components/goods/cateadd'

import template_index from '@/components/template/index'
import template_add from '@/components/template/add'
import template_edit from '@/components/template/edit'

import user_index from '@/components/user/index'
import user_order from '@/components/user/order'

import service_beginsales from '@/components/service/beginsales'
import service_beginsale from '@/components/service/beginsale'
import service_search from '@/components/service/search'
import service_aftersales from '@/components/service/aftersales'
import service_aftersale from '@/components/service/aftersale'

import news_index from '@/components/news/index'
import news_add from '@/components/news/add'
import news_edit from '@/components/news/edit'
import news_category from '@/components/news/category'
import news_cateadd from '@/components/news/cateadd'

import video_index from '@/components/video/index'
import video_add from '@/components/video/add'
import video_category from '@/components/video/category'
import video_cateadd from '@/components/video/cateadd'

import report_common from '@/components/report/common'
import report_register from '@/components/report/register'
import report_enterDetail from '@/components/report/enterDetail'
import report_sale from '@/components/report/sale'
import report_beginsalemoney from '@/components/report/beginsalemoney'
import report_beginsalecounter from '@/components/report/beginsalecounter'
import report_salesDetail from '@/components/report/salesDetail'
import report_partnersale from '@/components/report/partnersale'
import report_aftersalecounter from '@/components/report/aftersalecounter'
import report_serveDetail from '@/components/report/serveDetail'
import report_partner from '@/components/report/partner'
import report_partnercount from '@/components/report/partnercount'



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
               path: 'goods/index',
               name: 'goods_index',
               component: goods_index
            },
            {
               path: 'goods/add',
               name: 'goods_add',
               component: goods_add
            },
            {
               path: 'goods/edit',
               name: 'goods_edit',
               component: goods_edit
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
            {
               path: 'user/index',
               name: 'user_index',
               component: user_index
            },
            {
               path: 'user/order',
               name: 'user_order',
               component: user_order
            },
            {
               path: 'service/beginsales',
               name: 'service_beginsales',
               component: service_beginsales
            },
            {
               path: 'service/beginsale',
               name: 'service_beginsale',
               component: service_beginsale
            },
            {
               path: 'service/search',
               name: 'service_search',
               component: service_search
            },
            {
               path: 'service/aftersales',
               name: 'service_aftersales',
               component: service_aftersales
            },
            {
               path: 'service/aftersale',
               name: 'service_aftersale',
               component: service_aftersale
            },
            {
               path: 'news/index',
               name: 'news_index',
               component: news_index
            },
            {
               path: 'news/add',
               name: 'news_add',
               component: news_add
            },
            {
               path: 'news/edit',
               name: 'news_edit',
               component: news_edit
            },
            {
               path: 'news/category',
               name: 'news_category',
               component: news_category
            },
            {
               path: 'news/cateadd',
               name: 'news_cateadd',
               component: news_cateadd
            },
            {
               path: 'video/index',
               name: 'video_index',
               component: video_index
            },
            {
               path: 'video/add',
               name: 'video_add',
               component: video_add
            },
            {
               path: 'video/category',
               name: 'video_category',
               component: video_category
            },
            {
               path: 'video/cateadd',
               name: 'video_cateadd',
               component: video_cateadd
            },

            {
               path: 'report/common',
               name: 'report_common',
               component: report_common
            },
            {
               path: 'report/register',
               name: 'report_register',
               component: report_register
            },
            {
               path: 'report/enterDetail',
               name: 'report_enterDetail',
               component: report_enterDetail
            },
            {
               path: 'report/sale',
               name: 'report_sale',
               component: report_sale
            },
            {
               path: 'report/beginsalemoney',
               name: 'report_beginsalemoney',
               component: report_beginsalemoney
            },
            {
               path: 'report/beginsalecounter',
               name: 'report_beginsalecounter',
               component: report_beginsalecounter
            },
            {
               path: 'report/salesDetail',
               name: 'report_salesDetail',
               component: report_salesDetail
            },
            {
               path: 'report/partnersale',
               name: 'report_partnersale',
               component: report_partnersale
            },
            {
               path: 'report/aftersalecounter',
               name: 'report_aftersalecounter',
               component: report_aftersalecounter
            },
            {
               path: 'report/serveDetail',
               name: 'report_serveDetail',
               component: report_serveDetail
            },
            {
               path: 'report/partner',
               name: 'report_partner',
               component: report_partner
            },
            {
               path: 'report/partnercount',
               name: 'report_partnercount',
               component: report_partnercount
            }
         ]
      },
      {path: '*', redirect: '/'},
   ],
   mode: 'history'
})
