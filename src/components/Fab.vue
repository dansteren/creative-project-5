<template>
  <div class="fab" @click="emit">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Fab',
  methods: {
    emit(event) {
      this.$emit('click', event);
    },
  },
};
</script>

<style scoped>
.fab {
  position: fixed;
  bottom: 72px;
  right: 32px;
  width: 56px;
  height: 56px;
  background-color: var(--primary-color);
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 3px 9px #9e9e9e;
  transition: background 0.45s;
  cursor: pointer;
}
.fab:hover {
  background-color: #7bcfaa;
}
.fab:active {
  box-shadow: 0px 5px 14px #9e9e9e;
}
</style>
