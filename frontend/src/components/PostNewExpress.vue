<template>
  <div class="all">
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Text</label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        v-model="this.text"
      ></textarea>
    </div>

    <button @click.prevent="postExpress" class="btn btn-primary">Post</button>
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
      if(result.created_at !== undefined){
        // a successfully created a new post
        
      }

      console.log(result);
    },
  },
};
</script>

<style scoped>
.all {
  max-width: 500px;
  margin: auto;
}
</style>
