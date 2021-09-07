<template>
 <div>
   <user-dashboard-header />
    <profile-content />
</div> 
</template>

<script>
import UserDashboardHeader from '@/components/UserDashboard/UserDashboardHeader';
import ProfileContent from '@/components/Profile/ProfileContent';
export default {
  name: 'Profile',
  data () {
    return {
      title: 'Profile'
    }
  },
  components : {
    UserDashboardHeader,
    ProfileContent
  }
}
</script>

<style> 
</style>
