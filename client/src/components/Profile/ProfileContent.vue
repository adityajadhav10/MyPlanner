<template>
 <v-content>
        <v-container fluid fill-height>
          <v-layout>
            <v-flex class='notification is-danger' v-if="!$store.state.isUserLoggedIn" >
              Please Login to view this Content!!!!
            </v-flex>

            <v-flex v-if="$store.state.isUserLoggedIn" >
                   <v-layout row align-center justify-space-between>
                   <div class="is-size-3 has-text-weight-bold blue--text" xs12 md4> Profile : View / Update </div>
                   <v-btn color="red" dark :to="{
                            name: 'UserDashboard'
                            }" xs12 md4> 
                            <v-icon dark>cancel</v-icon>
                            </v-btn> 
                    </v-layout>
                   <v-divider ></v-divider>
                    
                        <v-layout row align-center justify-space-between>
                            <v-card>
                         <v-card width="600px" class="gray" dark >
                         <v-card-text class="is-size-5 has-text-weight-bold"> Name </v-card-text>
                        </v-card> 
                        <v-card width="600px" class="is-size-5 has-text-weight-bold pa-3 blue--text">
                            
                                  {{$store.state.user.name}}
                            
                        </v-card>
                            </v-card>
                            <v-card>
                         <v-card width="600px" class="gray" dark>
                         <v-card-text class="is-size-5 has-text-weight-bold"> Registered Email </v-card-text>
                        </v-card> 
                        <v-card width="600px" class="is-size-5 has-text-weight-bold pa-3 blue--text">
                            
                                  {{$store.state.user.email}}
                            
                        </v-card> 
                            </v-card>   
                        </v-layout> 
                         <v-divider ></v-divider>
                         <v-flex class='notification is-warning' v-if="errorAlert"  v-bind:class="{ 'is-hidden' : !errorAlert }" >
                    {{errorAlertMsg}}
                    <button class="delete" @click="errorAlert=!errorAlert"></button>
                </v-flex>
                         <v-form ref="form1"
                                 :rules="[() => !errors.has('gender') && !errors.has('bio') && !errors.has('age')]">
                         <v-card  class="gray" dark>
                             <v-card-text class="is-size-5 has-text-weight-bold"> Additional Information </v-card-text>
                         </v-card> 
                         <v-card class="is-size-6 has-text-weight-bold pa-3 blue--text">
                            <v-card-text class="is-size-5 has-text-weight-bold"> Gender : </v-card-text>
                                 <v-radio-group v-model="additionalInfo.gender" row 
                                  name="gender"
                                 :error-messages="errors.collect('gender')"
                                 v-validate="'required'"
                                 >
                                    <v-radio label="Male" value="male"></v-radio>
                                    <v-radio label="Female" value="female"></v-radio>
                                    <v-radio label="Other" value="other"></v-radio>
                                </v-radio-group>
                            
                    
                             <v-text-field
                                name="age"
                                type="number"
                                box
                                :error-messages="errors.collect('age')"
                                v-model="additionalInfo.age"
                                :rules="ageRules"
                                label="Age"
                                v-validate="'required'"
                                ></v-text-field>

                                <v-textarea
                                    rows="1"
                                    auto-grow
                                    name="bio"
                                    box
                                    :error-messages="errors.collect('bio')"
                                    v-model="additionalInfo.bio"
                                    :rules="bioRules"
                                    label="Bio"
                                    v-validate="'required'"
                                    counter="50"
                                    ></v-textarea>
                       
                        </v-card>     
                    </v-form>
                        <v-divider ></v-divider> 
                        <v-card-actions>
                    <v-btn
                        color="red white--text"
                        depressed
                        :to="{
                                name: 'UserDashboard'
                            }" 
                    >
                        <v-icon left>cancel</v-icon>
                        Cancel
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn
                        color="blue-grey darken-3 white--text"
                        depressed
                         @click="updateUser"
                    >
                        <v-icon left>update</v-icon>
                        Update Now
                    </v-btn>
                    </v-card-actions>
                    <v-divider ></v-divider>
            </v-flex>
          </v-layout>
        </v-container>
 </v-content>

</template>

<script>
import ProfileServices from './../../services/ProfileServices'
import store from '@/store/store'
export default {
    name: 'ProfileContent', 
  data () {
  
    return {
      userId: this.$store.state.user._id,
      name: this.$store.state.user.name,
      errorAlert:false,
      errorAlertMsg:'',
      error: null,
      additionalInfo:{
            age: '',
            gender: '',
            bio: '',
            },
            ageRules:[
                (value) => value && value >= 1 && value <= 100 || 'Age must be atleast 1 and less than 100 '
            ],
            bioRules:[
                (value) => value && value.length >= 5 && value.length <= 50 || 'Bio must contain atleast 5 and less than 50 characters'
            ]
    }
  },
   methods: {
    async updateUser () {
      try {
                if ((this.additionalInfo.age && this.additionalInfo.bio && this.additionalInfo.gender) == '' ) {
                        this.errorAlert = true
                        this.errorAlertMsg = 'Please Fill all the required fields!'
                        return
                    }
                    
                const response = await ProfileServices.updateProfile({
                _id: this.userId,
                additionalInfo : this.additionalInfo 
                })
                if (response) {

                this.$router.push({
                    name: 'UserDashboard',
                    params : {message : response.data.message}
                })
                }
            } catch (error) {
                this.error = error.response.data.error
            }
        }
   }
 }
</script>

<style>
.v-messages__message {
    color: red;
}
</style>
