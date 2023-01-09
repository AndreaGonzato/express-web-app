<template>

    <div class="wrapper">

        <div class="logo">
            <img src="/images/expressLogoLow.jpg" alt="logo"/>
        </div>

        <div class="nav">
            <span>
                <router-link to="/">Home</router-link>
            </span>
            
            <span>
                <router-link to="/login">Login</router-link>
            </span>

            <span>
                <router-link to="/about">About</router-link>
            </span>

        </div>

    </div>

</template>

<script>
  export default {
    name: 'TheNavigation',
  }

</script>

<style scoped>



img{
    height: 60px;
    width: 60px;
}

span{
    margin-left: 2em;
}

.logo{
    text-align: center;
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