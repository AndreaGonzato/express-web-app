<template>
  <TheNavigation v-bind:user-logged="this.userLogged" v-bind:active-page="this.activePage"></TheNavigation>

  <div class="container">
    <routerView @message="handleMessage" @active="handleActivePage"></routerView>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";

export default {
  components: { TheNavigation },
  data() {
    return {
      URL_SITE: "http://localhost",
      userLogged : false,
      activePage : 'Home'
    };
  },
  methods: {
    handleMessage(message){
      this.userLogged = message.userLogged;
    },
    handleActivePage(message){
      this.activePage = message.page;
      console.log(this.activePage)
    }
  }
};
</script>

<style scoped></style>
