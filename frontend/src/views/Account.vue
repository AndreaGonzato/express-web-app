<template>
  <div class="all">
    <h1>{{ this.username }}</h1>

    <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

    <div v-for="tweet in tweets">
      <div class="tweet">
        <TheTweet
          v-bind:content-obj="tweet"
          v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
          v-bind:show-like="true"
          @like="handleLike"
        ></TheTweet>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config.js";
import UserInfo from "../components/UserInfo.vue";
import TheTweet from "../components/TheTweet.vue";
import userManager from "@/userManager.js";

export default {
  name: "Account",
  data() {
    return {
      username: "",
      user: Object,
      tweets: [{}],
      loadedUser: false,
      loadedMessages: false,
    };
  },
  components: {
    UserInfo,
    TheTweet,
  },
  async created() {
    const userLogged = await userManager.whoami();
    if (userLogged.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
    }

    this.username = this.$route.params.id;

    await this.fetchUserInfo();
    this.loadedUser = true;

    await this.fetchMessages();
    this.loadedMessages = true;
  },
  methods: {
    async fetchUserInfo() {
      const resultJSON = await fetch(
        config.hostname + `/api/users/${this.username}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      this.user = await resultJSON.json();
    },
    async fetchMessages() {
      const resultJSON = await fetch(
        config.hostname + `/api/social/messages/${this.user.id}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      this.tweets = await resultJSON.json();
    },
    handleLike() {
      console.log("TO IMPLEMENT");
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

hr {
  max-width: 400px;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
}
</style>
