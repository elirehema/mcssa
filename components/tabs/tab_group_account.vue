<template>
  <v-row v-if="account" no-gutters>
    <v-col cols="12" md="8">
      <v-card class="mx-auto my-2" elevation="0" :outlined="$vuetify.breakpoint.mdAndUp" :max-width="$vuetify.breakpoint.mdAndUp ?'90%':'100%'">
        <v-simple-table>
          <template #default>
            <tbody>
              <tr>
                <td class="font-weight-bold ">
                  Group Name
                </td>
                <td class="button--text text--darken-3">
                  {{ account.name }}
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold ">
                  Status
                </td>
                <td class="button--text text--darken-3">
                  {{ account.status }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Balance
                </td>
                <td class="text-body-1 font-weight-bold text--darken-3">
                  {{ account.balance | currency }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1 ">
                  Deposits
                </td>
                <td class="button--text text--darken-3">
                  {{ account.deposits |currency }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Withdraws
                </td>
                <td class="button--text text--darken-3">
                  {{ account.withdraws | currency }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Penalties
                </td>
                <td class="button--text text--darken-3">
                  {{ account.penalty | currency}}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Penalty Paid
                </td>
                <td class="button--text text--darken-3">
                  {{ account.penaltyPaid | currency }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Social Funds
                </td>
                <td class="button--text text--darken-3">
                  {{ account.socialfund | currency}}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Social Funds Withdraws
                </td>
                <td class="button--text text--darken-3">
                  {{ account.socialfundWithdraws | currency }}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Bonus
                </td>
                <td class="button--text text--darken-3">
                  {{ account.bonus | currency}}
                </td>
              </tr>
              <tr>
                <td class="text-subtitle-1">
                  Dividends
                </td>
                <td class="button--text text--darken-3">
                  {{ account.dividend | currency}}
                </td>
              </tr>

              <tr>
                <td class="text-subtitle-1">
                  Created date
                </td>
                <td class="button--text text--darken-3">
                  {{ account.createdDate | dateformat }}
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
