<template>
  <div class="all">
    <h1>{{ this.username }}</h1>

    <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

  </div>
</template>

<script>
import config from "@/config.js";
import UserInfo from "../components/UserInfo.vue";

export default {
  name: "Account",
  data() {
    return {
      username: "",
      user: Object,
      loadedUser: false,
    };
  },
  components: {
    UserInfo,
  },
  async created() {
    this.username = this.$route.params.id;

    await this.fetchUserInfo();
    this.loadedUser = true;
  },
  methods: {
    async fetchUserInfo() {
      const resultJSON = await fetch(
        config.hostname + `/api/users/${this.username}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      this.user = await resultJSON.json();
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

</style>
