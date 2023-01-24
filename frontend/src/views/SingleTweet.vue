<template>
  <div class="all">
    <h1>Express</h1>
    <div v-if="fetchedTweet" class="tweet">
      <TheTweet
        v-bind:content-obj="tweet"
        v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
        v-bind:user-id="loggedUser.id"
        v-bind:show-like="true"
        v-bind:show-share="false"
        @like="handleLike"
      >
      </TheTweet>
    </div>

    <div class="share-url">
      <p>Want to share this Express copy and paste this link:</p>

      <form>
        <div>
          <input
            type="text"
            id="url"
            ref="code"
            :value="url"
            size="30"
            readonly
          />
          <button
            type="button"
            class="btn btn-primary copy-btn"
            @click.prevent="copyUrl"
          >
            Copy
          </button>
        </div>
      </form>
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
      url: String,
    };
  },
  async created() {
    this.$emit("active", { page: 'NoPage' });
    this.url = config.domain + this.$route.path;

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
    copyUrl() {
      let element = this.$refs.code.select();
      document.execCommand("copy");

      /*
      let url = document.getElementById("url");
      url.select();
      document.execCommand("copy");
      */
    },
  },
};
</script>

<style scoped>
input {
  border: 1px solid #ccc;
  padding: 5px;
  background-color: white;
  color: black;
}

h1 {
  margin-top: 1em;
}

p {
  margin-top: 8em;
}
.all {
  text-align: center;
}

.tweet {
  margin-top: 3em;
}

</style>
