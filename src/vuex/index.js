import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cards: []
  },
  getters: {
    cards: state => state.cards
  },
  mutations: {
    setCards(state, cards) {
      state.cards = cards;
    }
  },
  actions: {
    async getCards(context) {
      const response = await axios.get('/api/cards');
      context.commit('setCards', response.data);
    },
    async addItem(context, card) {
      const reponse = await axios.post('/api/cards', card);
      context.dispatch('getCards');
    },
    updateItem(context, item) {
      axios.put('/api/cards/' + item.id, item);
    },
    async deleteItem(context, item) {
      await axios.delete('/api/cards/' + item.id);
      return context.dispatch('getCards');
    }
  }
});
