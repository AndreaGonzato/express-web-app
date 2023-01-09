<template>
  <TheNavigation></TheNavigation>

  <div class="container">
    <routerView></routerView>
  </div>

</template>


<script>

  import TheNavigation from './components/TheNavigation.vue';

  export default{
    components : {TheNavigation}
  }
</script>


<style scoped>

</style>
