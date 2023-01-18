<template>
    loaded user info
    {{ userObj.name }}
</template>

<script>

export default{
    name: "UserInfo",
    props: {
        userObj : Object
    }
}
</script>