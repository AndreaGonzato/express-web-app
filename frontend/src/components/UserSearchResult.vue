<template>
  <div class="all">
    <div class="container">
      <div class="row">
        <div class="col-sm first-col">
          <router-link v-bind:to="'/account/' + this.userObj.username"
            >@{{ this.userObj.username }}</router-link
          >
        </div>
        <div class="col-sm">{{ this.userObj.name }}</div>
        <div class="col-sm">{{ this.userObj.surname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSearchResult",
  props: {
    userObj: Object,
  },
};
</script>

<style scoped>
.container{
    max-width: 500px;
    text-align: left;
}

.first-col{
    text-align: left;
}
</style>