
<template>
  <v-card v-if="group && member" flat>
    <v-app-bar
      fade-img-on-scroll dark
      scroll-threshold="500" color="primary"
      :tile="$vuetify.breakpoint.smAndDown"
    >
      <v-toolbar-title class="text-h5 font-weight-bold">
         {{ group.name }}
      </v-toolbar-title>

      <v-spacer />
      <v-chip :color="_getcolor(member.role)" class="font-weight-bold" dark>
        {{ member.role === '-1' ? '' : member.role }}
      </v-chip>

      <template #extension>
        <v-tabs
        dark
        center-active
        show-arrows
          v-model="tab"
          align-with-title
        >
          <v-tabs-slider color="yellow" />

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <tab-group-account :group="group" />
      </v-tab-item>
      <v-tab-item>
        <tab-group-statment />
      </v-tab-item>
      <v-tab-item>
        <tab-group-members :members="members" @update="_getGroupMembers($event)" />
      </v-tab-item>
      <v-tab-item>
        <tab-group-transactions />
      </v-tab-item>
      <v-tab-item>
        <tab-member-approvals />
      </v-tab-item>
      <v-tab-item>
        <tab-group-settings :group-type-id="group.groupType"/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>

  <skeleton-table-loader v-else />
</template>
<script>
import TabGroupMembers from '@/components/tabs/tab_group_members.vue'
import TabGroupAccount from '@/components/tabs/tab_group_account.vue'
import TabGroupTransactions from '@/components/tabs/tab_group_transactions.vue'
import TabMemberApprovals from '@/components/tabs/tab_member_requests.vue'
import TabGroupSettings from '@/components/tabs/tab_group_settings.vue'
import TabGroupStatment from '@/components/tabs/tab_group_statment.vue'
export default {
  components: {
    'tab-group-members': TabGroupMembers,
    'tab-group-transactions': TabGroupTransactions,
    'tab-group-account': TabGroupAccount,
    'tab-member-approvals': TabMemberApprovals,
    'tab-group-settings': TabGroupSettings,
    'tab-group-statment': TabGroupStatment
  },
  data () {
    return {
      group: null,
      members: [],
      member: null,
      tab: null,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      paymentref: null,
      items: ['Account','Statement', 'Members', 'Transactions', 'Requests', 'Settings']
    }
  },
  head () {
    return {
      title: 'Group'
    }
  },
  computed: {
    formtitle () {
      return this.editedIndex === -1 ? 'Add new service name' : 'Edit Service Name'
    }
  },
  created () {
    this._getThisMember()
    this._getgroupById()
    this._getGroupMembers()
  },
  methods: {
    async _getgroupById () {
      await await this.$api
        .$get(`/groups/${this.$route.params.id}`)
        .then((response) => {
          this.group = response
        })
        .catch(() => {
        })
    },
    async _getGroupMembers () {
      await await this.$api
        .$get(`/groups/${this.$route.params.id}/members`)
        .then((response) => {
          this.members = response
        })
        .catch(() => {
        })
    },
    async _getThisMember () {
      await await this.$api
        .$get(`/groups/${this.$route.params.id}/members/${this.msisdn}`)
        .then((response) => {
          this.member = response
        })
        .catch(() => {
        })
    },
    _getcolor (role) {
      let color
      switch (role.toLowerCase()) {
        case 'member':
          color = 'orange'
          break
        case 'secretary':
          color = 'green'
          break
        case 'chairperson':
          color = 'blue'
          break
        default:
          color = 'grey'
      }
      return color
    }
  }
}
</script>
