<template>
  <v-simple-table v-if="settings && groupTypeId != 1">
    <template #default>
      <tbody>
        <tr
          v-for="setting in settings.slice(0, 3)"
          :key="setting.title"
        >
          <td class="font-weight-medium">{{ setting.title }}</td>
          <td class="font-weight-medium" v-html="setting.value" />
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  <skeleton-table-loader v-else />
</template>
<script>
export default {
  props:{
    groupTypeId:{
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      settings: null

    }
  },
  computed: {
  
  },
  created () {
    this.getgroupSettings()
  },
  methods: {
    async getgroupSettings () {
      await this.$api.$get(`/groups/${this.$route.params.id}/settings`)
        .then((response) => {
          this.settings = response
        }).catch((_err) => {
        })
    }
  }
}
</script>
