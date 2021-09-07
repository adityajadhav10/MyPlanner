const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({
  bmiData: {
            userId:{
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
              },
            caloriesBurnGoal:{
                type: Number,
                required: true
            },
            currentWeight:{
                type: Number,
                required: true
            },
            height:{
                type: Number,
                required: true
            },
            targetedWaistSize:{
                type: Number,
                required: true
            },
            targetedWeight:{
                type: Number,
                required: true
            },
            waistSize:{
                type: Number,
                required: true
            },

            waterDrank:{
                type: Number,
                required: true
            },
            waterGoal:{
                type: Number,
                required: true
            },
            activities:[ {
                activityName:{
                     type: String,
                     required: true
                },
                activityTime:{
                    type: Number,
                    required: true
                }
              }],
          
  }
});
const Activities = module.exports = mongoose.model('Activities', ActivitiesSchema);