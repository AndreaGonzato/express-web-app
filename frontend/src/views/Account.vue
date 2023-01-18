<template>
  <div class="all">
    <h1>{{ this.username }}</h1>

    <UserInfo v-if="loadedUser" v-bind:userObj="this.user"></UserInfo>

    <div class="container text-center info" v-if="loadedUser">
      <div class="row align-items-start">
        <div class="col data-type">Username:</div>
        <div class="col data">{{ this.user.username }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Name:</div>
        <div class="col data">{{ this.user.name }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Surname:</div>
        <div class="col data">{{ this.user.surname }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Email:</div>
        <div class="col data">{{ this.user.email }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Bio:</div>
        <div class="col data">{{ this.user.bio }}</div>
      </div>
    </div>
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

.info {
  max-width: 400px;
  margin-top: 5em;
  margin-bottom: 5em;
}
.data-type {
  text-align: right;
}
.data {
  text-align: left;
}
</style>
