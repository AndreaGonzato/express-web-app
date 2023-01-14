<template>
  <div class="all">
    <p>@{{ contentObj.author_username }}</p>
    <p>{{ contentObj.text }}</p>

    <!-- like button-->
    <span class="like">
      <button class="btn btn-success" @click.prevent="clickOnLike">
        <i class="fa-thumbs-up" :class="likeStyle"></i> Like
        {{ this.likesNumber }}
      </button>
    </span>
  </div>
</template>

<script>
import config from "@/config.js";
import cookieManager from "@/cookieManager.js";

export default {
  name: "TheTweet",
  props: {
    contentObj: Object,
    likesNumber: Number,
    userId : Number
  },
  data(){
    return {
        likeStyle: 'fa-regular',
        liked: false
    }
  },
  methods:{
    clickOnLike(){
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
        config.hostname + "/api/social/like/"+ this.contentObj.id,
        {
          method: "POST",
          headers,
          body: JSON.stringify({}),
        }
      );

      //const obj = await postRequest.json();
    }
  }
};
</script>
