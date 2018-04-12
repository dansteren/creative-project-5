import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: true,
    authError: '',
    cards: [],
    selectedCards: [],
  },
  getters: {
    selected: state => cardId => {
      return state.selectedCards.includes(cardId);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoggedIn(state, status) {
      state.loggedIn = status;
    },
    setAuthError(state, message) {
      state.authError = message;
    },
    setCards(state, cards) {
      state.cards = cards;
    },
    addSelection(state, id) {
      state.selectedCards.push(id);
    },
    removeSelection(state, cardId) {
      state.selectedCards = state.selectedCards.filter(id => id !== cardId);
    },
  },
  actions: {
    async register({ commit }, user) {
      try {
        const response = await axios.post('/api/users', user);
        commit('setUser', response.data.user);
        commit('setLoggedIn', true);
        commit('setAuthError', '');
      } catch (error) {
        commit('setLoggedIn', false);
        if (error.response) {
          if (error.response.status === 403) {
            return commit('setAuthError', 'That email address already has an account.');
          } else if (error.response.status === 409) {
            return commit('setAuthError', 'That user name is already taken.');
          }
        }
        commit('setAuthError', 'Sorry, your request failed. We will look into it.');
      }
    },
    async login({ commit }, user) {
      try {
        const response = await axios.post('/api/login', user);
        commit('setUser', response.data.user);
        commit('setLoggedIn', true);
        commit('setAuthError', '');
      } catch (error) {
        commit('setAuthError', '');
        if (error.response) {
          if (error.response.status === 403 || error.response.status === 400) {
            return commit('setAuthError', 'Invalid login.');
          } else {
            return commit('setAuthError', 'Unable to complete request at this time.');
          }
        }
        commit('setAuthError', 'Sorry, your request failed. We will look into it.');
      }
    },
    logout({ commit }, user) {
      commit('setUser', {});
      commit('setLoggedIn', false);
    },
    async getCards({ commit }) {
      try {
        const response = await axios.get(`/api/cards`);
        commit('setCards', response.data);
      } catch (error) {
        console.log('getCards failed:', error);
      }
    },
    async addCard({ dispatch }, card) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`/api/cards`, card);
          dispatch('getCards');
          resolve();
        } catch (error) {
          console.log('addCard failed:', error);
          reject(error);
        }
      });
    },
    async updateCard({ dispatch }, card) {
      try {
        const response = await axios.put(`/api/cards/${card.id}`, card);
        dispatch('getCards');
      } catch (error) {
        console.log('updateCard failed:', error);
      }
    },
    async deleteCard({ dispatch }, card) {
      try {
        const response = await axios.delete(`/api/cards/${card.id}`);
        dispatch('getCards');
      } catch (error) {
        console.log('deleteCard failed:', error);
      }
    },
  },
});
