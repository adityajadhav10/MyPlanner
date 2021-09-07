<template>
    <router-view/>
</template>

<script>
export default {
}
</script>

<style lang="css">
 @import '../node_modules/bulma/css/bulma.min.css';

.notification , template ,div {
  animation-name: fadein;
  animation-duration: 0.5s;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>