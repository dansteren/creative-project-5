<template>
  <div id="app">
    <router-view/>
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
</style>
