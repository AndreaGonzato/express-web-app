<template>
  <div class="all">
    <h1>the tweet</h1>
    <div v-if="fetchedTweet">
      <TheTweet
        v-bind:content-obj="tweet"
        v-bind:likes-number="fetchedTweet.likes ? fetchedTweet.likes.length : 0"
        v-bind:user-id="loggedUser.id"
        v-bind:show-like="true"
        @like="handleLike"
      >
      </TheTweet>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import TheTweet from "../components/TheTweet.vue";
import config from "@/config.js";

export default {
  name: "SingleTweet",
  components: {
    TheTweet,
  },
  data() {
    return {
      fetchedTweet: false,
      tweet: Object,
      loggedUser: Object,
    };
  },
  async created() {
    this.loggedUser = await userManager.whoami();
    const tweetId = this.$route.params.id;

    if (this.loggedUser.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
    }

    // fetch the tweet
    const response = await fetch(
      config.hostname + "/api/social/tweets/" + tweetId,
      {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }
    );

    this.tweet = await response.json();
    this.fetchedTweet = true;
  },
  methods: {
    handleLike(message) {
      const content = this.tweet;
      const action = message.action;

      const userID = this.loggedUser.id;

      if (action === "remove") {
        // remove a like
        for (let i = 0; i < content.likes.length; i++) {
          if (content.likes[i] === userID) {
            content.likes.splice(i, 1);
            break;
          }
        }
      }

      if (action === "add") {
        // add a like
        if (content.likes === undefined) {
          content.likes = [userID];
        } else {
          content.likes.push(userID);
        }
      }
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}
</style>
