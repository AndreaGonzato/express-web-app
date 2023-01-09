<template>
    <div class="login">
        <h1>Login</h1>
        <button @click="myFunction">Click this</button>
    </div>
</template>

<script>

export default {
  methods: {
    async myFunction() {
        console.log("hi there");
        /*

        const response = await fetch('http://localhost:3000/api/test')
        const data = await response.json()
        console.log(data);
        */


        const result = await fetch("http://localhost:3000/api/social/followers/5")
            .then((response) => response.json())
            .then((json) => console.log(json));


    }
  }
}

</script>