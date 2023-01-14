<template>
  <div class="all">
    <h1>Account</h1>

    <div class="container text-center info">
      <div class="row align-items-start">
        <div class="col data-type">Username:</div>
        <div class="col data">{{ this.username }}</div>
      </div>
      <div class="row align-items-start">
        <div class="col data-type">Email:</div>
        <div class="col data">{{ this.email }}</div>
      </div>
    </div>

    <button @click.prevent="logout" class="btn btn-danger">Log out</button>
  </div>
</template>

<script>
export default {
  name: "Account",
  data() {
    return {
      username: "",
      email: "",
    };
  },
};
</script>

<style scoped>
.all {
  text-align: center;
}

.info{
    max-width: 400px;
    margin-top: 5em;
    margin-bottom: 5em;
}
.data-type{
    text-align: right;
}
.data{
    text-align: left;
}
</style>
