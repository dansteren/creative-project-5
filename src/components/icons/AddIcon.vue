<template>
  <svg :fill="fill" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
</template>

<script>
export default {
  name: 'AddIcon',
  props: {
    inactive: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    fill() {
      return this.inactive ? 'rgba(0, 0, 0, .38)' : 'rgba(0, 0, 0, .54)';
    },
  },
};
</script>

<style scoped>

</style>
