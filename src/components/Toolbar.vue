<template>
  <div class="toolbar">
    <div class="toolbar-main">
      <thanky-icon/>
      <div class="toolbar-title">Thanky</div>
    </div>
    <flat-button label="logout" @click="logout"/>
  </div>
</template>

<script>
import { ThankyIcon } from '~/components/icons';
import { FlatButton } from '~/components';

export default {
  name: 'Toolbar',
  components: {
    FlatButton,
    ThankyIcon,
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  background-color: var(--primary-color);
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 16px;
  padding-left: 24px;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px #9e9e9e;
  color: #ffffff;
  user-select: none;
}
.toolbar-main {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.toolbar-title {
  padding-left: 24px;
  font-size: 18px;
}
</style>
