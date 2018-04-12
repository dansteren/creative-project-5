<template>
  <div class="dashboard">
    <div class="card-list-container">
      <h1>Card List</h1>
      <card
        v-for="card in cards"
        :key="card.id"
        :donor="card.donor"
        :gift="card.gift"
        :selected="selected(card.id)"
        @change="cardSelected(card.id, $event)"
      ></card>
    </div>
    <div class="todo-list-container">
      Quick Links
      <router-link to="/add">Add Card</router-link>
      <router-link to="/print">Print</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Card } from '~/components';

export default {
  name: 'Dashboard',
  components: { Card },
  created() {
    this.$store.dispatch('getCards');
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['cards']),
  },
  methods: {
    selected(cardId) {
      return this.$store.getters.selected(cardId);
    },
    cardSelected(id, event) {
      this.$store.commit(event.srcElement.checked ? 'addSelection' : 'removeSelection', id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dashboard {
  margin: 16px auto;
  display: flex;
  max-width: 992px;
}
.card-list-container {
  border: 1px solid black;
  flex: 2;
  margin-right: 8px;
}
.todo-list-container {
  margin-left: 8px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
