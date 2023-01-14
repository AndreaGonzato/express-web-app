<template>
  <TheNavigation v-bind:user-logged="this.userLogged"></TheNavigation>

  <div class="container">
    <routerView @message="handleMessage"></routerView>
  </div>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";

export default {
  components: { TheNavigation },
  data() {
    return {
      URL_SITE: "http://localhost",
      userLogged : false
    };
  },
  methods: {
    handleMessage(message){
      this.userLogged = message.userLogged;
    }
  }
};
</script>

<style scoped></style>
