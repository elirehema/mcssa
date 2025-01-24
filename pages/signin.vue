<template>

    <v-container>
      <div class="d-flex align-center justify-center">
        <v-row class="mt-0" no-gutters>
          <v-col cols="12" md="5" class="  d-flex justify-center align-center">
            <v-list color="transparent">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-h4 text-md-h3 text-lg-h2 font-weight-black primary--text text-sm-center text-md-left">
                    <img
                  src="tcb.png"
                  alt="homepage"
                  width="250px"
                  class="ml-2 dark-logo"
                >
                  </v-list-item-title>
                  <v-list-item-subtitle class="mt-10 text-sm-caption text-md-caption text-lg-h5 grey--text text-sm-center text-md-left">
                    M-Koba self service web portal
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="5" lg="5" class="mt-5 d-flex justify-center" >
            <v-card class="py-12">
              <v-card-title class="d-flex justify-center">
                <img
                  src="tcb.png"
                  alt="homepage"
                  width="150px"
                  class="ml-2 dark-logo"
                >
              </v-card-title>
              <v-card-text>
                <v-form  ref="form"
    v-model="valid"
    lazy-validation class="form-box" @submit.prevent="formSubmit">
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.phoneNumber"
                      color="black"
                      class=" px-3 form-input"
                      outlined
                      :rules="msisdnRules"
                      placeholder="e.g 255716000000"
                      label="Phone Number"
                      required
                    />
                  </v-col>
                  <v-col cols="12" class=" mt-5 d-flex justify-center">
                    <v-btn block type="submit" color="primary" dark>
                      Continue
                      <v-icon right>
                        mdi-arrow-right-bold
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" />
                </v-row>
              </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>

</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'login',
  data () {
    return {
      valid: true,
      form: {
        phoneNumber: null
      },
      msisdnRules: [
        v => !!v || 'Phone Number is required',
        v => (v && v.match(/^(0|255)(?!0)\d*$/)) || 'Phone Number must be numeric and starts with either 0 or 255 ',
        v => (v && v.length >= 10) || 'Phone Number must be not less than 10 characters',
      ],
      title: 'Market Grid : Login'
    }
  },
  head () {
    return {
      title: 'Login Page'
    }
  },
  computed: {
    ...mapGetters(['processing'])

  },

  created () {
    // check if user logged in othewise send them packing

    if (this.isAuthenticated) {
      this.$router.replace('/')
    }
  },
  methods: {
    ...mapActions(['login']),

    formSubmit () {
      if(this.$refs.form.validate()){
      this.$store.dispatch('_requestotp', this.form)
      }
    }
  }

}
</script>
