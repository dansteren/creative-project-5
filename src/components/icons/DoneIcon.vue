<template>
  <svg :fill="fill" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
  </svg>
</template>

<script>
export default {
  name: 'EditIcon',
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
