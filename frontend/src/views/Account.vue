<template>
  <div class="all">
    <h1>{{ this.username }}</h1>

    <button v-if="userLogged.id !== undefined" @click.prevent="follow" class="btn btn-primary follow">
      Follow
    </button>

    <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

    <div v-for="tweet in tweets">
      <div class="tweet">
        <TheTweet
          v-bind:content-obj="tweet"
          v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
          v-bind:show-like="this.userLogged.name === undefined ? false : true"
          v-bind:user-id="userLogged.id"
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
import cookieManager from "@/cookieManager.js"

export default {
  name: "Account",
  data() {
    return {
      username: "",
      user: Object,
      userLogged: Object,
      tweets: [],
      loadedUser: false,
      loadedMessages: false,
    };
  },
  components: {
    UserInfo,
    TheTweet,
  },
  async created() {
    this.userLogged = await userManager.whoami();

    if (this.userLogged.name === undefined) {
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
    handleLike(message) {
      const content = this.tweets.find((el) => el.id === message.contentId);
      const action = message.action;

      const userID = this.userLogged.id;

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
    async follow(){
      const user = await userManager.whoami();
      if (user.error === undefined) {
        // the user is authenticated
        let jwt = cookieManager.getCookie("jwt");

        // Set the Authorization header of the request
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + jwt);
        headers.append("Content-type", "application/json");

        const response = await fetch(
          config.hostname + "/api/social/followers/" + this.user.id,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify({}),
          }
        );

        const result = await response.json();
        console.log(result);

      } else {
        // user is not authenticated
        this.$router.push({ name: "Login" });
      }
    }
  },
};
</script>

<style scoped>
h1 {
  margin-top: 0.5em;
}

.all {
  text-align: center;
}

hr {
  max-width: 400px;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
}

.follow {
  margin-top: 0.5em;
}
</style>
