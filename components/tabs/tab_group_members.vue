<template>
  <v-data-table
    v-if="members"
    :headers="headers"
    :items="members"
     item-key="msisdn"
    sort-by="calories"
    class="elevation-0"
     mobile-breakpoint="0"
  >
    <template v-if="false" #top>
      <v-toolbar
        flat
      >
        <v-toolbar-title class="text-uppercase">
          Group Members
        </v-toolbar-title>
        <v-spacer />
      </v-toolbar>
    </template>
    <template #item.message="{ item }">
      <v-tooltip left color="primary" class="pa-3" min-width="50%" max-width="80%">
        <template #activator="{ on, attrs }">
          <v-icon
            color="blue"
            dark
            v-bind="attrs"
            v-on="on"
          >
            mdi-message-badge
          </v-icon>
        </template>
        <span class="font-weight-bold">{{ item.sms }}</span>
      </v-tooltip>
    </template>
    <template #no-data>
      <p>No data</p>
    </template>
    <template #item.name="{item}">
      <span>{{ item.name.split(" ")[0] + " "+ item.familyName.split(" ")[0] }}</span>
    </template>
    <template #item.created="{item}">
      <span>{{ item.createdDate | dateformat }}</span>
    </template>
    <template #item.deposits="{item}">
      <span>{{ item.deposits | currency }}</span>
    </template>
    <template #item.penalty="{item}">
      <span>{{ item.penalty | currency }}</span>
    </template>
    <template #item.withdraws="{item}">
      <span>{{ item.withdraws | currency }}</span>
    </template>
    <template #item.dividend="{item}">
      <span>{{ item.dividend | currency }}</span>
    </template>
    <template #item.socialfund="{item}">
      <span>{{ item.socialfund | currency }}</span>
    </template>
    <template #item.socialfundWithdraws="{item}">
      <span>{{ item.socialfundWithdraws | currency }}</span>
    </template>
    <template #item.status="{ item }">
      <v-chip dark small :color="item.status == 'ACTIVE' ? 'green':'success'">
        <v-avatar v-if="item.status == 'ACTIVE'" left>
          <v-icon small>
            mdi-checkbox-marked-circle
          </v-icon>
        </v-avatar>
        {{ item.status }}
      </v-chip>
    </template>
  </v-data-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props: {
    members: {
      type: Array,
      default: null
    }
  },
  data: () => ({
    headers: [

      { text: 'Name', value: 'name' },
      { text: 'MSISDN ', value: 'msisdn' },
      { text: 'Role', value: 'role' },
      { text: 'Status ', value: 'status' },
      { text: 'Deposits ', value: 'deposits',align:'end',},
      { text: 'Penalty', value: 'penalty',align:'end' },
      { text: 'Withdraws', value: 'withdraws',align:'end' },
      { text: 'Dividends ', value: 'dividend',align:'end' },
      { text: 'Social Fund', value: 'socialfund',align:'end' },
      { text: 'S.F Withdraws', value: 'socialfundWithdraws',align:'end' },
      { text: 'Created Date', value: 'created', align:'center' }
    ]
  }),
  methods: {
    rowclick (v) {
      this.show = true
      this.$router.push(`/members/${v.msisdn}`)
      // console.log(v)
    }
  }
}
</script>
