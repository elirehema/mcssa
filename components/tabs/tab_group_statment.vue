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
          dense
          :footer-props="footerprops"
          
        >
          <template #top>
            <v-toolbar
              color=""
              flat
            >
              <v-toolbar-title class="text-uppercase">
                Statment Transactions
              </v-toolbar-title>
              <v-spacer />
              <span class="text-h5 font-weight-bold">Opening Balance: {{ openingBalance | currency}}</span>
              <v-spacer/>
              <span class="text-h5 font-weight-bold">Closing Balance: {{ closingBalance | currency}}</span>
            </v-toolbar>
          </template>
        
          <template #item.status="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
            
                <v-icon
                  v-bind="attrs"
                  color="grey"
                  v-on="on"
                >
                  mdi-information-outline
                </v-icon>
              </template>
              <span>{{ item.status }}</span>
            </v-tooltip>
          </template>
          <template #no-data>
            <span>No organization found ...</span>
          </template>
         
        </v-data-table>
      </v-col>
    </v-row>
  
    <skeleton-table-loader v-else />
  </template>
  <script>
  export default {
    data () {
      return {
        transactions: null,
        pages: 0,
        openingBalance: 0,
        closingBalance: 0,
        headers: [
        { text: 'Name', value: 'name' },
          { text: 'MSISDN', value: 'msisdn' },
          { text: 'Amount', value: 'transactionAmount' },
          { text: 'Transaction Type ', value: 'description' },
          { text: 'Balance Before', value: 'balanceBefore' },
          { text: 'Balance After', value: 'balance' },
          { text: 'Transaction Date', value: 'transactionDate' },
          { text: 'Status', value: 'status' },
        ],
        show: false,
        editedItem: {}
      }
    },
    head () {
      return {
        title: 'Transactions'
      }
    },
    created () {
      this.paginate({ page: 0, itemsPerPage: 15 })
    },
    methods: {
      rowclick (v) {
        this.show = true
        this.$router.push(`/transactions/${v.id}`)
        // console.log(v)
      },
  
      async paginate (it) {
        await this.$api.$post(`/groups/statment`, {
            "startDate": "2023-01-12",
            "endDate": "2024-12-12",
             "groupId": parseInt(this.$route.params.id) //111222333502
            })
          .then((response) => {
            this.openingBalance = response.response.openBalance;
            this.closingBalance = response.response.closeBalance
            this.transactions = response.response.transactions == null ?[]:response.response.transactions;
          }).catch((_err) => {
          })
      }
    }
  
  }
  </script>
  