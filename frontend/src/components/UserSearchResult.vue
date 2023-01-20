<template>
  <div class="all">
    <div class="container">
      <div class="row">
        <div class="col-sm first-col">
          <router-link v-bind:to="'/account/' + this.userObj.username"
            >@{{ this.userObj.username }}</router-link
          >
        </div>
        <div class="col-sm">{{ this.fulName }}</div>
        <div class="col-sm">
          <button @click.prevent="follow" class="btn btn-primary">
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import config from "@/config.js";
import cookieManager from "@/cookieManager.js";

export default {
  name: "UserSearchResult",
  props: {
    userObj: Object,
  },
  computed: {
    getName() {
      return (
        this.userObj.name.charAt(0).toUpperCase() +
        this.userObj.name.substring(1)
      );
    },
    getSurname() {
      return (
        this.userObj.surname.charAt(0).toUpperCase() +
        this.userObj.surname.substring(1)
      );
    },
    fulName() {
      return this.getName + " " + this.getSurname;
    },
  },
  methods: {
    async follow() {
      const user = await userManager.whoami();
      if (user.error === undefined) {
        // the user is authenticated
        let jwt = cookieManager.getCookie("jwt");

        // Set the Authorization header of the request
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + jwt);
        headers.append("Content-type", "application/json");

        const response = await fetch(
          config.hostname + "/api/social/followers/" + this.userObj.id,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({}),
          }
        );
        //const result = await response.json();

      } else {
        // user is not authenticated
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style scoped>
button {
  margin-top: 0.2em;
  margin-bottom: 0.2em;
}
.container {
  max-width: 500px;
  text-align: left;
}

.first-col {
  text-align: left;
}
</style>
