<template>
  <div id="app">
    <router-view/>
    <a class="footer" href="https://github.com/dansteren/creative-project-5">
      <img src="/static/github.svg" alt="GitHub Repo">
    </a>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
body {
  margin: 0px;
}
:root {
  --primary-color: #42b983;
  --secondary-color: #607d8b;
  --border-light: 1px solid rgba(27, 31, 35, 0.2);
  --border-dark: 1px solid rgba(0, 0, 0, 0.3);
  --round-small: 3px;
  --padding-default: 16px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0px;
  padding: 0px;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #212121;
  padding: 0px;
  margin: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #eceff1;
  font-size: 12px;
}
.footer img {
  width: 24px;
  height: 24px;
  margin: 8px;
}
</style>
