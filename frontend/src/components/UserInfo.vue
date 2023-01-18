<template>
  <div class="all">
    <div class="container text-center info">
      <div class="row align-items-start">
        <div class="col data-type">Username:</div>
        <div class="col data">{{ userObj.username }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Name:</div>
        <div class="col data">{{ this.getName }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Surname:</div>
        <div class="col data">{{ this.getSurname }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Email:</div>
        <div class="col data">{{ userObj.email }}</div>
      </div>

      <div class="row align-items-start">
        <div class="col data-type">Bio:</div>
        <div class="col data">{{ userObj.bio }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  props: {
    userObj: Object,
  },
  computed: {
    getName() {
      return this.userObj.name.charAt(0).toUpperCase() + this.userObj.name.substring(1);
    },
    getSurname() {
      return this.userObj.surname.charAt(0).toUpperCase() + this.userObj.surname.substring(1);
    },
  },
};
</script>


<style scoped>
.info {
  max-width: 500px;
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