<template>
  <div class="all">
    <h1 v-if="!this.foundResult">No result</h1>

    <div v-if="this.foundResult">
      <h1>Users found</h1>
      <p>List of users that contains: {{ query }}</p>

      <div v-if="this.loadedUsersList">
        <div v-for="user in this.usersList">
          <UserSearchResult v-bind:user-obj="user"></UserSearchResult>
        </div>
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
      usersList: [],
      loadedUsersList: false,
      foundResult: true,
    };
  },
  async created() {
    this.query = this.$route.params.query;
    await this.searchQuery();
  },
  watch: {
    async $route(to, from) {
      // Your logic here
      // You can access the new route parameters via "to"
      // You can access the previous route parameters via "from"
      this.query = this.$route.params.query;
      await this.searchQuery();
    },
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
      if (this.usersList.length === 0) {
        this.foundResult = false;
      } else {
        this.foundResult = true;
        this.loadedUsersList = true;
        console.log("this.userList: ", this.usersList);
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.all {
  text-align: center;
}
</style>
