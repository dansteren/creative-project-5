<template>
  <div class="button" @click="emit">{{label}}</div>
</template>

<script>
export default {
  name: 'FlatButton',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    emit(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped>
.button {
  background-color: var(--primary-color);
  border-radius: var(--round-small);
  min-width: 64px;
  padding: 9px 8px;
  transition: background 0.45s;
  text-transform: uppercase;
  font-size: 14px;
  cursor: pointer;
}
.button:hover {
  background-color: #00000011;
}
.button:active {
  background-color: #00000021;
}
</style>
