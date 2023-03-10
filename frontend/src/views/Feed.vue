<template>
  <div class="all" v-if="this.loadUserObj">
    <h1>Feed</h1>

    <div class="welcome">welcome back {{ this.userObj.username }}!</div>

    <button
      @click.prevent="toggleCreateExpress"
      class="btn"
      :class="this.buttonCreatePostStyle"
    >
      {{ btnCreatePostText }}
    </button>

    <div v-if="wantToPostNewExpress" class="def-new-express">
      <PostNewExpress @posted="showGreatAddedNewExpress"></PostNewExpress>
    </div>

    <p v-if="this.showGreat" id="p-great"><b>You added a new Express!</b></p>

    <p v-if="this.showGreat" id="p-great">
      <i> {{ this.completedPostQuotes[this.randomNumberQuote].quote }}</i>
    </p>
    <p v-if="this.showGreat" id="p-great">
      - {{ this.completedPostQuotes[this.randomNumberQuote].author }}
    </p>

    <hr />

    <div v-for="content in contents">
      <div class="content">
        <TheTweet
          v-bind:content-obj="content"
          v-bind:likes-number="content.likes ? content.likes.length : 0"
          v-bind:user-id="userObj.id"
          v-bind:show-like="true"
          v-bind:show-share="true"
          @like="handleLike"
        ></TheTweet>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";
import config from "@/config.js";
import TheTweet from "../components/TheTweet.vue";
import PostNewExpress from "@/components/PostNewExpress.vue";

export default {
  name: "Feed",
  data() {
    return {
      contents: [],
      userObj: Object,
      loadUserObj: false,
      wantToPostNewExpress: false,
      buttonCreatePostStyle: "btn-primary",
      btnCreatePostText: "Post an Express",
      showGreat: false,
      randomNumberQuote: 0,
      completedPostQuotes: [
        {
          quote:
            "If you have the words, there's always a chance that you'll find the way",
          author: "Seamus Heaney",
        },
        {
          quote:
            "Everyone has their own ways of expression. I believe we all have a lot to say, but finding ways to say it is more than half the battle.",
          author: "Criss Jami",
        },
        {
          quote: "If you have big ideas you have to use big words to express them, haven't you?",
          author: "L.M. Montgomery",
        },
        {
          quote: "Science may never come up with a better office communication system than the coffee break.",
          author: "Earl Wilson",
        },
        {
          quote: "7 days without coffee makes one WEAK",
          author: "Anonymous",
        },
        {
          quote: "Caff??: the fuel for creativity and productivity.",
          author: "Anonymous",
        },
      ],
    };
  },
  components: {
    TheTweet,
    PostNewExpress,
  },
  async created() {
    this.$emit("active", { page: 'Feed' });

    const user = await userManager.whoami();
    if (user.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
      // redirect to the error page
      this.$router.push({
        name: "Error",
        params: { message: "you need to authenticate" },
      });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
    }

    this.userObj = user;
    this.loadUserObj = true;

    await this.fetchFeedContents();
  },
  methods: {
    async fetchFeedContents() {
      let jwt = cookieManager.getCookie("jwt");

      // Set the Authorization header of the request
      let headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);
      headers.append("Content-type", "application/json");
      const resultJSON = await fetch(config.hostname + "/api/social/feed", {
        method: "GET",
        headers: headers,
      });

      const contents = await resultJSON.json();
      this.contents = contents.messages;
    },
    handleLike(message) {
      const content = this.contents.find((el) => el.id === message.contentId);
      const action = message.action;

      const userID = this.userObj.id;

      if (action === "remove") {
        // remove a like
        for (let i = 0; i < content.likes.length; i++) {
          if (content.likes[i] === userID) {
            content.likes.splice(i, 1);
            break;
          }
        }
      }

      if (action === "add") {
        // add a like
        if (content.likes === undefined) {
          content.likes = [userID];
        } else {
          content.likes.push(userID);
        }
      }
    },
    toggleCreateExpress() {
      this.wantToPostNewExpress = !this.wantToPostNewExpress;
      this.showGreat = false;
      if (this.wantToPostNewExpress) {
        this.buttonCreatePostStyle = "btn-danger";
        this.btnCreatePostText = "Close";
      } else {
        this.buttonCreatePostStyle = "btn-primary";
        this.btnCreatePostText = "Post an Express";
      }
    },
    showGreatAddedNewExpress() {
      this.toggleCreateExpress();
      this.randomNumberQuote = Math.floor(
        Math.random() * this.completedPostQuotes.length
      );
      this.showGreat = true;
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 1em;
}

hr {
  max-width: 400px;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
}
.all {
  text-align: center;
}
.welcome {
  margin-bottom: 2em;
  margin-top: 2em;
}

.def-new-express {
  margin-top: 1em;
}

#p-great {
  margin-top: 1em;
}
</style>
