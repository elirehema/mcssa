<template>
  <div v-if="transactions">
      <v-data-table
        :headers="headers"
        :items="transactions"
        item-key="name"
        class="elevation-1"
        dense
        :loading="loading"
        :footer-props="footerprops"
         mobile-breakpoint="0"
      >
        <template #top>
          <v-toolbar :extended="$vuetify.breakpoint.mobile" :prominent="$vuetify.breakpoint.mobile" flat >
           <v-row class="d-flex justify-space-around"  no-gutters>
            <v-col cols="12" xs="5" sm="5" md="3" lg="3">
              <span class="text-h6 font-weight-bold">Opening Balance: {{ openingBalance | currency }}</span>
            </v-col>
            <v-col cols="12" xs="5" sm="5" md="3" lg="3" :class="$vuetify.breakpoint.xsAndDown ? 'mt-4':''" >
            <span class="text-h6 font-weight-bold"
              >Closing Balance: {{ closingBalance | currency }}</span
            >
            </v-col>
            
            <v-col cols="12" xs="12" sm="12" md="2" >
              <v-menu
                ref="startDateMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Start date"
                    hint="Start date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
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
                  @change="paginate"
                  @input="startDateMenu = false"
                  :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="2" >
              <v-menu
                ref="endDateMenu"
                v-model="endDateMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="End date"
                    hint="End date"
                    prepend-inner-icon="mdi-calendar"
                    readonly
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
                   @change="paginate"
                  @input="endDateMenu = false"
                  :allowed-dates="allowedDates"
                   :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
            <!--<v-col cols="12" xs="12" sm="12" md="1">
              <v-btn block  small elevation="0" color="success" @click="paginate()"><v-icon left>mdi-magnify</v-icon> Filter results</v-btn>
            </v-col>-->
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
      loading: false,
      transactions: null,
      openingBalance: 0,
      closingBalance: 0,
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
    this.paginate();
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
   

    async paginate() {
      this.loading = true;
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
          this.loading = false;
          this.transactions =
            response.response.transactions == null
              ? []
              : response.response.transactions;
        })
        .catch((_err) => {
          this.loading = false;
          this.startDateMenu = false;
          this.modal = false;
        });
    },
  },
};
</script>
  