<template>
      <v-content>
        <v-container fluid fill-height> 
            <user-dashboard-header />
          <v-layout>
            <v-flex class='notification is-danger' v-if="!$store.state.isUserLoggedIn" >
              Please Login to view this Content!!!!
            </v-flex>

            <v-flex v-if="$store.state.isUserLoggedIn">
               <v-flex class='notification is-warning' v-if="errorAlert"  v-bind:class="{ 'is-hidden' : !errorAlert }" >
              {{errorAlertMsg}}
               <button class="delete" @click="errorAlert=!errorAlert"></button>
            </v-flex>
                   <div
                        height="300px"
                        class="blue-grey--text text--lighten-1 font-weight-bold is-size-3 is-capitalized"
                        > Activities</div>
                     <v-divider light></v-divider>
                 <v-stepper v-model="e1" > 
                    <v-stepper-header class="blue-grey lighten-3">
                    <v-stepper-step :complete="e1 > 1" step="1"
                       :rules="[() => !errors.has('currentWeight') && !errors.has('targetedWeight') && !errors.has('waistSize') && !errors.has('targetedWaistSize') && !errors.has('height')]">
                       Set your Goals</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2"
                      >
                      Define your Activities</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3" :rules="[() => !errors.has('waterDrank') && !errors.has('waterGoal') && !errors.has('caloriesBurnGoal')]" 
                    >Consumption</v-stepper-step>
                    </v-stepper-header>

                    <v-stepper-items>
                    <!--1st form-->
                    <v-stepper-content step="1">
                        <v-card
                        class="mb-3"
                        height="100%"
                        >
                            <v-form ref="form1">
                            <v-layout>
                                <v-flex
                                    xs12
                                    md5
                                    >
                                <v-text-field
                                name="currentWeight"
                                type="number"
                                :error-messages="errors.collect('currentWeight')"
                                v-model="bmiData.currentWeight"
                                :rules="weightRules"
                                label="Current Weight (kgs)"
                                v-validate="'required'"
                                ></v-text-field>

                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex
                                    xs12
                                    md5
                                    >
                                <v-text-field
                                name="targetedWeight"
                                :error-messages="errors.collect('targetedWeight')"
                                v-model="bmiData.targetedWeight"
                                :rules="weightRules"
                                type="number"
                                label="Targeted Weight (kgs)"
                                 v-validate="'required'"
                                ></v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout>
                                <v-flex
                                    xs12
                                    md5
                                    >
                                <v-text-field
                                name="waistSize"
                                :error-messages="errors.collect('waistSize')"
                                v-model="bmiData.waistSize"
                                :rules="waistsizeRules"
                                type="number"
                                label="Waist Size (cms)"
                                 v-validate="'required'"
                                ></v-text-field>  
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-flex
                                    xs12
                                    md5
                                    >
                                <v-text-field
                                name="targetedWaistSize"
                                type="number"
                                :error-messages="errors.collect('targetedWaistSize')"
                                v-model="bmiData.targetedWaistSize"
                                :rules="waistsizeRules"
                                label="Targeted Waist Size (cms)"
                                v-validate="'required'"
                                ></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout>
                              <v-text-field
                                type="number"
                                name="height"
                                :error-messages="errors.collect('height')"
                                v-model="bmiData.height"
                                :rules="heightRules"
                                label="Height (cms)"
                                v-validate="'required'"

                                ></v-text-field>
                            </v-layout>
                            </v-form>
                        </v-card>
                        <v-btn
                        class="blue lighten-1 white--text"
                        @click="e1 = 2"
                        >
                        Continue <v-icon dark right>arrow_right</v-icon>
                        </v-btn>

                        <v-btn color="red" dark 
                            :to="{
                            name: 'UserDashboard'
                            }" >
                             Cancel    <v-icon dark right>cancel</v-icon>
                            </v-btn>
                    </v-stepper-content>
                    
                    <!--2nd form-->
                    <v-stepper-content step="2">
                        <v-card
                        class="mb-3"
                        height="100%"
                        >
                           <v-toolbar flat color="white">
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog"  transition="dialog-top-transition">
                                <template v-slot:activator="{ on }">
                                <v-btn color="blue-grey lighten-1" dark class="mb-2" v-on="on">New Activity</v-btn>
                                </template>
                                <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                   
                                    <v-layout >
                                      <v-flex xs12 >
                                      <v-text-field 
                                        v-model="editedItem.activityName"
                                        name="activityName"
                                        label="Activity Name : (Eg Leisure,Sports etc)"
                                        required>
                                      </v-text-field>
                                      </v-flex>
                                    </v-layout>
                                    <v-layout>
                                        <v-flex xs12 >
                                        <v-text-field 
                                          v-model="editedItem.activityTime" 
                                          name="activityTime"
                                          type="number"
                                          label="Time Spent (mins)"
                                          required>
                                          </v-text-field>
                                        </v-flex>
                                    
                                    </v-layout>
                                    
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" flat @click="save" :disabled="(!editedItem.activityName || !editedItem.activityTime)">Save</v-btn>
                                </v-card-actions>
                                </v-card>
                            </v-dialog>
                            </v-toolbar>
                            <v-data-table
                            :items="activities"
                            class="elevation-1"
                            >
                            <template v-slot:items="props" >
                                <td>{{ props.item.activityName }}</td>
                                <td class="text-xs-right">{{ props.item.activityTime }} min</td>    
                                <td class="justify-center px-0">
                                <v-icon
                                    small
                                    color="yellow"
                                    class="mr-2"
                                    @click="editItem(props.item)"
                                >
                                    edit
                                </v-icon>
                                <v-icon
                                    small
                                    color="red"
                                    @click="deleteItem(props.item)"
                                >
                                    delete
                                </v-icon>
                                </td>
                            </template>
                            <template slot="no-data">
                              <div class="has-text-weight-bold is-size-6">Please add new activity</div>
                            </template>
                            </v-data-table>
                        </v-card>
                        <v-btn @click="e1 = 1" flat> <v-icon dark left>arrow_left</v-icon>Back</v-btn>
                        <v-btn
                        class="blue white--text"
                        @click="e1 = 3"
                        :disabled="isDisabled"
                        >
                        Continue <v-icon dark right>arrow_right</v-icon>
                        </v-btn>

                    </v-stepper-content>
                    <!--3rd form-->
                    <v-stepper-content step="3">
                        <v-card
                        class="mb-5"
                        height="100%"
                        >
                        <v-form ref="form1"
                                lazy-validation>
                            <v-layout>                
                                <v-text-field xs12
                                v-model="bmiData.waterDrank"
                                name="waterDrank"
                                type="number"
                                :error-messages="errors.collect('waterDrank')" 
                                label="Water Drank (Glasses)"
                                v-validate="'required'"
                                ></v-text-field>
                            </v-layout>
                               <v-layout>                      
                                <v-text-field
                                v-model="bmiData.waterGoal"
                                name="waterGoal"
                                type="number"
                                :error-messages="errors.collect('waterGoal')" 
                                label="Water Target (Glasses)"
                                v-validate="'required'"
                                ></v-text-field>
                               
                            </v-layout>
                             <v-layout>
                                 <v-text-field
                                v-model="bmiData.caloriesBurnGoal"
                                name="caloriesBurnGoal"
                                type="number"
                                :error-messages="errors.collect('caloriesBurnGoal')" 
                                :rules="caloriesBurnGoalRules"
                                label="Calories Burn Goal (kcal)"
                                v-validate="'required'"
                                ></v-text-field>
                            </v-layout>
                        </v-form>
            
                        </v-card>
                        <v-btn @click="e1 = 2" flat> <v-icon dark left>arrow_left</v-icon>Back</v-btn>
   
                        <v-btn 
                        class="green accent-3 white--text"
                        @click="submit"
                        >
                        <v-icon dark left>check_circle</v-icon>
                         Submit
                        </v-btn>
            
                <v-btn color="red" dark 
                            :to="{
                            name: 'UserDashboard'
                            }" >
                             Cancel    <v-icon dark right>cancel</v-icon>
                            </v-btn>
               
                </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </v-flex>
        </v-layout>
      </v-container>
   </v-content>
