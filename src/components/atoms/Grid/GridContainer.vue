<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridContainer',
  props: {
    isWidescreen: Boolean,
    isFullHD: Boolean,
    isMaxDesktop: Boolean,
    isMaxWidescreen: Boolean,
  },
  data() {
    return {
      classNames: {
        isWidescreen: 'is-widescreen',
        isFullHD: 'is-full-hd',
        isMaxDesktop: 'is-max-desktop',
        isMaxWidescreen: 'is-max-widescreen',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['container'];
      Object.keys(this.classNames).forEach((key) => {
        if (this[key]) {
          classes.push(this.classNames[key]);
        }
      });
      return classes.join(' ');
    },
  },
};
</script>
