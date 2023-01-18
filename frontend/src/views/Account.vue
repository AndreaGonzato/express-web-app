<template>
  <div class="all">
    <h1>Account</h1>

    <div class="container text-center info">
      <div class="row align-items-start">
        <div class="col data-type">Name:</div>
        <div class="col data">{{ getName }}</div>
      </div>
      <div class="row align-items-start">
        <div class="col data-type">Surname:</div>
        <div class="col data">{{ getSurname }}</div>
      </div>
      <div class="row align-items-start">
        <div class="col data-type">Username:</div>
        <div class="col data">{{ this.username }}</div>
      </div>
      <div class="row align-items-start">
        <div class="col data-type">Email:</div>
        <div class="col data">{{ this.email }}</div>
      </div>
      <div class="row align-items-start">
        <div class="col data-type">Bio:</div>
        <div class="col data">{{ this.bio }}</div>
      </div>
    </div>

    <button @click.prevent="logout" class="btn btn-danger">Log out</button>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";

export default {
  name: "Account",
  data() {
    return {
      name: "",
      surname: "",
      username: "",
      email: "",
      bio: "",
    };
  },
  async created() {
    // tell the app to show account in the nav menu and remove login and signin
    this.$emit("message", { userLogged: true });
    
    const user = await userManager.whoami();
    this.name = user.name;
    this.surname = user.surname;
    this.username = user.username;
    this.email = user.email;
    this.bio = user.bio;
  },
  computed: {
    getName() {
      return this.name.charAt(0).toUpperCase() + this.name.substring(1);
    },
    getSurname() {
      return this.surname.charAt(0).toUpperCase() + this.surname.substring(1);
    },
  },
  methods: {
    logout() {
      this.$emit("message", { userLogged: false });
      cookieManager.removeJwtCookie();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

.info {
  max-width: 800px;
  margin-top: 5em;
  margin-bottom: 5em;
  display: grid;
}
.data-type {
  text-align: right;
}
.data {
  text-align: left;
}
</style>
