<template>
    <div class="all">
        <h1>Account</h1>
    </div>
</template>

<script>

export default{
    name: "Account",
    data(){
        return {
            username : ''
        }
    },
    created(){
        this.username = this.$route.params.id;
        console.log(this.username); // TODO remove
    }
}
</script>

<style scoped>
.all{
    text-align: center;
}
</style>