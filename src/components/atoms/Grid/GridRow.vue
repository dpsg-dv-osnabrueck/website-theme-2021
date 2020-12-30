<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridRow',
  props: {
    isMobile: Boolean,
    isDesktop: Boolean,
    isGapless: Boolean,
    isMultiline: Boolean,
    gap: undefined,
    vCentered: Boolean,
    isCentered: Boolean,
  },
  data() {
    return {
      classNames: {
        isMobile: 'is-mobile',
        isDesktop: 'is-desktop',
        isGapless: 'is-gapless',
        isMultiline: 'is-multiline',
        vCentered: 'is-vcentered',
        isCentered: 'is-centered',
      },
      gapClasses: {
        mobile: 'mobile',
        tablet: 'tablet',
        desktop: 'desktop',
        fullHD: 'fullhd',
        widescreen: 'widescreen',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['columns'];

      if (this.gap && typeof this.gap === 'string') {
        classes.push(`is-variable is-${this.gap}`);
      } else if (this.gap) {
        classes.push('is-variable');
        Object.keys(this.gap).forEach((key) => {
          classes.push(`is-${this.gap[key]}-${this.gapClasses[key]}`);
        });
      }

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
