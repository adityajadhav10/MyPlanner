<template>
<div>
  
     <div class="hero is-primary">
        <div class="hero-body">
        
            <div class="columns is-family-sans-serif is-capitalized is-italic is-family-sans-serif has-text-weight-bold is-size-2-desktop is-size-2-tablet is-size-2-mobile">
                <div class="column is-narrow">
                   <icon name="map" scale='3' class="has-text-white"></icon>
                </div>
            
            
                <div class="column has-text-centered">
              {{ title }}
                </div>
            </div>
        </div>
     </div>
 
    <div class="notification is-warning" v-for="error in error" :key="error.param" :value="error.param" v-bind:class="{ 'is-hidden' : success }">
        {{ error.msg }}
      <button class="delete" @click="deleteNotification()"></button>
    </div>
    
    <div class="notification is-success" v-if="successMsg">
    {{successMsg}}
    </div>
      <!-- Login Form -->
    <form autocomplete="off">
        <div class="hero">
          <div class="hero-body">
            <div class="columns is-vcentered has-addons-centered is-centered">
                <div class="column is-centered has-background-light is-two-fifths ">
                
                    <div class="field">
                    <label class="label">Email</label>
                    <div class="control has-icons-left has-icons-right">
                            <input class="input" type="email" v-model="email" id="email" name="email" placeholder="Ex. hello@gmail.com">
                            <span class="icon is-small is-left">
                            <icon name="envelope"></icon>
                            </span>
                    </div>
                    </div>

                    <div class="field">
                    <label class="label">Password</label>
                    <div class="control has-icons-left has-icons-right">
                            <input class="input is-success" type="password" v-model="password" id="password" name="password" placeholder="Enter your password">
                            <span class="icon is-small is-left">
                            <icon name="key"></icon>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
          </div>

        <div class="hero-foot">
            <div class="columns is-two-fifths is-centered is-vcentered">

                <div class="column is-two-fifths has-background-light">

                    <div class="level">
                        <div class="level-item level-left">
                                  <v-btn  class="has-text-primary"
                                          @click="login"
                                         outline round large>
                                        Login
                                    </v-btn>
                        </div>
                        <div class="level-item level-right">
                                    <v-btn  class="has-text-danger "
                                        :to="{
                                        name: 'Landing'
                                        }" outline round large>
                                        Cancel
                                    </v-btn>
                        </div>
                    </div>

                </div>

            </div>

            <nav class="is-size-5  has-text-white has-text-centered is-italic has-text-weight-semibold"></nav>

        </div>

        </div>
    </form>
    



</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationServices'
export default {
  name: 'Login',
  data () {
    return {
      title: 'Login',
      email: '',
      password: '',
      error: '',
      success:false,
      successMsg:this.$route.params.message
    }
  },
  methods: {

    async login (){
         

          try {
             const response = await AuthenticationService.login({
             email: this.email,
             password: this.password
        })
        
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)

        this.$router.push({
          name: 'UserDashboard'
        })

      }
      
      catch (error) {
            this.error = error.response.data.error
            this.success = false
        }
      },

      deleteNotification(){
          this.success = !this.success;
      }

  }



  
}
</script>

<style>

</style>
