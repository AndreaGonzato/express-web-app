<template>
  <div class="all">
    <h1>Feed</h1>

    <div v-if="this.loadUserObj" class="welcome">
      welcome back {{ this.userObj.username }}!
    </div>

    <div v-for="content in contents">
      <div class="content">

        <TheTweet v-bind:content-obj="content" ></TheTweet>

        <hr/>
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
      userObj : Object,
      showID: false,
    };
  },
  components:{
    TheTweet
  },
  async created() {
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
  },
};
</script>

<style scoped>
hr{
    max-width: 400px;
    margin: auto;
}
.all {
  text-align: center;
}
.welcome{
    margin-bottom: 2em;
}
</style>
