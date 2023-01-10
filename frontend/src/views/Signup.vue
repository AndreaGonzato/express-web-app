<template>
  <div class="signup">
    <h1>Signup</h1>

    <form>
      <div class="row">
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            aria-label="First name"
            v-model="name"
          />
        </div>
        <div class="col">
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            aria-label="Last name"
            v-model="surname"
          />
        </div>
      </div>

      <div class="mb-3">
        <label for="usernameID" class="form-label">username</label>
        <input
          type="text"
          v-model="username"
          id="usernameID"
          name="email"
          class="form-control"
        />
      </div>

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

    <p>
      name: {{ this.name }} surname: {{ this.surname }} username:
      {{ this.username }} email: {{ this.email }} password: {{ this.password }}
    </p>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      username: "",
      name: "",
      surname: "",
      bio: "Hi! I'm on Express",
    };
  },
};
</script>

<style scoped>
.signup {
  text-align: center;
}

.mb-3 {
  max-width: 350px;
  margin: auto;
}

.row{
    max-width: 350px;
    margin: auto;
}
</style>
