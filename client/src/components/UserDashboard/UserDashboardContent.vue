<template>
   <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex class='notification is-danger' v-if="!$store.state.isUserLoggedIn" >
              Please Login to view this Content!!!!
            </v-flex>

            <v-flex v-if="$store.state.isUserLoggedIn" >
              <v-flex class='notification is-success' v-if="alertMsg">
              {{alertMsg}}
            </v-flex>
                  <div class='notification has-background-grey-lighter has-text-white is-size-5 has-text-weight-bold' >
                    Welcome : {{$store.state.user.name}} 
                    </div>
                    <div fluid grid-list-md>

                    <v-layout row wrap>
                      <v-flex d-flex xs12 sm6 md4 pa-2>
                      <v-hover>
                        <v-card
                          slot-scope="{ hover }"
                          class="mx-auto"
                          color="grey lighten-4"
                          max-width="600"
                        >
                          <v-img contain
                            :aspect-ratio="16/9"
                            :src="require('../../assets/trophy.jpg')"
                            class="white"
                          >
                            <v-expand-transition>
                              <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out yellow accent-4 v-card--reveal display-3 white--text"
                                style="height: 100%;"
                                @click="goals"
                              >
                                Check Now
                              </div>
                            </v-expand-transition>
                          </v-img>
                          <v-card-text
                            class="pt-4"
                            style="position: relative;"
                            >
                              <h3 class="display-1 font-weight-bold yellow--text text--accent-4 mb-2">Goals</h3>
                              <div class="font-weight-thin grey--text text--darken-2  mb-2">
                              Define your goals related to your activities set as per the target.
                              </div>
                          </v-card-text>
                        </v-card>
                      </v-hover>
                      </v-flex>

                    <v-flex d-flex xs12 sm6 md4 pa-2>
                      <v-hover>
                      <v-card
                        slot-scope="{ hover }"
                        class="mx-auto"
                        color="grey lighten-4"
                        max-width="600"
                      >
                        <v-img contain
                          :aspect-ratio="16/9"
                          :src="require('../../assets/activities.png')"
                          class="white"
                        >
                        <v-expand-transition>
                              <div
                                v-if="hover"
                                class="d-flex transition-fast-in-fast-out blue-grey darken-3 v-card--reveal display-3 white--text"
                                style="height: 100%;"
                                 @click="activities"
                              >
                              Check Now
                              </div>
                        </v-expand-transition>
                        </v-img>
                          <v-card-text
                            class="pt-4"
                            style="position: relative;">
                            <h3 class="display-1 font-weight-bold blue-grey--text text--darken-2 mb-2">Activities</h3>
                            <div class="font-weight-thin grey--text text--darken-2  mb-2">
                            Set your goals along with your daily activities and sport.
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-hover>
                  </v-flex>

                  <v-flex d-flex xs12 sm6 md4 pa-2>
                    <v-hover>
                        <v-card
                          slot-scope="{ hover }"
                          class="mx-auto"
                          color="grey lighten-4"
                          max-width="600">

                          <v-img contain
                            :aspect-ratio="16/9"
                            :src="require('../../assets/profile.png')"
                            class="white">
                              <v-expand-transition>
                                <div
                                  v-if="hover"
                                  class="d-flex transition-fast-in-fast-out light-blue darken-4 v-card--reveal display-3 white--text"
                                  style="height: 100%;"
                                   @click="profile"
                                >
                                Check Now
                                </div>
                              </v-expand-transition>
                          </v-img>

                          <v-card-text
                            class="pt-4"
                            style="position: relative;">

                              <h3 class="display-1 font-weight-bold light-blue--text text--darken-2 mb-2">Profile</h3>
                              <div class="font-weight-thin grey--text text--darken-2  mb-2">
                              View your profile
                              </div>
                          </v-card-text>
                        </v-card>
                      </v-hover>

                      </v-flex>
                    </v-layout>
                    </div>


            </v-flex>
          </v-layout>
        </v-container>
   </v-content>
</template>

<script>
export default {
   name: 'UserDashboardContent',
 
  data () {
    return {
      alertMsg : this.$route.params.message
    }
  },
  methods : {
    profile(){
      this.$router.push({
            name: 'Profile'
          })
    },
     activities(){
      this.$router.push({
            name: 'Activities'
          })
    },
    goals(){
       this.$router.push({
            name: 'Goals',
          })
    }
  }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>
