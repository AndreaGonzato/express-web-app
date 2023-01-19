<template>
    <div class="all">
        {{this.userObj.name}}
    </div>
</template>

<script>

export default{
    name: "UserSearchResult",
    props: {
        userObj : Object
    }
}
</script>