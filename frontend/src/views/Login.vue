<template>
  <div class="login">
    <h1>Login</h1>

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

      <button @click.prevent="login" class="btn btn-primary">Login</button>

      <div class="test1">
        <button @click.prevent="test1" class="btn btn-primary">Test1</button>
      </div>

      <div class="test2">
        <button @click.prevent="test2" class="btn btn-primary">Test2</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async test1(){
      console.log("test1, no auth required");
      const response = await fetch("http://localhost:3000/api/test");
      const data = await response.json();
      console.log(data);

      const result = await fetch("http://localhost:3000/api/social/followers/5")
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    async test2(){
      console.log("clicked btn2");

      var jwt = this.getCookie("jwt");

      // Set the Authorization header of the request
      var headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);

      // Use the JWT token in an HTTP header
      const result = await fetch('http://localhost:3000/api/protected', {
          method: "GET",
          headers: headers
      });

      const objResult = await result.json();
      console.log(objResult);
    },
    async login() {
      console.log("email: " + this.email);
      console.log("password: " + this.password);

      const token = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: this.email, password: this.password }),
      });

      const objToken = await token.json();

      //TODO remove
      console.log("saving token", objToken.token);

      // save the jwt in cookie
     this.setJwtCookie(objToken.token);

      /*
      const response = await fetch("http://localhost:3000/api/test");
      const data = await response.json();
      console.log(data);

      const result = await fetch("http://localhost:3000/api/social/followers/5")
        .then((response) => response.json())
        .then((json) => console.log(json));
        */
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
