<template>
  <div class="card">
    <div class="donor-box">{{this.donor}}</div>
    <div class="item-box">{{this.gift}}</div>
    <div class="message-box">{{this.psmessage || 'NA'}}</div>
    <div class="delete" @click="emitEdit">Edit</div>
    <div class="delete" @click="emitDelete">Delete</div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    donor: {
      type: String,
      required: true,
    },
    gift: {
      type: String,
      required: true,
    },
    psmessage: {
      type: String,
      required: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    emitEdit(event) {
      this.$emit('edit', event);
    },
    emitDelete(event) {
      this.$emit('delete', event);
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
}
.donor-box {
  padding: 4px;
  border-left: 1px solid black;
  flex: 1;
}
.item-box {
  padding: 4px;
  border-left: 1px solid black;
  flex: 1;
}
.message-box {
  padding: 4px;
  border-left: 1px solid black;
  flex: 1;
}
.delete {
  display: none;
}
.card:hover .delete {
  display: block;
  padding: 0px 10px;
  margin: 0px 3px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
}
</style>
