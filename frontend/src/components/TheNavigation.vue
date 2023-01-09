<template>
    <img src="../../public/images/expressLogoLow.jpg" id="logoID"/>

  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/about">About</router-link>
  </div>

</template>

<script>
  export default {
    name: 'TheNavigation',
  }

</script>

<style scoped>

#nav{
    padding: 0.5rem;
}


#logoID{
    height: 50px;
    width: 50px;
}


</style>