<template>
  <div class="all">
    <h1>Account</h1>

    <div class="subMenu">
      <button @click.prevent="loadYourMessages" class="btn btn-secondary">
        Your Expresses
      </button>
      <button @click.prevent="loadSettings" class="btn btn-secondary">
        Settings
      </button>
    </div>

    <div v-if="loadedUser">
      <div class="settings" v-if="this.showSettings">
        <UserInfo v-bind:userObj="this.user"></UserInfo>

        <div>
          <button @click.prevent="editBio" class="btn bio-btn" v-bind:class="this.editBioBtnStyle">
            {{ editBioBtnText }}
          </button>
        </div>

        <textarea
          v-if="showBioTextArea"
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          v-model="this.user.bio"
          v-on:blur="postBio"
        ></textarea>

        <button @click.prevent="logout" class="btn btn-danger">Log out</button>
      </div>

      <div
        v-if="!this.showSettings"
        v-for="tweet in tweets"
        class="user-messages"
      >
        <div class="tweet">
          <TheTweet
            v-bind:content-obj="tweet"
            v-bind:likes-number="tweet.likes ? tweet.likes.length : 0"
            v-bind:user-id="this.user.id"
            v-bind:show-like="true"
            @like="handleLike"
          ></TheTweet>

          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userManager from "@/userManager.js";
import cookieManager from "@/cookieManager.js";
import UserInfo from "../components/UserInfo.vue";
import TheTweet from "../components/TheTweet.vue";
import config from "@/config.js";

export default {
  name: "MyAccount",
  data() {
    return {
      user: Object,
      loadedUser: false,
      showSettings: false,
      tweets: [],
      showBioTextArea: false,
      editBioBtnText: 'Edit bio',
      editBioBtnStyle: 'btn-secondary'
    };
  },
  components: {
    UserInfo,
    TheTweet,
  },
  async created() {
    this.user = await userManager.whoami();

    if (this.user.name === undefined) {
      // tell the app that the user is not logged in
      this.$emit("message", { userLogged: false });
      this.$router.push({
        name: "Error",
        params: { message: "can not access this page" },
      });
    } else {
      // tell the app that the user is logged in
      this.$emit("message", { userLogged: true });
      this.loadedUser = true;
      this.loadYourMessages();
    }
  },
  methods: {
    async logout() {
      // update frontend
      this.$emit("message", { userLogged: false });

      const response = await fetch(config.hostname + "/api/auth/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({}),
      });

      const result = await response.json();
      cookieManager.setJwtCookie(result.token);

      // go the the Home page
      this.$router.push({ name: "Home" });
    },
    loadSettings() {
      this.showSettings = true;
    },
    loadYourMessages() {
      this.showSettings = false;
      this.fetchYourTweets();
    },
    async fetchYourTweets() {
      const resultJSON = await fetch(
        config.hostname + `/api/social/messages/${this.user.id}`,
        {
          method: "GET",
          headers: { "Content-type": "application/json" },
        }
      );
      this.tweets = await resultJSON.json();
    },
    handleLike(message) {
      const content = this.tweets.find((el) => el.id === message.contentId);
      const action = message.action;

      const userID = this.user.id;

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
    async editBio() {
      this.showBioTextArea = !this.showBioTextArea;

      if(this.showBioTextArea){
        this.editBioBtnText = "Save";
        this.editBioBtnStyle = 'btn-success'
      }else{
        this.editBioBtnText = "Edit bio";
        this.editBioBtnStyle = 'btn-secondary'
        await postBio();
      }
      
      

    },
    async postBio() {
      let jwt = cookieManager.getCookie("jwt");

      var headers = new Headers();
      headers.append("Authorization", "Bearer " + jwt);
      headers.append("Content-type", "application/json");
      const response = await fetch(config.hostname + "/api/social/users/bio/"+this.user.bio, {
        method: "POST",
        headers: headers,
      });
    },
  },
};
</script>

<style scoped>
hr {
  max-width: 400px;
  margin: auto;
  margin-bottom: 1em;
  margin-top: 1em;
}

textarea {
  max-width: 400px;
  margin: auto;
  margin-bottom: 1em;
}

.all {
  text-align: center;
}

.bio-btn {
  margin-bottom: 1em;
}

.subMenu {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 400px;
  margin: auto;
  grid-gap: 3em;
  margin-top: 2em;
}

.user-messages {
  margin-top: 2em;
}
</style>
