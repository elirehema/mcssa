<template>
  <v-row
    v-if="transactions"
    class="d-flex justify-space-between"
    no-gutters
  >
    <v-col cols="12">
      <v-data-table
        :headers="headers"
        :items="transactions"
        item-key="name"
        class="elevation-1"
        :footer-props="footerprops"
        :server-items-length="pages"
        @click:row="rowclick"
        @pagination="paginate"
        mobile-breakpoint="0"
      >
        <template v-if="false"  #top>
          <v-toolbar
            color=""
            flat
          >
            <v-toolbar-title class="text-uppercase">
              All of <strong>{{ member.name }} {{ member.familyName }} </strong>Transactions
            </v-toolbar-title>
            <v-spacer />
          </v-toolbar>
        </template>
        <template #item.type="{item}">
          <span v-if="item.transactionType">{{ item.transactionType.type }}</span>
          <span v-else class="grey--text"> Not Provided </span>
        </template>
        <template #item.group="{item}">
          <span v-if="item.group">{{ item.group.name }}</span>
          <span v-else class="grey--text"> {{ item.groupId }} </span>
        </template>
        <template #item.status="{item}">
          <v-icon v-if="item.status === '0'" color="blue">
            mdi-check-decagram
          </v-icon>
          <v-icon v-else color="red">
            mdi-close-circle 
          </v-icon>
        </template>
        <template #item.destination="{item}">
          <span v-if="item.destinationAccount != '-1'">{{ item.destinationAccount }}</span>
          <span v-else class="grey--text"> Not Provided </span>
        </template>
        <template #item.sms="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon
                v-if="item.sms == '-1' || item.sms === ''"
                disabled
                v-bind="attrs"
                color="button darken-2"
                v-on="on"
              >
                mdi-message-badge-outline
              </v-icon>
              <v-icon
                v-else
                v-bind="attrs"
                color="button darken-2"
                v-on="on"
              >
                mdi-message-badge
              </v-icon>
            </template>
            <span>{{ item.sms }}</span>
          </v-tooltip>
        </template>
        <template #item.amount="{item}">
          <span >{{ item.amount | currency }}</span>
        </template>
        <template #item.receipt="{item}">
          <span v-if="item.receipt != -1">{{ item.receipt }}</span>
          <span v-else class="grey--text"> No Receipt </span>
        </template>
        <template #item.transactionDate="{ item }">
          {{ item.transactionDate | dateformat }}
        </template>
        <template #no-data>
          <span>No transaction found ...</span>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props: {
    member: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      transactions: null,
      pages: 0,
      headers: [
        { text: 'Group ', value: 'group' },
        { text: 'Amount', value: 'amount', align:'end' },
        { text: 'Status', value: 'status',align:'center' },
        { text: 'Receipt ', value: 'receipt' },
        { text: 'Type ', value: 'type' },
        { text: 'SMS', value: 'sms' },
        { text: 'Date', value: 'transactionDate' }

      ],
      show: false,
      editedItem: {}
    }
  },
  head () {
    return {
      title: 'transactions'
    }
  },
  created () {
    this.paginate({ page: 0, itemsPerPage: 10 })
  },
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/transactions/${v.id}`)
      // console.log(v)
    },

    async paginate (it) {
      await this.$api.$get(`/members/${this.msisdn}/transactions`, { params: { page: it.page, size: it.itemsPerPage, sort: 'transate desc',success: true } })
        .then((response) => {
          this.pages = response.totalRows
          this.page = response.currentPage
          this.transactions = response.results == null ? [] : response.results
        }).catch((_err) => {
        })
    }
  }

}
</script>
