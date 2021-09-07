import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Register from '@/components/Register'
import UserDashboard from '@/components/UserDashboard/UserDashboard'
import Profile from '@/components/Profile/Profile'
import Activities from '@/components/Activities/Activities'
import Goals from '@/components/Goals/Goals'
import GoalsDetails from '@/components/Goals/GoalsDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      
    },
    {
      path: '/userdashboard',
      name: 'UserDashboard',
      component: UserDashboard,
     
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/activities',
      name: 'Activities',
      component: Activities
    },
    {
      path: '/goals',
      name: 'Goals',
      component: Goals
    },
    {
      path: '/goalsdetails',
      name: 'GoalsDetails',
      component: GoalsDetails
    },
    {
      path: '*',
      redirect:{name:'Landing'}
    }

  ]
})
