<template>
  <div class="login">
    <h1>Login</h1>

    <form>
      <div class="mb-3">
        <label for="emailID" class="form-label">email</label>
        <input type="text" id="emailID" name="email" class="form-control"/>
      </div>

      <div class="mb-3">
        <label for="passID" class="form-label">password</label>
        <input type="password" id="passID" name="password" class="form-control"/>
      </div>

      <button @click.prevent="login" class="btn btn-primary">Login</button>

    </form>



  </div>
</template>

<script>
export default {
  methods: {
    async login(e) {
      console.log("hi there");
      

        const response = await fetch('http://localhost:3000/api/test')
        const data = await response.json()
        console.log(data);
        /*

      const result = await fetch("http://localhost:3000/api/social/followers/5")
        .then((response) => response.json())
        .then((json) => console.log(json));
        */
    },
  },
};
</script>

<style scoped>

h1{
  padding-bottom: 1.5em;
}


.login {
  text-align: center;
}

input{
  background-color: white;
  color: black;
}


</style>
