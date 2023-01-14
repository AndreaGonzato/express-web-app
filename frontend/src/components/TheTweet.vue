<template>
    <div class="all">
        <p>@{{ contentObj.author_username }}</p>
        <p>{{ contentObj.text }}</p>
    </div>
</template>

<script>

export default{
    name: "TheTweet",
    props: {
        contentObj : Object
    },
}
</script>