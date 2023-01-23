<template>
  <div class="home">
    <h1>Express</h1>
    <p>
      Welcome to <b>Express</b>, a social network where you can spread your
      messages to the world!
    </p>
  </div>
</template>

<script>
import userManager from "@/userManager.js";

export default {
  name: "Home",
  async created() {
    this.$emit("active", { page: 'Home' });

    const user = await userManager.whoami();
    if (user.error === undefined) {
      // the user is authenticated
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
    } else {
      // user is not authenticated
      // tell the app that the user is NOT logged in
      this.$emit("message", { userLogged: false });
    }
  },
};
</script>

<style scoped>
h1 {
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 40;
}
p{
  font-size: large;
}

.home {
  text-align: center;
}
</style>
