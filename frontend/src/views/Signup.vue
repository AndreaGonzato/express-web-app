<template>
  <div class="signup">
    <h1>Signup</h1>

    <form>
      <div class="mb-3">
        <label for="emailID" class="form-label">email</label>
        <input
          type="text"
          v-model="email"
          id="emailID"
          name="email"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="passID" class="form-label">password</label>
        <input
          type="password"
          v-model="password"
          id="passID"
          name="password"
          class="form-control"
        />
      </div>

      <button @click.prevent="login" class="btn btn-primary">Sign up</button>


    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data(){
    return {
        email : '',
        password : '',
        username : '',
        name : '',
        surname : '',
        bio : "Hi! I'm on Express",
    }
  }
};
</script>

<style scoped>
.signup {
  text-align: center;
}
</style>
