<template>
  <div class="marketing-page">
    <div class="guttered">
      <div class="explanation">
        <h1>Thank you cards? Done.</h1>
        <div class="subtitle">
          Record your gifts as you open them, and then generate all your cards
          with the click of a button. Best of all, it's completely free!
          Create an acccount to get started.
        </div>
      </div>
      <form>
        <div class="title">Sign Up / Sign In</div>
        <label>Name</label>
        <input type="text" v-model="name" />
        <label>Username</label>
        <input type="text" v-model="username" />
        <label>Password</label>
        <input type="password" v-model="password" />
        <div class="error">{{authError}}</div>
        <div class="buttons">
          <input type="button" @click="register" value="Sign Up"/>
          <input type="button" primary @click="login" value="Sign In"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: 'MarketingPage',
  data() {
    return {
      name: '',
      username: '',
      password: '',
    };
  },
  computed: mapState(['authError']),
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      });
    },
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.marketing-page {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/static/desk.jpg');
  background-repeat: none;
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 3em;
}
.subtitle {
  margin-bottom: 16px;
  font-size: 1.7em;
  font-weight: 100;
}
.guttered {
  max-width: 992px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}
.explanation {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #eceff1;
  margin-right: 85px;
}
form {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 1px 5px #00000061;
  font-size: 16px;
  padding: 32px;
}
form .title {
  margin-bottom: 16px;
  font-size: 20px;
}
label {
  align-self: flex-start;
  margin-top: 8px;
}
form input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  border: 1px solid darkgray;
  font-size: 16px;
}
.error {
  color: crimson;
  margin: 8px 0px;
  font-size: 14px;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
input[type='button'] {
  width: 125px;
  padding: 12px 16px;
  background-color: var(--secondary-color);
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  border-radius: 2px;
  border: none;
  outline: none;
  box-shadow: 0px 1px 5px #00000061;
  transition: all 0.3s ease-out;
  -webkit-transition: all 0.3s ease-out;
  -moz-transition: all 0.3s ease-out;
  -ms-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
}
input[type='button']:hover {
  background-color: #546e7a;
}

input[type='button']:active {
  box-shadow: none;
}
input[primary] {
  background-color: var(--primary-color);
}
input[primary]:hover {
  background-color: #3caa79;
}

input[primary]:active {
  box-shadow: none;
}
</style>
