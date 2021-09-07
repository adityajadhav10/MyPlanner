<template>
   <v-toolbar fixed class="teal accent-4" dark app>
    <v-toolbar-title class="mr-4">
                        <icon name="map" scale="2"></icon>&nbsp;My Planner                       
    </v-toolbar-title>

    <v-toolbar-items>
      <v-btn 
      v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'UserDashboard'
        }">
        Home
      </v-btn>
    </v-toolbar-items>

    <v-spacer></v-spacer>

    <v-toolbar-items>
     <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'Login'
        }">
        Login
      </v-btn>
      
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        :to="{
          name: 'Register'
        }">
        Register
      </v-btn>
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        @click="logout">
        Log Out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar> 
</template>

<script>
export default {
 methods : {
    logout(){
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$router.push({
          name:'Login'
        })
  
    }
 }
}
</script>

<style>
</style>
