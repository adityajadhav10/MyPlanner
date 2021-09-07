<template>
<v-content>
        <v-container fluid fill-height>
            <user-dashboard-header />
          <v-layout>
              <!-- If User Logged Out -->
            <v-flex class='notification is-danger' v-if="!$store.state.isUserLoggedIn" >
              Please Login to view this Content!!!!
            </v-flex>
            <!-- If User Active -->
            <v-flex v-if="$store.state.isUserLoggedIn">
                <v-flex class='notification is-success' v-if="alert"  v-bind:class="{ 'is-hidden' : !alert }" >
              {{alertMsg}}
               <button class="delete" @click="alert=!alert"></button>
            </v-flex>
                 <div
                        height="300px"
                        class="yellow--text text--darken-1 font-weight-bold is-size-3 is-capitalized"
                        > Goals</div>
                  <v-divider light></v-divider>

                  <!-- If no data  -->
                  <div v-if="this.noGoals">
                   <v-flex class='notification is-warning white--text font-weight-bold is-size-5'  >
                        Please add activities in order to set goals !!!
                    </v-flex>
                   <div class="text-xs-center">
                            <v-btn color="red" dark
                            :to="{
                            name: 'UserDashboard'
                            }" >
                                 <v-icon dark left>arrow_left</v-icon>Back
                            </v-btn>
                            <v-btn color="blue lighten-1" dark :to="{
                            name: 'Activities'
                            }" >
                               Go to Activities <v-icon dark right>arrow_right</v-icon>
                            </v-btn>
                    </div>
                  </div>

                  <!-- If data exists -->
                <v-timeline v-if="!this.noGoals">
                    <v-timeline-item
                    v-for="(n,index) in finalgoals"
                    :key="n._id"
                    color="teal accent-4"
                    large
                    >
                    <template v-slot:opposite>
                        <span>{{formatServerDate(n.bmiData.date)}}</span>
                    </template>
                    <v-card class="elevation-2 yellow darken-1 white--text">
                    <div
                    v-for="activity in n.bmiData.activities"
                    :key="activity.id">
                        <v-card-title class="headline ">
                        <div>
                      <div class="headline font-weight-bold">Activity :  {{activity.activityName}} </div>
                      <div class="font-weight-medium">Time Spent : {{activity.activityTime}} mins</div>
                      <div class="font-italic font-weight-light">Goal : Burn  <icon name="arrow-right" scale="1"></icon> {{n.bmiData.caloriesBurnGoal}} kCal</div>
                    </div>
                       
                        
                        
                     
                        </v-card-title>
                          </div>

                    <v-divider dark></v-divider>

                    <v-card-actions class="pa-3">      
                            <div class="font-weight-medium ">
                                <icon name="running" scale="2"></icon>
                                <icon name="volleyball-ball" scale="2"></icon>
                                <icon name="dumbbell" scale="2"></icon>
                                <icon name="apple-alt" scale="2"></icon>
                                <icon name="bed" scale="2"></icon>
                                <icon name="flag" scale="2"></icon>
                             </div> 
                             <v-spacer></v-spacer>
                          <v-btn color="red" dark @click="deleteActivity(n._id,index)">
                                <v-icon dark>delete</v-icon>
                            </v-btn>
                            <v-btn color="blue lighten-1" dark  @click="viewGoalsDetails(n.bmiData)">
                                <v-icon dark>info</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>

                   
                </v-timeline-item>
            </v-timeline>
                    
            </v-flex>
          </v-layout>
        </v-container>
    </v-content>
   
</template>

<script>
import UserDashboardHeader from '@/components/UserDashboard/UserDashboardHeader.vue';
import ActivitiesServices from '@/services/ActivitiesServices'
import store from '@/store/store'
export default {
name: 'Goals',
data(){
            return{
                results: [],
                goals:"",
                finalgoals:[],
                alert:false,
                alertMsg:'',
                noGoals : false,
                userId:this.$store.state.user._id
            }
        },

        created: function()
        {
            this.fetchItems();
        },

        methods: {
            async fetchItems()
            {
                    this.results = await ActivitiesServices.getActivities({
                        
                        params: { userId: this.userId }
                        
                    })
                    console.log ("res",this.results)
                    this.goals = this.results.data
                    console.log ("goals:",this.goals)
                    this.goals.forEach(element => {
                        this.finalgoals.push(element) 
                    });
                    console.log ("Final:",this.finalgoals)
                 
                   this.isGoalsEmptyCheck()
            },
           
            async deleteActivity(item,index){
                
                    const response = await ActivitiesServices.deleteActivity({
                        params: { _id: item }
                        })
                        //Delete from client side
                        if(response){
                           this.finalgoals.splice(index,1);
                           this.alert = true
                           this.alertMsg = response.data.message
                        }
                        this.isGoalsEmptyCheck()
            },
            viewGoalsDetails(items){
                    this.$router.push({
                            name: 'GoalsDetails',
                            params : {items : items}
                                    })
            },
            formatServerDate(datetime) {
                let date = new Date(datetime);
                let dateString = `${date.getFullYear}/${date.getMonth() + 1}/${date.getDate}`
                return date
            },
            isGoalsEmptyCheck(){
                 if(this.finalgoals.length == 0 || this.finalgoals == undefined){
                        this.noGoals = true
                    }
            }
        },

    components : {
        UserDashboardHeader
    }

}

</script>

<style>

</style>
