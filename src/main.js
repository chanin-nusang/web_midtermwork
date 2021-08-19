// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import 'vue-select/dist/vue-select.css';

import vSelect from 'vue-select'
import Vue from 'vue'
import { BPagination, PaginationPlugin   } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(PaginationPlugin)
Vue.component('b-pagination', BPagination)

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)
  Vue.component('v-select', vSelect)
  
}
