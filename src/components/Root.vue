<template>
  <dashboard v-if="loggedIn"/>
  <marketing-page v-else />
</template>

<script>
import { mapGetters } from 'vuex';
import { MarketingPage, Dashboard } from '~/components';
export default {
  name: 'Root',
  components: { MarketingPage, Dashboard },
  computed: mapGetters(['loggedIn']),
};
</script>

<style scoped>

</style>
