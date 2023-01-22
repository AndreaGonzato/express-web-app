<template>
  <div class="all">
    <h1>the tweet</h1>
  </div>
</template>

<script>
import userManager from "@/userManager.js";

export default {
  name: "SingleTweet",
  async created() {
    const user = await userManager.whoami();
    if (user.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
    }
  },
};
</script>


<style scoped>
.all{
    text-align: center;
}
</style>