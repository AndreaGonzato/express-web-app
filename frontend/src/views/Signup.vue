<template>
  <div class="signup">
    <h1>Signup</h1>

    <p>Please fill this form to create an account!</p>

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

      <div class="row">
        <input
          type="text"
          v-model="username"
          name="email"
          class="form-control"
          placeholder="Username"
        />
      </div>

      <div class="row">
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          placeholder="Email"
        />
      </div>

      <div class="row">
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          placeholder="Password"
        />
      </div>

      <button @click.prevent="signup" class="btn btn-primary">Sign up</button>
    </form>

    <p>
      Already have an account? <router-link to="/login">Login here</router-link>
    </p>
  </div>
</template>

<script>
import config from "@/config.js";

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
      hostname: config.hostname,
    };
  },
  methods: {
    async signup() {
      const postRequest = await fetch(this.hostname + "/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
          name: this.name,
          surname: this.surname,
          bio: this.bio,
        }),
      });

      const obj = await postRequest.json();
      if(obj.insertedId !== undefined){
        // OK, user inserted in the DB
      }else{
        // user not inserted
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 1em;
}

button {
  margin-bottom: 1em;
}

.signup {
  text-align: center;
}

.row {
  max-width: 350px;
  margin: auto;
  margin-bottom: 1em;
}
</style>
