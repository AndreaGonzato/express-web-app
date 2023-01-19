<template>
    <div class="all">
        {{this.userObj.username}}
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