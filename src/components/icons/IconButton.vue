<template>
  <button :class="{active: !disabled}" @click="emit">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    disabled: {
      type: Boolean,
      required: false,
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
button {
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 32px;
  height: 32px;
  padding: 0px;
  border-radius: 24px;
  transition: background 0.5s;
}
.active:hover {
  background-color: rgba(0, 0, 0, 0.1);
}
button:focus {
  outline: none;
}
.active:active {
  background-color: rgba(0, 0, 0, 0.2);
  transition: background 0s;
}
</style>
