<template>
<div>
 <div class="hero is-variable">
      <div class="hero-body is-family-sans-serif is-capitalized is-italic is-family-sans-serif has-text-weight-bold  is-size-2-desktop is-size-2-mobile is-size-2-tablet has-text-centered">
       <icon name="map" scale='3' class="has-text-primary"></icon>
        {{ title }}
      </div>
  </div>

   <section class="hero has-background-light">
     <div class="hero-body">
       <div class="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhds">
        <div class="column">
            <div class="notification is-size-4 is-primary">
                  <div class="column has-text-centered">Already have an account ?</div>
          
                  <div class="column is-size-2 has-text-centered"> 
                    <icon name="user-check" scale='12'></icon>
                    </div>
      
                  <div class="column has-text-centered">
                      <v-btn flat dark :to="{
                        name: 'Login'
                        }" outline round large>
                    Login
                   </v-btn>
                  
                    </div>
                </div>
        </div>

        <div class="column">
                <div class="notification is-size-4 is-primary">
                    <div class="column has-text-centered"> New User ?</div>

                    <div class="column is-size-2 has-text-centered">
                        <icon name="user-plus" scale='12'></icon>
                    </div>

                    <div class="column has-text-centered">
                      <v-btn flat :to="{
                        name: 'Register'
                        }" outline round large>
                       Register
                    </v-btn>
                      </div>
                  </div>

          </div>

       </div>
     </div>
   </section>
   <br> <br>
   <div>
    <v-footer class="pa-3 teal darken-2 has-text-white">
      SAD-TEAM
    <v-spacer></v-spacer>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
   </div>
</div>

</template>

<script>
export default {
  name: 'Landing',
  data () {
    return {
      title: 'My Planner'
    }
  }
}
</script>

<style scoped>
</style>
