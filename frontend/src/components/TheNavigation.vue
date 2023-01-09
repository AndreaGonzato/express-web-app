<template>

    <div class="wrapper">

        <div class="logo">
            <img src="/images/expressLogoLow.jpg" alt="logo"/>
        </div>

        <div class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/login">Login</router-link>
            <router-link to="/about">About</router-link>
        </div>

    </div>

</template>

<script>
  export default {
    name: 'TheNavigation',
  }

</script>

<style scoped>

.logo{
    text-align: center;
}

img{
    height: 60px;
    width: 60px;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  color: black;
}


.nav{
    padding: 0.5rem;
    text-align: center;
}



</style>