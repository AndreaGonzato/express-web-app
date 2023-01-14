<template>
  <div class="all">
    <h1>Feed</h1>

    <div v-if="this.loadUserObj" class="welcome">
      welcome back {{ this.userObj.username }}!
    </div>

    <hr/>

    <div v-for="content in contents">
      <div class="content">
        <TheTweet
          v-bind:content-obj="content"
          v-bind:likes-number="content.likes ? content.likes.length : 0"
          @like="handleLike"
        ></TheTweet>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";
import config from "@/config.js";
import TheTweet from "../components/TheTweet.vue";

export default {
  name: "Feed",
  data() {
    return {
      contents: [{}],
      userObj: Object,
      loadUserObj: false,
    };
  },
  components: {
    TheTweet,
  },
  async created() {
    // tell the app to show account in the nav menu and remove login and signin
    this.$emit("message", { userLogged: true });

    const user = await userManager.whoami();
    this.userObj = user;
    this.loadUserObj = true;

    await this.fetchFeedContents();
  },
  methods: {
    async fetchFeedContents() {
      var jwt = cookieManager.getCookie("jwt");

      // Set the Authorization header of the request
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);
      headers.append("Content-type", "application/json");
      const resultJSON = await fetch(config.hostname + "/api/social/feed", {
        method: "GET",
        headers: headers,
      });

      const contents = await resultJSON.json();
      this.contents = contents.messages;
    },
    handleLike(message) {
      const content = this.contents.find((el) => el.id === message.contentId);
      const action = message.action;

      const userID = this.userObj.id;

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
    }
  },
};
</script>

<style scoped>
hr {
  max-width: 400px;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
}
.all {
  text-align: center;
}
.welcome {
  margin-bottom: 2em;
}
</style>
