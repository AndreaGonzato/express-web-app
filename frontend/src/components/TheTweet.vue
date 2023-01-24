<template>
  <div class="all">
    <div>
      <router-link v-bind:to="`/account/` + this.contentObj.author_username"
        >@{{ contentObj.author_username }}</router-link
      >
      <span class="when">{{ getDate }}</span>
    </div>

    <p>{{ contentObj.text }}</p>

    
    <span class="like" v-if="showLike">
      <!-- like button-->
      <button class="btn btn-success" @click.prevent="clickOnLike">
        <i class="fa-thumbs-up" :class="likeStyle"></i> Like
        {{ this.likesNumber }}
      </button>
    </span>
    <span class="share" v-if="showShare">
      <button class="btn btn-secondary" @click.prevent="clickOnShare">
        <i class="fa-solid fa-share"></i>
        Share
      </button>
    </span>

  </div>
</template>

<script>
import config from "@/config.js";
import cookieManager from "@/cookieManager.js";
import userManager from "@/userManager.js"

export default {
  name: "TheTweet",
  props: {
    contentObj: Object,
    likesNumber: Number,
    userId: Number,
    showLike : Boolean,
    showShare : true
  },
  data() {
    return {
      likeStyle: "fa-regular",
      liked: false,
    };
  },
  created() {
    if (
      this.contentObj.likes !== undefined &&
      this.contentObj.likes.includes(this.userId)
    ) {
      // you put like in a previous session
      this.likeStyle = "fa-solid";
      this.liked = true;
    }
  },
  computed: {
    getDate() {
      let fullDate = this.contentObj.created_at;
      if (fullDate !== undefined) {
        let date = fullDate.substring(0, 10);

        let time = fullDate.match(/T(.*)Z/)[1];

        time = time.substring(0, time.length - 7);

        return date + " " + time;
      }
      return "time";
    },
  },
  methods: {
    async clickOnLike() {
      const loggedUser = await userManager.whoami();
      if(loggedUser.name === undefined){
        // user is not logged in
        this.$router.push({ name: "Login" });
        return;
      }


      if (this.contentObj.likes === undefined) {
        // add the first like to this content
        this.contentObj.likes = [];
        this.postLike();
      } else {
        if (this.contentObj.likes.includes(this.userId)) {
          // user already put a like to this content -> you want to remove it
          this.removeLike();
        } else {
          // add a like
          this.postLike();
        }
      }
    },
    async postLike() {
      // update frontend
      this.$emit("like", { contentId: this.contentObj.id, action: "add" });
      this.likeStyle = "fa-solid";
      this.liked = true;

      // I'm going to update the backend now

      var jwt = cookieManager.getCookie("jwt");
      // Set the Authorization header of the request
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);
      headers.append("Content-type", "application/json");

      const postRequest = await fetch(
        config.hostname + "/api/social/like/" + this.contentObj.id,
        {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        }
      );

      //const obj = await postRequest.json();
    },
    async removeLike() {
      // update frontend
      this.$emit("like", { contentId: this.contentObj.id, action: "remove" });
      this.likeStyle = "fa-regular";
      this.liked = false;

      // I'm going to update the backend now

      // require jwt token
      var jwt = cookieManager.getCookie("jwt");
      // Set the Authorization header of the request
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);
      headers.append("Content-type", "application/json");

      const postRequest = await fetch(
        config.hostname + "/api/social/like/" + this.contentObj.id,
        {
          method: "DELETE",
          headers,
          body: JSON.stringify({}),
        }
      );

      //const obj = await postRequest.json();
    },
    clickOnShare(){
      this.$router.push({ name: "SingleTweet",
      params: { id: this.contentObj.id }, });
    }
  },
};
</script>

<style scoped>

.when{
  margin-left: 3em;
  font-size: x-small;
}

.share{
  margin-left: 1em;
}
</style>
