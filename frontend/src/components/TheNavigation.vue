<template>
  <div class="wrapper">
    <div class="logo">
      <router-link to="/"
        ><img src="/images/logo.png" alt="logo"
      /></router-link>
    </div>

    <div class="nav">
      <span>
        <router-link to="/">Home</router-link>
      </span>

      <span>
        <router-link to="/signup">Signup</router-link>
      </span>

      <span>
        <router-link to="/login">Login</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
};
</script>

<style scoped>
img {
  height: 50px;
  width: 50px;
  margin-top: 1%;
}

span {
  margin-left: 2em;
}

.logo {
  text-align: center;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  color: black;
}

.nav {
  padding: 0.5rem;
  text-align: center;
}
</style>
