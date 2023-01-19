<template>
  <div class="all">
    <h1>Account</h1>

    <div class="subMenu">
      <button @click.prevent="loadYourMessages" class="btn btn-secondary">
        Your Express
      </button>
      <button @click.prevent="loadSettings" class="btn btn-secondary">
        Settings
      </button>
    </div>

    <div class="settings" v-if="this.showSettings">
      <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

<button @click.prevent="logout" class="btn btn-danger">Log out</button>
    </div>


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
      user: Object,
      loadedUser: false,
      showSettings: false
    };
  },
  components: {
    UserInfo,
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
    loadSettings(){
      this.showSettings = true;
    },
    loadYourMessages(){
      this.showSettings = false;
    }
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

.subMenu{
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 400px;
  margin: auto;
  grid-gap: 3em;
}
</style>
