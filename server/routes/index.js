var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const  Activities  = require('../models/activities')
const { authentication } = require('../config/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'My Planner' });
});

  //Jwt
  function jwtSignUser (user) {
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(user, authentication.jwtSecret, {
      expiresIn: ONE_WEEK
    })
  }
  
  // Register
  router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //Validation Check
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password should contain atleast 6 characters').isLength({ min: 6 });
    
    let errors = req.validationErrors();
  
      if(errors){
          res.locals.user = req.user;
          res.status(403).send({
            error: errors
          })
          
        } 
          else{
            // Check if email already exists
            User.findOne({ email: email }).then(user => {
              if (user) {
                let error = [{param:'email', msg: 'Email already exists',value:'' }];
                res.status(403).send({
                    error: error
                  })
              } 
              else{            
              let newUser = new User({
                name: name,
                email: email,
                password: password,
                additionalInfo: req.body.additionalInfo
              });
  
              bcrypt.genSalt(10, function(err, salt){
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err){
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save(function(err) {
                      if(err){
                          console.log(err);
                      return;
                      } else {
                        const userJson = newUser.toJSON()
                        res.send( {user: userJson , token: jwtSignUser(userJson) , message:"Registered Successfully !!!"});
                      }
                    });
                });  
              });
            }
          });
  
        }
  
      });
  
      //Login
      router.post('/login', (req,res) => {
        const email = req.body.email;
        const password = req.body.password;
  
        req.checkBody('email','Please Enter your Email Id').notEmpty();
        req.checkBody('password','Please Enter your Password').notEmpty();
  
        let errors = req.validationErrors();
  
        if(errors){
          res.status(403).send({
            error: errors
          })
        }
        else{
        User.findOne({
            email: email
          }).then(user => {
            if (!user) {
              let errors = [{param:'email' , msg: 'Specified Email is not registered',value:'' }];
              res.status(403).send({error:errors});
            }

                // Match password
                bcrypt.compare(password, user.password, 
                  (err, isMatch) => {
                  if (err) {
                    console.log(err);
                  } 
                  if (isMatch) {
                    const userJson = user.toJSON()
                     res.status(200).send({
                                user: userJson,
                                token: jwtSignUser(userJson)
                              })
                  } else {
                    let error = [{param:'password' , msg : 'Incorrect Password, Please type correct Password !!!' , value:''}];
                    res.status(403).send( { error: error});
                  }
                });
          });

          }
 
      });

      //Add activities
      router.post('/activities', (req,res) => {
        var activityData = new Activities(req.body);
        activityData.save()
          .then(() => {
            res.status(200).send(activityData);
          })
          .catch(() => {
            res.status(500).send({
                    error: 'An error has occured trying to create the activities'
                  })
          });   
    
      });

      //Get Activities
      router.get('/goals', (req,res) => {
        Activities.find({'bmiData.userId' : req.query.userId }, (err, activities) =>{
          if(err){
            console.log(err);
          }
          else {
            res.send(activities);
          }
        });

      });

       //Delete Activity
      router.delete('/goals', (req,res) => {
        var token = req.headers['authorization'];
        if (token) {
          jwt.verify(token, authentication.jwtSecret, (err) => {
            if (err) {
              res.status(403).send({message: "Access forbidden, wrong token."});
            } else {
              Activities.remove({_id: req.query._id}, (err) =>{
                if(err){
                  console.log(err);
                }
                else {
                  res.json({ message: 'Activity Deleted Successfully' });
                }
              });
            }
          });
        } else {
          res.status(403).send({message: "Access forbidden, no token provided."});
        }  

      });

      //Update User - profile
      router.put('/profile', (req,res) => {
        var token = req.headers['authorization'];
        if (token) {
          jwt.verify(token, authentication.jwtSecret, (err) => {
            if (err) {
              res.status(403).send({message: "Access forbidden, wrong token."});
            } else {
              var profileData = req.body.additionalInfo
              var id = req.body._id
              User.findOneAndUpdate({_id:id} ,{additionalInfo:profileData})
                .then(() => {
                  res.status(200).send({ message: 'Profile updated Successfully' });
                })
                .catch(() => {
                  res.status(500).send({
                          error: 'An error has occured trying to update profile'
                        })
                }); 
            }
          });
        } else {
          res.status(403).send({message: "Access forbidden, no token provided."});
        }  

      });

module.exports = router;