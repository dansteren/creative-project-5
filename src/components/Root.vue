<template>
  <div>
    <div v-if="loggedIn">
      <dashboard/>
    </div>
    <div v-else>
      <marketing-page/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { MarketingPage, Dashboard } from '~/components';
export default {
  name: 'Root',
  components: { MarketingPage, Dashboard },
  computed: mapState(['loggedIn']),
};
</script>

<style scoped>

</style>
