<template>
  <div class="wrapper">
    <div class="logo">
      <router-link to="/"
        ><img src="/images/logo.png" alt="logo"
      /></router-link>
    </div>

    <div class="search">
      <input
        type="text"
        placeholder="username"
        class="form-control"
        @keyup.enter="handleSearch"
        v-model="searchText"
      />
    </div>

    <div class="all-nav">
      <div class="nav topnav">
        <span>
          <router-link to="/" @click.prevent="removeSearchText" v-bind:class="this.activePage === 'Home'? 'nav-item active' : ''"
            >Home</router-link
          >
        </span>

        <span v-if="!userLogged">
          <router-link to="/signup" @click.prevent="removeSearchText" v-bind:class="this.activePage === 'Signup'? 'nav-item active' : ''"
            >Signup</router-link
          >
        </span>

        <span v-if="!userLogged">
          <router-link to="/login" @click.prevent="removeSearchText" v-bind:class="this.activePage === 'Login'? 'nav-item active' : ''"
            >Login</router-link
          >
        </span>

        <span v-if="userLogged">
          <router-link to="/feed" @click.prevent="removeSearchText" v-bind:class="this.activePage === 'Feed'? 'nav-item active' : ''"
            >Feed</router-link
          >
        </span>

        <span v-if="userLogged">
          <router-link to="/account/me" @click.prevent="removeSearchText" v-bind:class="this.activePage === 'MyAccount'? 'nav-item active' : ''"
            >Account</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
  props: {
    userLogged: Boolean, 
    activePage : String
  },
  data() {
    return {
      searchText: "",
    };
  },
  methods: {
    handleSearch() {
      if (this.searchText.length <= 0) {
        return;
      }
      this.$router.push({
        name: "Search",
        params: { query: this.searchText },
      });
    },
    removeSearchText() {
      this.searchText = "";
    },
  },
};
</script>

<style scoped>
input {
  background-color: white;
  margin: auto;
  margin-top: 0.3em;
  max-width: 250px;
}

img {
  height: 50px;
  width: 50px;
  margin-top: 10%;
}

span {
  margin-left: 2em;
}

.logo {
  display: grid;
  place-content: center right;
  text-align: center;
  margin-left: 200px;
}

.search {
  display: grid;
  text-align: center;
  place-content: center;
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

.all-nav{
  display: grid;
  place-content: center start;

}

/*
.active-page{
  background-color: $blue-300;
  font-size: large;
  font-weight: bold;
}
*/

.topnav {
  overflow: hidden;
}

.topnav a.active {
  border-bottom: 3px solid #646cff;
}

.topnav a:hover {
  border-bottom: 3px solid #646cff;
}


</style>
