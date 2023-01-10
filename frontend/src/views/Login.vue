<template>
  <div class="login">
    <h1>Login</h1>

    <form>
      <div class="mb-3">
        <input
          type="text"
          v-model="email"
          placeholder="Email"
          name="email"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          name="password"
          class="form-control"
        />
      </div>

      <button @click.prevent="login" class="btn btn-primary">Login</button>

    </form>

    <p>Not a member? <router-link to="/signup">Sign up now</router-link> </p>
  </div>
</template>

<script>

import config from '@/config.js'

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      hostname: config.hostname
    };
  },
  methods: {
    async test1() {
      const response = await fetch(this.hostname+"/api/test");
      const data = await response.json();
      console.log(data);

      const result = await fetch(this.hostname+"/api/social/followers/5")
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    async test2() {
      var jwt = this.getCookie("jwt");

      // Set the Authorization header of the request
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);

      // Use the JWT token in an HTTP header
      const result = await fetch(this.hostname+"/api/protected", {
        method: "GET",
        headers: headers,
      });

      const objResult = await result.json();
      console.log(objResult);
    },
    async login() {
      const token = await fetch(this.hostname+"/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      const objToken = await token.json();

      
      if (objToken.token !== undefined) {
        // save the jwt in cookie
        this.setJwtCookie(objToken.token);
      } else {
        // wrong credential (defined by the protocol, the objToken has the attribute token if the user posted the right credentials)
        console.log("user credentials are wrong");
      }
    },
    setJwtCookie(token) {
      // Set the expiration date to one hour from now
      var expires = new Date();
      expires.setTime(expires.getTime() + 1 * 60 * 60 * 1000);

      // TODO add the httponly mode
      // Set the JWT
      document.cookie = "jwt=" + token + ";expires=" + expires.toUTCString(); //";httponly";
    },
    getCookie(name) {
      // Split the cookies string and get all individual name=value pairs in an array
      var cookieArr = document.cookie.split(";");

      // Loop through the array and find the named cookie
      for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

        if (name === cookiePair[0].trim()) {
          return decodeURIComponent(cookiePair[1]);
        }
      }

      console.log("no cookie for this site");
      // If the named cookie does not exist, return null
      return null;
    },
  },
};
</script>

<style scoped>
h1 {
  padding-bottom: 1.5em;
}

button{
  margin-bottom: 1em;
}

.mb-3 {
  max-width: 350px;
  margin: auto;
}

.login {
  text-align: center;
}

input {
  background-color: white;
  color: black;
}
</style>
