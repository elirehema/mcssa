<template>
  <v-row v-if="account" no-gutters>
    <v-col cols="12" md="8">
      <v-card class="mx-auto my-2" elevation="0" :outlined="$vuetify.breakpoint.mdAndUp" :max-width="$vuetify.breakpoint.mdAndUp ?'90%':'100%'">
        <v-simple-table>
          <template #default>
            <tbody>
              
              <tr>
                <td class="font-weight-bold ">
                  Status
                </td>
                <td class="text--darken-3 text-right">
                  {{ account.status }}
                </td>
              </tr>
    
              <tr>
                <td v-if="group.groupType === 2" class="text-subtitle-1 ">
                  Deposits/Share
                </td>
                <td v-else>
                  Deposits
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.deposits |currency }}
                </td>
              </tr>
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Repayments
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.repayment | currency }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Withdraws
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.withdraws | currency }}
                </td>
              </tr>
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Penalties
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.penalty | currency}}
                </td>
              </tr>
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Penalty Paid
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.penaltyPaid | currency }}
                </td>
              </tr>
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Social Funds
                </td> 
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.socialfund | currency}}
                </td>
              </tr>
             
              <tr>
                <td class="text-subtitle-1">
                  Bonus
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.bonus | currency}}
                </td>
              </tr>
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Dividends
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.dividend | currency}}
                </td>
              </tr>

             <!-- <tr>
                <td class="text-subtitle-1">
                  Created date
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.createdDate | dateformat }}
                </td>
              </tr>-->
             
             
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Available Share Balance
                </td>
                <td class="text-h6 text--darken-3 text-right" >
                  {{ (account.balance - account.socialfund - account.penaltyPaid - account.bonus) | currency }}
                </td>
                
              </tr>
              <tr v-if="group.groupType === 2">
                <td class="text-subtitle-1">
                  Social Funds Balance
                </td> 
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.socialfund | currency}}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Overall Balance
                </td>
                <td class="text-h6 text--darken-3 text-right">
                  {{ account.balance | currency }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props:{
    group:{
      type: Object,
      default: null
    }
  },
  data () {
    return {
      account: null
    }
  },
  created () {
    this.viewgroupaccount()
  },
  methods: {
    async viewgroupaccount () {
      await this.$api.$get(`/accounts/${this.$route.params.id}`)
        .then((response) => {
          this.account = response
        }).catch((_err) => {
        })
    }
  }
}
</script>
