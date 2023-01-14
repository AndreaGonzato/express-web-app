<template>
  <div class="all">
    <p>@{{ contentObj.author_username }}</p>
    <p>{{ contentObj.text }}</p>

    <!-- like button-->
    <span class="like">
      <button class="btn btn-success" @click.prevent="clickOnLike">
        <i class="fa-thumbs-up" :class="likeStyle"></i> Like
        {{ this.likesNumber }}
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: "TheTweet",
  props: {
    contentObj: Object,
    likesNumber: Number,
  },
  data(){
    return {
        likeStyle: 'fa-regular'
    }
  },
  methods:{
    clickOnLike(){
        console.log("to implement")
    }
  }
};
</script>
