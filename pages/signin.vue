<template>
  <v-form class="form-box" @submit.prevent="formSubmit">
    <v-container height="100%">
   

      <div class="d-flex align-center justify-center mt-15">
        <v-row class="mt-0" no-gutters>
          <v-col cols="12" md="5" class="  d-flex justify-center align-center ">
            <v-list color="transparent">
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-sm-h4 text-md-h3 text-lg-h2 font-weight-black red--text text-sm-center text-md-left">
                    M-Koba
                  </v-list-item-title>
                  <v-list-item-subtitle class="mt-10 text-sm-caption text-md-caption text-lg-h5 grey--text text-sm-center text-md-left">
                    M-Koba self service web portal
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="5" lg="4" class="mt-5 d-flex justify-center">
            <v-card class="py-12">
              <v-card-title class="d-flex justify-center">
                <img
                  src="@/assets/images/logo.png"
                  alt="homepage"
                  width="100px"
                  class="ml-2 dark-logo"
                >
              </v-card-title>
              <v-card-text>
                <v-row no-gutters class="mt-5">
                  <v-col cols="12" class=" mt-3">
                    <v-text-field
                      v-model="form.phoneNumber"
                      color="black"
                      class=" px-3 form-input"
                      outlined
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
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-form>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  layout: 'login',
  data () {
    return {
      form: {
        phoneNumber: null
      },

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
      this.$store.dispatch('_requestotp', this.form)
    }
  }

}
</script>
