<template>
  <div class="all">
    <div class="mb-3" v-if="!this.posted">
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="this.text"
      ></textarea>
      <button @click.prevent="postExpress" class="btn btn-primary post-btn">Post</button>
    </div>


    <p v-if="this.posted">You added a new Express!</p>
  </div>
</template>

<script>
import config from "@/config.js";
import cookieManager from "@/cookieManager.js";

export default {
  name: "PostNewExpress",
  data() {
    return {
      text: "",
      posted : false
    };
  },
  methods: {
    async postExpress() {
      if (this.text.length <= 2) {
        // write a message at least long two chars
        console.log("write a message at least long two chars");
        return;
      }
      var jwt = cookieManager.getCookie("jwt");

      let headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);
      headers.append("Content-type", "application/json");

      const response = await fetch(config.hostname + "/api/social/messages", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ text: this.text }),
      });

      const result = await response.json();
      if(result.created_at === undefined){
        // some error, the post is not stored
      }else{
        // post the message
        this.posted = true;
        this.$emit("posted", { posted: this.posted });

      }
    },
  },
};
</script>

<style scoped>
textarea{
    height: 170px
}
.all {
  max-width: 500px;
  margin: auto;
}
.post-btn{
  margin-top: 1em;
}
</style>
