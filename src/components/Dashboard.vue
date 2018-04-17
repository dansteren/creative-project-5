<template>
  <div class="dashboard">
    <toolbar/>
    <div class="page">
      <div class="main-area">
        <div class="box message-box">
          <div class="box-header">
            Message
            <icon-button v-if="editing" @click="finishEditing">
              <done-icon />
            </icon-button>
            <icon-button v-else @click="startEditing">
              <edit-icon/>
            </icon-button>
          </div>
          <div class="box-body padded">
            <div v-if="editing">
              <div>
                <span>{donor}</span>, <span>{gift}</span>, and <span>{message}</span> represent
                the values that will change on each card.
              </div>
              <textarea class="message" v-model="message"></textarea>
            </div>
            <div class="formatted-message" v-else v-html="formattedMessage"></div>
          </div>
        </div>
        <div class="box gifts-box">
          <div class="box-header">
            Gifts
            <icon-button @click="goToAdd"><add-icon/></icon-button>
          </div>
          <div class="box-body padded" v-if="listEmpty">
            No gifts recorded. Click the plus icon to get started.
          </div>
          <div v-else>
            <card
              v-for="card in cards"
              :key="card.id"
              :donor="card.donor"
              :psmessage="card.psmessage"
              :gift="card.gift"
              @edit="showEditCardThing(card)"
              @delete="deleteCard(card.id)"
            ></card>
          </div>
        </div>
      </div>
      <div class="box instructions-box">
        <div class="box-header padded">Instructions</div>
        <div class="box-body">
          <ol>
            <li>Customize your message</li>
            <li>Record your gifts</li>
            <li>Click the print icon when ready!</li>
          </ol>
        </div>
      </div>
      <fab @click="printCards"><print-icon/></fab>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Card, Fab, Toolbar } from '~/components';
import { AddIcon, EditIcon, IconButton, PrintIcon, DoneIcon, ThankyIcon } from '~/components/icons';

// See https://apracticalwedding.com/wedding-thank-you-card-wording-template/
const message =
  'Dear {donor},\n\n' +
  'Thank you for coming to our wedding! It truly would not have been the same ' +
  'without all of our family and friends there. We were so happy to receive ' +
  'the {gift} and we look forward to using it for years to come.\n\n' +
  'With gratitude,\n\n' +
  'Joshua & Samantha\n\n' +
  'P.S. {message}\n';

function highlight(text) {
  return `<span style="color: var(--primary-color)">${text}</span>`;
}

export default {
  name: 'Dashboard',
  components: {
    Card,
    AddIcon,
    IconButton,
    PrintIcon,
    Fab,
    EditIcon,
    DoneIcon,
    Toolbar,
  },
  async beforeMount() {
    this.$store.dispatch('getCards');
    await this.$store.dispatch('getMessage');
    this.message = this.$store.state.message;
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    listEmpty() {
      return this.cards.length === 0;
    },
    formattedMessage() {
      if (!this.$store.state.message) {
        return '';
      }
      return this.$store.state.message
        .replace(/{donor}/g, highlight('donor'))
        .replace(/{gift}/g, highlight('gift'))
        .replace(/{message}/g, highlight('message'))
        .replace(/\n/g, '<br>');
    },
    ...mapState(['cards']),
  },
  methods: {
    selected(cardId) {
      return this.$store.getters.selected(cardId);
    },
    showEditCardThing(card) {
      console.log('editing...');
    },
    deleteCard(cardId) {
      console.log('deleting...');
      this.$store.dispatch('deleteCard', cardId);
    },
    startEditing() {
      this.editing = true;
    },
    async finishEditing() {
      try {
        await this.$store.dispatch('updateMessage', this.message);
        this.editing = false;
      } catch (error) {
        alert("Your message wasn't saved to the server. Try again.");
      }
    },
    goToAdd() {
      this.$router.push('/add');
    },
    printCards() {
      alert(`This function isn't ready quite yet. Try back tomorrow.`);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page {
  margin: 16px auto;
  display: flex;
  max-width: 992px;
}
.box {
  border: var(--border-light);
  border-radius: var(--round-small);
}
.box-header {
  font-weight: 600;
  background-color: #f5f5f5;
  padding: var(--padding-default);
  border-bottom: var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 8px 9px 16px;
}
.box-body {
  display: flex;
  flex-direction: column;
}
.padded {
  padding: var(--padding-default);
}
.message-box {
  margin-bottom: 16px;
}
.message {
  width: calc(100% - 6px);
  box-sizing: content-box;
  height: 170px;
  resize: none;
  border: var(--border-light);
  border-radius: var(--round-small);
  background-color: #f5f5f5;
  margin-top: 16px;
}
.formatted-message {
  margin-bottom: 16px;
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
.instructions-box {
  margin-left: 8px;
  flex: 1;
  height: fit-content;
}
.icon {
  color: rgba(0, 0, 0, 0.54);
}
span {
  color: var(--primary-color);
}
li {
  padding: 16px 0px;
}
</style>
