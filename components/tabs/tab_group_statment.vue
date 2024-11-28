<template>
  <v-row v-if="transactions" class="d-flex justify-space-between" no-gutters>
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
          <v-toolbar color="" flat>
            <v-toolbar-title class="text-uppercase">
              Statment Transactions 
            </v-toolbar-title>
            <v-spacer />
            <span class="text-h6 font-weight-bold"
              >Opening Balance: {{ openingBalance | currency }}</span
            >
            <v-spacer />
            <span class="text-h6 font-weight-bold"
              >Closing Balance: {{ closingBalance | currency }}</span
            >
            <v-spacer />
            <v-col cols="12" sm="3" md="3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                absolute
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dates"
                    label="Select Date range"
                    hint="Select date range"
                    prepend-inner-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    single-line
                    color="white"
                    hide-details
                    outlined
                    dense
                    class="search"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="dates"
                  no-title
                  flat
                  light
                  scrollable
                  range
                  header-color="white"
                  color="indigo lighten-1"
                  class="pa-2"
                  :allowed-dates="allowedDates"
                >
                  <v-spacer></v-spacer>
                  <v-btn dark color="blue" small @click="menu = false">
                    <v-icon>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                  <v-btn color="primary" @click="paginate" small>
                    <v-icon left>mdi-filter-variant</v-icon> Filter </v-btn>
                </v-date-picker>
                <v-spacer></v-spacer>
              </v-menu>
            </v-col>
          </v-toolbar>
        </template>

        <template #item.status="{ item }">
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" color="grey" v-on="on">
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
  data() {
    return {
     
      pages: 0,
      menu: false,
      modal: false,
      transactions: null,
      openingBalance: 0,
      closingBalance: 0,
      //max: new Date(Date.now()).toISOString().substr(0, 10),
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dates: [
        new Date(Date.now() - 86400000).toISOString().substr(0, 10),
        new Date(Date.now()).toISOString().substr(0, 10),
      ],
      
      headers: [
        { text: "Name", value: "name" },
        { text: "MSISDN", value: "msisdn" },
        { text: "Amount", value: "transactionAmount" },
        { text: "Transaction Type ", value: "description" },
        { text: "Balance Before", value: "balanceBefore" },
        { text: "Balance After", value: "balance" },
        { text: "Transaction Date", value: "transactionDate" },
        { text: "Status", value: "status" },
      ],
      show: false,
      editedItem: {},
    };
  },
  head() {
    return {
      title: "Transactions",
    };
  },
  created() {
    this.paginate({ page: 0, itemsPerPage: 15 });
  },
  computed:{
    min(){
      var date = new Date(this.dates[0]);
      return date.toString();
    },
    max(){
      var date = new Date(this.dates[1]);
      date.setMonth(date.getMonth() + 6);
      return date.toString();
    }
  },
  methods: {
    allowedDates: dt => dt <= new Date().toISOString().substring(0, 10),
    rowclick(v) {
      this.show = true;
      this.$router.push(`/transactions/${v.id}`);
      // console.log(v)
    },
   

    async paginate(it) {
      await this.$api
        .$post(`/groups/statment`, {
          startDate: this.dates[0],
          endDate: this.dates[1],
          groupId: parseInt(this.$route.params.id) //111222333502
        })
        .then((response) => {
          this.openingBalance = response.response.openBalance;
          this.closingBalance = response.response.closeBalance;
          this.menu = false;
          this.modal = false;
          this.transactions =
            response.response.transactions == null
              ? []
              : response.response.transactions;
        })
        .catch((_err) => {
          this.menu = false;
          this.modal = false;
        });
    },
  },
};
</script>
  