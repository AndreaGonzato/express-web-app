<template>
  <div class="wrapper">
    <div class="logo">
      <router-link to="/"
        ><img src="/images/logo.png" alt="logo"
      /></router-link>
    </div>

    <div class="search">
      <input type="text" placeholder="username" class="form-control"  @keyup.enter="handleSearch"  v-model="searchText"/>
    </div>

    <div class="nav">
      <span>
        <router-link to="/" @click.prevent="removeSearchText">Home</router-link>
      </span>

      <span v-if="!userLogged">
        <router-link to="/signup" @click.prevent="removeSearchText">Signup</router-link>
      </span>

      <span v-if="!userLogged">
        <router-link to="/login" @click.prevent="removeSearchText">Login</router-link>
      </span>

      <span v-if="userLogged">
        <router-link to="/feed" @click.prevent="removeSearchText">Feed</router-link>
      </span>

      <span v-if="userLogged">
        <router-link to="/account/me" @click.prevent="removeSearchText">Account</router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
  props: {
    userLogged: Boolean,
  },
  data(){
    return {
      searchText : ''
    }
  },
  methods: {
    handleSearch(){
      if(this.searchText.length <= 0){
        return
      }
      this.$router.push({
          name: "Search",
          params: { query: this.searchText },
        });
    },
    removeSearchText(){
      this.searchText = '';
    }
  }
};
</script>

<style scoped>
input{
  background-color: white;
  margin: auto;
  margin-top: 0.3em;
  max-width: 250px;
}

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
  margin-left: 200px;
}

.search{
  text-align: center;
}

.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1.5fr;
  color: black;
}

.nav {
  padding: 0.5rem;
  text-align: center;
}
</style>
