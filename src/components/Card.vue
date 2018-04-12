<template>
  <div class="card">
    <input type="checkbox" :checked="selected" @change="emit">
    <div class="donor-box">{{this.donor}}</div>
    <div class="item-box">{{this.gift}}</div>
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
    selected: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    emit(event) {
      this.$emit('change', event);
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
</style>
