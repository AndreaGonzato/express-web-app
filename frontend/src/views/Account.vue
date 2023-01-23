<template>
  <div class="all">
    <h1>{{ this.username }}</h1>

    <button
      v-if="userLogged.id !== undefined"
      @click.prevent="followHandler"
      class="btn follow"
      v-bind:class="this.followButtonStyle"
    >
      {{ this.followButtonText }}
    </button>

    <UserInfo v-if="loadedUser" v-bind:userObj="this.user" v-bind:show-email="false"></UserInfo>

    <div v-for="tweet in tweets">
      <div class="tweet">
        <TheTweet
          v-bind:content-obj="tweet"
          v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
          v-bind:show-like="true"
          v-bind:show-share="true"
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
import cookieManager from "@/cookieManager.js";

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
      followButtonText: "Follow",
      following: false,
      followButtonStyle: "",
    };
  },
  components: {
    UserInfo,
    TheTweet,
  },
  async created() {
    this.userLogged = await userManager.whoami();

    this.username = this.$route.params.id;

    await this.fetchUserInfo();
    this.loadedUser = true;

    if (this.userLogged.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });

      if (
        this.userLogged.following !== undefined &&
        this.userLogged.following.includes(this.user.id)
      ) {
        // the logged user already follow him
        this.followButtonText = "Unfollow";
        this.followButtonStyle = "btn-dark";
      } else {
        this.followButtonText = "Follow";

        this.followButtonStyle = "btn-primary";
      }
    }

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
    async followHandler() {
      const user = await userManager.whoami();
      if (user.error === undefined) {
        // the user is authenticated

        let jwt = cookieManager.getCookie("jwt");

        // Set the Authorization header of the request
        let headers = new Headers();
        headers.append("Authorization", "Bearer " + jwt);
        headers.append("Content-type", "application/json");

        if (this.followButtonText === "Follow"){
          // Follow the account

          const response = await fetch(
            config.hostname + "/api/social/followers/" + this.user.id,
            {
              method: "POST",
              headers: headers,
              body: JSON.stringify({}),
            }
          );

          // update frontend
          this.followButtonText = "Unfollow";
          this.followButtonStyle = "btn-dark";
        }else{
          // Unfollow the account

          const response = await fetch(
            config.hostname + "/api/social/followers/" + this.user.id,
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
        // user is not authenticated, so go to the login page
        this.$router.push({ name: "Login" });
      }
    },
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
