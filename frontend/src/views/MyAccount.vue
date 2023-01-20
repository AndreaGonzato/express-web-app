<template>
  <div class="all">
    <h1>Account</h1>

    <div class="subMenu">
      <button @click.prevent="loadYourMessages" class="btn btn-secondary">
        Your Expresses
      </button>
      <button @click.prevent="loadSettings" class="btn btn-secondary">
        Settings
      </button>
    </div>

    <div v-if="loadedUser">
      <div class="settings" v-if="this.showSettings">
        <UserInfo v-bind:userObj="this.user"></UserInfo>

        <button @click.prevent="logout" class="btn btn-danger">Log out</button>
      </div>

      <div
        v-if="!this.showSettings"
        v-for="tweet in tweets"
        class="user-messages"
      >
        <div class="tweet">
          <TheTweet
            v-bind:content-obj="tweet"
            v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
            v-bind:user-id="this.user.id"
            v-bind:show-like="true"
          ></TheTweet>

          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";
import UserInfo from "../components/UserInfo.vue";
import TheTweet from "../components/TheTweet.vue";
import config from "@/config.js";

export default {
  name: "MyAccount",
  data() {
    return {
      user: Object,
      loadedUser: false,
      showSettings: false,
      tweets: [{}],
    };
  },
  components: {
    UserInfo,
    TheTweet,
  },
  async created() {
    this.user = await userManager.whoami();

    if (this.user.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
      this.$router.push({
        name: "Error",
        params: { message: "can not access this page" },
      });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
      this.loadedUser = true;
      this.loadYourMessages();
    }
  },
  methods: {
    async logout() {
      // update frontend
      this.$emit("message", { userLogged: false });

      const response = await fetch(config.hostname + "/api/auth/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      cookieManager.setJwtCookie(result.token);

      // go the the Home page
      this.$router.push({ name: "Home" });
    },
    loadSettings() {
      this.showSettings = true;
    },
    loadYourMessages() {
      this.showSettings = false;
      this.fetchYourTweets();
    },
    async fetchYourTweets() {
      const resultJSON = await fetch(
        config.hostname + `/api/social/messages/${this.user.id}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      this.tweets = await resultJSON.json();
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

.subMenu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 400px;
  margin: auto;
  grid-gap: 3em;
  margin-top: 2em;
}

.user-messages {
  margin-top: 2em;
}
</style>
