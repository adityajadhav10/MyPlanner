<template>
<div>
  <user-dashboard-header />
   <user-dashboard-content />     
</div>
</template>

<script>
import UserDashboardHeader from '@/components/UserDashboard/UserDashboardHeader.vue';
import UserDashboardContent from '@/components/UserDashboard/UserDashboardContent.vue';
export default {
  name: 'UserDashboard',
  data () {
    return {
      title: 'Welcome'
    }
  },
  methods : {
  },
  components : {
    UserDashboardHeader,
    UserDashboardContent
  }
}
</script>

<style>
</style>
