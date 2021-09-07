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
                <div>
                    <v-layout row align-center justify-space-between>
                   <div class="is-size-3 has-text-weight-bold blue-grey--text" xs12 md4> Goals : Overview </div>
                   <v-btn color="red" dark :to="{
                            name: 'Goals'
                            }" xs12 md4> 
                            <v-icon dark>cancel</v-icon>
                            </v-btn> 
                    </v-layout>
                   <v-divider ></v-divider>
                      
                     <v-card class="gray" dark>
                         <v-card-text class="is-size-5 has-text-weight-bold"> Activities </v-card-text>
                        </v-card>  
                        
                        <v-card>
                            <br>
                    <v-layout grid-list-md text-xs-center justify-space-around>
                    <div      
                    v-for="activity in this.activityName"
                    :key="activity.id">
                      
                     <v-card class="yellow darken-1 white--text is-size-3" dark xs3 md4 pa-2> {{activity}} </v-card>
                        
                    </div>
                     
                    </v-layout> 
                    <br>  
                    </v-card> 

                    <v-divider ></v-divider>

                     <v-layout row align-center justify-space-between>
                      <v-card xs12 md4>  
                    <v-card class="gray" dark>
                        <v-card-text class="is-size-5 has-text-weight-bold"> Calories </v-card-text>
                       
                    </v-card>
                    <v-card xs12 md4 class="text-xs-center pa-5">
                        <br>
                    <div class="font-weight-medium">
                    Total Calories Burned : <p class="font-weight-light is-italic is-size-4">{{totalCal}} kCal</p><br>
                    Calories Burn Goal : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.caloriesBurnGoal}} kCal </p> <br>
                    </div>
                           <br>
                    <v-progress-circular
                        :rotate="270"
                        :size="100"
                        :width="15"
                        :value="getCalories"
                        color="teal"
                        >
                        {{ getCalories }} %
                        </v-progress-circular>

                    </v-card>
                      </v-card>

                        <v-card xs12 md4>  
                    <v-card class="gray" dark >
                        <v-card-text class="is-size-5 has-text-weight-bold"> Weight </v-card-text>
                       
                    </v-card>
                    <v-card xs12 md4 class="text-xs-center pa-5">
                        <br>
                    <div class="font-weight-medium">
                    Current : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.currentWeight}} kgs</p><br>
                    Target : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.targetedWeight}} kgs </p> <br>
                    </div>
                           <br>
                    <v-progress-circular
                        :rotate="270"
                        :size="100"
                        :width="15"
                        :value="getWeight"
                        color="teal"
                        >
                        {{ getWeight }} %
                        </v-progress-circular>

                    </v-card>
                      </v-card>

                     <v-card xs12 md4>  
                    <v-card class="gray" dark >
                        <v-card-text class="is-size-5 has-text-weight-bold"> Water </v-card-text>
                       
                    </v-card>
                    <v-card xs12 md4 class="text-xs-center pa-5">
                        <br>
                    <div class="font-weight-medium">
                    Drank : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.waterDrank}} Glasses</p><br>
                    Goal : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.waterGoal}} Glasses </p> <br>
                    </div>
                           <br>
                    <v-progress-circular
                        :rotate="270"
                        :size="100"
                        :width="15"
                        :value="getWater"
                        color="teal"
                        >
                        {{ getWater }} %
                        </v-progress-circular>

                    </v-card>
                      </v-card>

                     <v-card xs12 md4>  
                    <v-card class="gray" dark >
                        <v-card-text class="is-size-5 has-text-weight-bold"> Waist </v-card-text>
                       
                    </v-card>
                    <v-card xs12 md4 class="text-xs-center pa-5">
                        <br>
                    <div class="font-weight-medium">
                    Current : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.waistSize}} cm</p><br>
                    Target : <p class="font-weight-light is-italic is-size-4">{{goalsDetails.targetedWaistSize}} cm </p> <br>
                    </div>
                           <br>
                    <v-progress-circular
                        :rotate="270"
                        :size="100"
                        :width="15"
                        :value="getWaist"
                        color="teal"
                        >
                        {{ getWaist }} %
                        </v-progress-circular>

                    </v-card>
                      </v-card>


                     </v-layout>
                    
                   
                    
                </div>
            </v-flex>
          </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import UserDashboardHeader from '@/components/UserDashboard/UserDashboardHeader.vue';
export default {
    name: 'GoalsDetails',
    data(){
            return{
                goalsDetails : this.$route.params.items,
                activitiesDetails : [],
                activityName: [],
                activityTime : [],
                calPercent : 0,
                weightPercent : 0,
                waistPercent : 0,
                waterPercent : 0,
                totalCal : 0,
                totalPerformance : 0
            }
    },
   
     computed:{
        getCalories : function() {
            this.getActivitiesDetails()
            this.getActivityNameAndTime() 
            this.totalCal = this.calculateCalories().toFixed(2)
            this.calPercent = this.calculatePercentage(this.totalCal,this.goalsDetails.caloriesBurnGoal,this.calPercent,false)
            return this.calPercent
        },
        getWeight : function() {
            this.weightPercent = this.calculatePercentage( this.goalsDetails.currentWeight,this.goalsDetails.targetedWeight,this.weightPercent,true)
            return this.weightPercent
        },
         getWaist : function() {
            this.waistPercent = this.calculatePercentage(this.goalsDetails.waistSize,this.goalsDetails.targetedWaistSize,this.waistPercent,true)
            return this.waistPercent
        },
         getWater : function() {
              this.waterPercent = this.calculatePercentage(this.goalsDetails.waterDrank,this.goalsDetails.waterGoal,this.waterPercent,false)
             return this.waterPercent
        },
    
    },
     methods: {
             getActivitiesDetails(){
                 this.activitiesDetails = this.goalsDetails.activities
             },  
             getActivityNameAndTime(){
                for (const key in this.activitiesDetails) {
                if (this.activitiesDetails.hasOwnProperty(key)) {
                     this.activityName.push(this.activitiesDetails[key].activityName);
                     this.activityTime.push(this.activitiesDetails[key].activityTime);  
                    }
                }
             },
            calculateCalories(){
                 this.activityTime.forEach(element => {
                 this.totalCal = this.totalCal + (element * 170/60) 
             });
              return this.totalCal
            },
            calculatePercentage(current,target,result,isLoseGain){
                if(current > target){
                 if(isLoseGain){
                    result = current > 0 ? Math.round( target / current * 100) : 0 
                 }else{
                     result = 100
                 }   
            }else{
                 result = target > 0 ? Math.round( current /target * 100) : 0
            }
            return result
            }
             
    
    },
    components : {
        UserDashboardHeader,
    }
}
</script>

<style>

</style>
