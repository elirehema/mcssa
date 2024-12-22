<template>
  <div v-if="transactions">
      <v-data-table
        :headers="headers"
        :items="transactions"
        item-key="name"
        class="elevation-1"
        dense
        :footer-props="footerprops"
      >
        <template #top>
          <v-toolbar :extended="$vuetify.breakpoint.mobile" :prominent="$vuetify.breakpoint.mobile" flat>
           <v-row class="d-flex justify-space-between"  no-gutters>
            <v-col cols="12" xs="12" sm="6" md="3" lg="3">
              <span class="text-h6 font-weight-bold">Opening Balance: {{ openingBalance | currency }}</span>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="3" lg="3" :class="$vuetify.breakpoint.xsAndDown ? 'mt-4':''" >
            <span class="text-h6 font-weight-bold"
              >Closing Balance: {{ closingBalance | currency }}</span
            >
            </v-col>
            
            <v-col cols="12" xs="12" sm="6" md="2" >
              <v-menu
                ref="startDateMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                :return-value.sync="startDate"
                transition="scale-transition"
                offset-y
                absolute
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Start date"
                    hint="Start date"
                    prepend-inner-icon="mdi-calendar"
                    readonly filled
                    v-bind="attrs"
                    v-on="on"
                    single-line
                    hide-details
                    outlined
                    dense
                    class="search mb-3"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  no-title
                  flat
                  light
                  scrollable
                  header-color="white"
                  color="indigo lighten-1"
                  class="pa-2"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                >
                  <v-spacer></v-spacer>
                  <v-btn dark color="blue" small @click="startDateMenu = false">
                    <v-icon>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                  <v-btn color="primary" @click="$refs.startDateMenu.save(startDate)" small>
                    <v-icon left>mdi-filter-variant</v-icon> Apply </v-btn>
                </v-date-picker>
                <v-spacer></v-spacer>
              </v-menu>
            </v-col>
            <v-col cols="12" xs="12" sm="6" md="2" v-if="startDate" >
              <v-menu
                ref="endDateMenu"
                v-model="endDateMenu"
                :close-on-content-click="false"
                :return-value.sync="endDate"
                transition="scale-transition"
                offset-y
                absolute
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="End date"
                    hint="End date"
                    prepend-inner-icon="mdi-calendar"
                    readonly filled
                    v-bind="attrs"
                    v-on="on"
                    single-line
                    hide-details
                    outlined
                    dense
                    class="search mb-3"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="endDate"
                  no-title
                  flat
                  light
                  scrollable
                  header-color="white"
                  color="indigo lighten-1"
                  class="pa-2"
                  :allowed-dates="allowedDates",
                   :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                >
                  <v-spacer></v-spacer>
                  <v-btn dark color="blue" small @click="endDateMenu = false">
                    <v-icon>mdi-close</v-icon>
                    Cancel
                  </v-btn>
                  <v-btn color="primary" @click="$refs.endDateMenu.save(endDate)" small>
                    <v-icon left>mdi-filter-variant</v-icon> Apply </v-btn>
                </v-date-picker>
                <v-spacer></v-spacer>
              </v-menu>
            </v-col>
          </v-row>
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
  </div>

  <skeleton-table-loader v-else />
</template>
  <script>
export default {
  data() {
    return {
     
      pages: 0,
      startDateMenu: false,
      endDateMenu: false,
      modal: false,
      transactions: null,
      openingBalance: 0,
      closingBalance: 0,
      //max: new Date(Date.now()).toISOString().substr(0, 10),
      startDate:  new Date(Date.now() - 86400000).toISOString().substr(0, 10),
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
      dates: [
        new Date(Date.now() - 86400000).toISOString().substr(0, 10),
        new Date(Date.now()).toISOString().substr(0, 10),
      ],
      
      headers: [
        { text: "Name", value: "name" },
        { text: "MSISDN", value: "msisdn" },
        { text: "Amount", value: "transactionAmount", align: 'end' },
        { text: "Transaction Type ", value: "description" },
        { text: "Balance Before", value: "balanceBefore", align: 'end' },
        { text: "Balance After", value: "balance", align: 'end' },
        { text: "Transaction Date", value: "transactionDate", align: 'center' },
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
          startDate: this.startDate,
          endDate: this.endDate,
          groupId: parseInt(this.$route.params.id) //111222333502
        })
        .then((response) => {
          this.openingBalance = response.response.openBalance.trim().length === 0 ? "0.0" : response.response.openBalance;
          this.closingBalance = response.response.closeBalance.trim().length === 0 ? "0.0" :  response.response.closeBalance;
          this.startDateMenu = false;
          this.modal = false;
          this.transactions =
            response.response.transactions == null
              ? []
              : response.response.transactions;
        })
        .catch((_err) => {
          this.startDateMenu = false;
          this.modal = false;
        });
    },
  },
};
</script>
  