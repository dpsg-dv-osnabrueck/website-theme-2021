<template>
  <div>
    <h1 v-if="titleSize === 1" :class="classes"><slot></slot></h1>
    <h2 v-if="titleSize === 2" :class="classes"><slot></slot></h2>
    <h3 v-if="titleSize === 3" :class="classes"><slot></slot></h3>
    <h4 v-if="titleSize === 4" :class="classes"><slot></slot></h4>
    <h5 v-if="titleSize === 5" :class="classes"><slot></slot></h5>
    <h6 v-if="titleSize === 6" :class="classes"><slot></slot></h6>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    size: {
      type: String,
      default: '1',
    },
    subtitle: Boolean,
  },
  computed: {
    titleSize() {
      return parseInt(this.size, 10);
    },
    classes() {
      return `${!this.subtitle ? 'title' : 'subtitle'} is-${this.size}`;
    },
  },
};
</script>
