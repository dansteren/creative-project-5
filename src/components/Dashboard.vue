<template>
  <div class="dashboard">
    <div class="toolbar">
      <div class="toolbar-main">
        <thanky-icon/>
        <div class="toolbar-title">Thanky</div>
      </div>
      <flat-button label="logout" @click="logout"/>
    </div>
    <div class="page">
      <div class="main-area">
        <div class="box message-box">
          <div class="box-header">
            Message
            <icon-button @click="toggleEditing">
              <done-icon v-if="editing"/>
              <edit-icon v-else/>
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
              :gift="card.gift"
              :selected="selected(card.id)"
              @change="cardSelected(card.id, $event)"
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
import { Card, Fab, FlatButton } from '~/components';
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
    FlatButton,
    ThankyIcon,
  },
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
    cardSelected(id, event) {
      this.$store.commit(event.srcElement.checked ? 'addSelection' : 'removeSelection', id);
    },
    toggleEditing() {
      console.log('editingi');
      this.editing = !this.editing;
    },
    goToAdd(e) {
      this.$router.push('/add');
    },
    printCards() {
      alert(`This function isn't ready quite yet. Try back tomorrow.`);
    },
    logout() {
      alert('logging out');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar {
  display: flex;
  background-color: var(--primary-color);
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 16px;
  padding-left: 24px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px #9e9e9e;
  color: #ffffff;
  user-select: none;
}
.toolbar-main {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.toolbar-title {
  padding-left: 24px;
  font-size: 18px;
}
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
