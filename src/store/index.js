import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const getAuthHeader = () => {
  return { headers: { Authorization: localStorage.getItem('token') } };
};

export default new Vuex.Store({
  state: {
    user: {},
    message: '',
    token: '',
    authError: '',
    cards: [],
    selectedCards: [],
  },
  getters: {
    selected: state => cardId => {
      return state.selectedCards.includes(cardId);
    },
    loggedIn: state => {
      return state.token === '' ? false : true;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setToken(state, token) {
      state.token = token;
      if (token === '') {
        localStorage.removeItem('token');
      } else {
        localStorage.setItem('token', token);
      }
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
    async initialize({ commit }) {
      let token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/me', getAuthHeader());
          commit('setToken', token);
          commit('setUser', response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          commit('setUser', {});
          commit('setToken', '');
        }
        try {
          const messageResponse = await axios.get('/api/message', getAuthHeader());
          commit('setMessage', messageResponse.data.message);
        } catch (error) {
          console.log('Error getting message. Sucks to suck.');
        }
      }
    },
    async register({ commit }, user) {
      try {
        const response = await axios.post('/api/users', user);
        commit('setUser', response.data.user);
        commit('setToken', response.data.token);
        console.log(response.data.user.defaultmessage);
        commit('setMessage', response.data.user.defaultmessage);
        commit('setAuthError', '');
      } catch (error) {
        commit('setToken', '');
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
        commit('setToken', response.data.token);
        commit('setMessage', response.data.message);
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
    logout({ commit }) {
      commit('setUser', {});
      commit('setToken', '');
    },
    async getCards({ commit }) {
      try {
        const response = await axios.get(`/api/cards`, getAuthHeader());
        commit('setCards', response.data.cards);
      } catch (error) {
        console.log('getCards failed:', error);
      }
    },
    async addCard({ dispatch }, card) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`/api/cards`, card, getAuthHeader());
          dispatch('getCards');
          resolve();
        } catch (error) {
          console.log('addCard failed:', error);
          reject(error);
        }
      });
    },
    async getMessage({ dispatch }) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(`/api/message`, getAuthHeader());
          resolve();
        } catch (error) {
          console.log('getMessage failed:', error);
          reject();
        }
      });
    },
    async updateMessage({ commit }, message) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.put(`/api/message`, { message: message }, getAuthHeader());
          commit('setMessage', message);
          resolve();
        } catch (error) {
          console.log('updateMessage failed:', error);
          reject(error);
        }
      });
    },
    async updateCard({ dispatch }, card) {
      try {
        const response = await axios.put(`/api/cards/${card.id}`, card, getAuthHeader());
        dispatch('getCards');
      } catch (error) {
        console.log('updateCard failed:', error);
      }
    },
    async deleteCard({ dispatch }, cardId) {
      try {
        const response = await axios.delete(`/api/cards/${cardId}`, getAuthHeader());
        dispatch('getCards');
      } catch (error) {
        console.log('deleteCard failed:', error);
      }
    },
  },
});