</template>

<script>
import UserDashboardHeader from '@/components/UserDashboard/UserDashboardHeader.vue';
import AuthenticationService from '@/services/AuthenticationServices'
import ActivitiesServices from '@/services/ActivitiesServices'
import store from '@/store/store'
export default {
    name: 'Activities',
    data () {
        return {
            e1: 0,
            dialog: false,
            alertMsg:'',
            errorAlert:false,
            errorAlertMsg:'',
            isDisabled:true,
            userId1:this.$store.state.user._id,
            bmiData:{
                userId:null,
                currentWeight:null,
                targetedWeight:null,
                waistSize:null,
                targetedWaistSize:null,
                height:null,
                waterDrank:null,
                waterGoal:null,
                caloriesBurnGoal:null,
                activities: []
            },
            weightRules:[
                (value) => !!value || 'Weight field is required',
                (value) => value && value >= 20 && value <= 150 || 'Weight must be atleast 20 and less than 150 kgs'
            ],
            waistsizeRules:[
                (value) => !!value || 'Waist Size field is required',
                (value) => value && value >= 71 && value <= 162 || 'Waist Size must be atleast 71 (XS) and less than 162cms (6XL) '
            ],
            heightRules:[
                 (value) => !!value || 'Waist Size field is required',
                  (value) => value && value >= 60 && value <= 244 || 'Height can be mininmum of 60cms (2 ft) and maximum 244 (8 ft) '
            ],
            activityNameRules:[
                (value) => !!value ||'Activity Name is required',
            ],
            activityTimeRules:[
                (value) => !!value ||'Activity Time is required',
                (value) => value && value >= 1 && value <=1440 || 'Time can be mininmum of 1 min and maximum 1440 (24 hours) '
            ],
            caloriesBurnGoalRules:[
                (value) => !!value ||'Calories Burn Goal is required',
                (value) => value && value >= 1000 || 'Calories should be a minimum of 1000 (cal) '
            ],
            editedIndex: -1,
            activities: [],
            editedItem: {
                activityName: '',
                activityTime: null,
            },
            defaultItem: {
                activityName: '',
                activityTime: null,
            }
        }
        
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Activity' : 'Edit Activity'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods : {
        //Step 1
        async submit() {       
            try {
                this.$validator.validate().then(result => {
                //Data Invalid
                if (!result) {
                        this.errorAlert = true
                        this.errorAlertMsg = 'Please Fill all the required fields!'
                        return
                    }
                    })
                        this.bmiData.activities = this.activities
                        this.bmiData.userId = this.userId1
                        const response = await ActivitiesServices.addActivities({
                        bmiData: this.bmiData,
                        })
                        if(response){
                           this.alertMsg ='Activities Successfully added ,please go to Goals section for complete details'
                                this.$router.push({
                                    name: 'UserDashboard',
                                    params : {message : this.alertMsg}
                                    })
                        }
                    }
                        catch (err) {
                                console.log(err)
                            }     
                },

        //Step 2
        editItem (item) {
            this.editedIndex = this.activities.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            const index = this.activities.indexOf(item)
            confirm('Are you sure you want to delete this activity?') && this.activities.splice(index, 1)
            this.isDisabled = (this.activities.length == 0)  
        },

        close () {
            this.dialog = false
            setTimeout(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            }, 300)
        },

        save () {  
            if (this.editedIndex > -1) {
            Object.assign(this.activities[this.editedIndex], this.editedItem)
            } else {
            this.activities.push(this.editedItem)
            }
            this.close()
            this.isDisabled = false
            }
    },
     components : {
        UserDashboardHeader
    } 
}
</script>

<style>
.v-dialog__content{
    height: 325px !important;
    width: 550px!important;
    left: 368px;
    top: -17px;
}
.v-messages__message {
    color: red;
}
.v-stepper__step.v-stepper__step--error .v-stepper__step__step .v-icon {
    color: red !important;
}
</style>
