<template>
  <div class="all">
    <h1>Account</h1>

    <div class="subMenu">
      <button @click.prevent="loadYourMessages" class="btn btn-secondary">
        Your Express
      </button>
      <button @click.prevent="loadSettings" class="btn btn-secondary">
        Settings
      </button>
    </div>

    <div class="settings" v-if="this.showSettings">
      <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

      <button @click.prevent="logout" class="btn btn-danger">Log out</button>
    </div>


    <div v-if="loadedUser" v-for="tweet in tweets" class="user-messages">
      <div class="tweet">
        <TheTweet
          v-bind:content-obj="tweet"
          v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
          v-bind:show-like=false
        ></TheTweet>

        <hr/>
      </div>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";
import UserInfo from "../components/UserInfo.vue";
import TheTweet from "../components/TheTweet.vue";
import config from "@/config.js"

export default {
  name: "MyAccount",
  data() {
    return {
      user: Object,
      loadedUser: false,
      showSettings: false,
      tweets : [{}]
    };
  },
  components: {
    UserInfo, TheTweet
  },
  async created() {
    // tell the app to show account in the nav menu and remove login and signin
    this.$emit("message", { userLogged: true });

    this.user = await userManager.whoami();
    this.loadedUser = true;
    this.loadYourMessages();
  },
  methods: {
    logout() {
      this.$emit("message", { userLogged: false });
      cookieManager.removeJwtCookie();
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
      console.log(this.tweets)
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

.user-messages{
  margin-top: 2em;
}
</style>
