<template>
  <div class="marketing-page">
    <h1>"THANK YOU" CARDS, DONE.</h1>
    <div class="subtitle">Mass produce personalized thank you cards in minutes</div>
    <button @click="goToDashboard">GET STARTED</button>
  </div>
</template>

<script>
export default {
  name: 'MarketingPage',
  data() {
    return {};
  },
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
.marketing-page {
  background-image:
    linear-gradient(
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.5)
    ),
    url('/static/cards.jpg');
  color: #ECEFF1;
  background-repeat: none;
  background-position: center;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
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
button {
  margin: 16px;
  padding: 12px 16px;
  border-radius: 5px;
  background-color: var(--primary-color);
}
button {
  background-color: var(--primary-color);
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
  padding: 16px 20px;
  margin: 16px 0px;
  border-radius: 2px;
  border: none;
  outline: none;
  box-shadow: 0px 1px 5px #00000061;
  transition: all 0.30s ease-out;
  -webkit-transition: all 0.30s ease-out;
  -moz-transition: all 0.30s ease-out;
  -ms-transition: all 0.30s ease-out;
  -o-transition: all 0.30s ease-out;
}

button:hover {
  background-color: #546E7A;
}

button:active {
  box-shadow: none;
}
</style>
