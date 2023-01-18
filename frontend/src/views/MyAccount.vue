<template>
  <div class="all">
    <h1>Account</h1>

    <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

    <button @click.prevent="logout" class="btn btn-danger">Log out</button>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";
import UserInfo from "../components/UserInfo.vue";

export default {
  name: "MyAccount",
  data() {
    return {
      user : Object,
      loadedUser : false
    };
  },
  components: {
    UserInfo
  },
  async created() {
    // tell the app to show account in the nav menu and remove login and signin
    this.$emit("message", { userLogged: true });
    
    this.user = await userManager.whoami();
    this.loadedUser = true;
  
  },
  methods: {
    logout() {
      this.$emit("message", { userLogged: false });
      cookieManager.removeJwtCookie();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

</style>
