import Vue from 'vue'
import {  mapGetters } from 'vuex'

const mixins = {
  components: {
    'skeleton-table-loader': () => import('~/components/loaders/skeleton-table-loader.vue'),
    'skeleton-datepicker-loader': () => import('~/components/loaders/skeleton-date-picker.vue'),
    'skeleton-summary-card': () => import('~/components/loaders/skeleton-summary-card.vue')
  },
  data () {
    return {
      delay: 3000,
      footerprops: {
        'items-per-page-options': [5, 10, 20, 30, 40, 50, 10]
      }
    }
  },
  methods: {},
  computed: {
    ...mapGetters(['isAuthenticated']),
    msisdn () {
      return localStorage.getItem('msisdn')
    }

  }

}
Vue.mixin(mixins)
