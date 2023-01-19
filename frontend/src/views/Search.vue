<template>
  <div class="all">
    <h1>Result</h1>

    <div v-if="this.loadedUsersList">
      delete this

      <div v-for="user in this.usersList">
        {{user.name}}
        <UserSearchResult v-bind:user-obj="user"></UserSearchResult>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config.js";
import UserSearchResult from "../components/UserSearchResult.vue";

export default {
  name: "Search",
  components: {
    UserSearchResult,
  },
  data() {
    return {
      query: "",
      users: [],
      loadedUsersList: false,
    };
  },
  async created() {
    this.query = this.$route.params.query;
    await this.searchQuery();
  },
  methods: {
    async searchQuery() {
      const response = await fetch(
        config.hostname + "/api/social/search?q=" + this.query,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      this.usersList = await response.json();
      this.loadedUsersList = true;
      console.log("this.userList: ", this.usersList);
    },
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}
</style>
