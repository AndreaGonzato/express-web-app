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
          <button
            @click.prevent="followHandler"
            class="btn"
            v-bind:class="this.followButtonStyle"
          >
            {{ followButtonText }}
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
  data() {
    return {
      loggedUser: Object,
      followButtonText: "Follow",
      followButtonStyle: "btn-primary",
    };
  },
  props: {
    userObj: Object,
  },
  async created() {
    this.loggedUser = await userManager.whoami();
    if (this.loggedUser.error === undefined) {
      // the user is authenticated

      if (
        this.loggedUser.following !== undefined &&
        this.loggedUser.following.includes(parseInt(this.userObj.id))
      ) {
        // the logged user already follow this account
        this.followButtonText = "Unfollow";
        this.followButtonStyle = "btn-dark";
      } else {
        this.followButtonText = "Follow";
        this.followButtonStyle = "btn-primary";
      }
    }
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
    async followHandler() {
      if (this.loggedUser.error === undefined) {
        // the user is authenticated

        let jwt = cookieManager.getCookie("jwt");

        // Set the Authorization header of the request
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + jwt);
        headers.append("Content-type", "application/json");

        if (this.followButtonText === "Follow") {
          // follow this account

          const response = await fetch(
            config.hostname + "/api/social/followers/" + this.userObj.id,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({}),
            }
          );
          this.followButtonText = "Unfollow";
          this.followButtonStyle = "btn-dark";
        } else {
          // remove the follow from this account

          const response = await fetch(
            config.hostname + "/api/social/followers/" + this.userObj.id,
            {
              method: "DELETE",
              headers: headers,
              body: JSON.stringify({}),
            }
          );
          this.followButtonText = "Follow";
          this.followButtonStyle = "btn-primary";
        }

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
  width: 100px;
}
.container {
  max-width: 500px;
  text-align: left;
}

.first-col {
  text-align: left;
}
</style>
