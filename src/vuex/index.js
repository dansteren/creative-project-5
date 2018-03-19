import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

var api = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 1000
});

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
      const response = await api.get('/api/cards');
      context.commit('setCards', response.data);
    },
    async addItem(context, card) {
      const reponse = await api.post('/api/cards', card);
      context.dispatch('getCards');
    },
    updateItem(context, item) {
      api.put('/api/cards/' + item.id, item);
    },
    async deleteItem(context, item) {
      await api.delete('/api/cards/' + item.id);
      return context.dispatch('getCards');
    }
  }
});
