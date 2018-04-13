<template>
  <div class="dashboard">
    <div class="main-area">
      <div class="message-header">
        Card message
      </div>
      <div class="message-container">
        <div v-if="editing">
          <div>
            Type "{donor}", "{gift}", and "{message}" to represent
            the values that will change on each card.
          </div>
          <textarea class="message" v-model="message"></textarea>
        </div>
        <div class="formatted-message" v-else v-html="formattedMessage"></div>
        <button class="edit-button" @click="toggleEditing">Edit</button>
      </div>
      <div class="card-list-container">
        <h1>Gift List</h1>
        <div v-if="listEmpty">
          No gifts recorded. Click "Add Card" to get started
        </div>
        <div v-else>
          <card
            v-for="card in cards"
            :key="card.id"
            :donor="card.donor"
            :gift="card.gift"
            :selected="selected(card.id)"
            @change="cardSelected(card.id, $event)"
          ></card>
        </div>
      </div>
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

// See https://apracticalwedding.com/wedding-thank-you-card-wording-template/
const message =
  'Dear {donor},\n\n' +
  'Thank you for coming to our wedding! It truly would not have been the same ' +
  'without all of our family and friends there. We were so happy to receive ' +
  'the {gift} and we look forward to using it for years to come.\n\n' +
  'With gratitude,\n\n' +
  'Joshua & Samantha\n\n' +
  'P.S. {message}\n';

export default {
  name: 'Dashboard',
  components: { Card },
  created() {
    this.$store.dispatch('getCards');
  },
  data() {
    return {
      message,
      editing: false,
    };
  },
  computed: {
    listEmpty() {
      return this.cards.length === 0;
    },
    formattedMessage() {
      return this.message
        .replace(/{donor}/g, '<span style="color:red">donor</span>')
        .replace(/{gift}/g, '<span style="color:red">gift</span>')
        .replace(/{message}/g, '<span style="color:red">message</span>')
        .replace(/\n/g, '<br>');
    },
    ...mapState(['cards']),
  },
  methods: {
    selected(cardId) {
      return this.$store.getters.selected(cardId);
    },
    cardSelected(id, event) {
      this.$store.commit(event.srcElement.checked ? 'addSelection' : 'removeSelection', id);
    },
    toggleEditing() {
      console.log('editingi');
      this.editing = !this.editing;
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
.message-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid red;
  box-sizing: border-box;
  padding: var(--padding-default);
  margin-bottom: 16px;
  border: var(--border-light);
  border-radius: var(--round-small);
}
.message-header {
  margin-bottom: 16px;
  font-weight: 600;
}
.message {
  width: calc(100% - 6px);
  box-sizing: content-box;
  height: 170px;
  resize: none;
  border: var(--border-light);
  border-radius: var(--round-small);
  background-color: #f5f5f5;
  margin: 16px 0px;
}
.formatted-message {
  margin-bottom: 16px;
  height: 232px;
}
.edit-button {
  align-self: flex-end;
  border: var(--border-light);
  border-radius: var(--round-small);
  min-width: 80px;
  padding: 8px 12px;
  background-color: #f5f5f5;
  cursor: pointer;
}
.edit-button:hover {
  border: var(--border-dark);
}
.main-area {
  flex: 2;
  margin-right: 8px;
}
.card-list-container {
  border: 1px solid black;
  flex: 2;
  margin-right: 8px;
  width: 100%;
  border: var(--border-light);
  border-radius: var(--round-small);
}
.todo-list-container {
  margin-left: 8px;
  border: var(--border-light);
  border-radius: var(--round-small);
  padding: var(--padding-default);
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
