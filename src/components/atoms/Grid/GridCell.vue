<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GridCell',
  props: {
    width: [String, Object],
    offset: [String, Object],
  },
  data() {
    return {
      classNames: {
        mobile: 'mobile',
        tablet: 'tablet',
        desktop: 'desktop',
        widescreen: 'widescreen',
        fullHD: 'fullhd',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['column'];
      if (this.width && typeof this.width === 'string') {
        classes.push(`is-${this.width}`);
      } else if (this.width) {
        Object.keys(this.width).forEach((key) => {
          classes.push(`is-${this.width[key]}-${this.classNames[key]}`);
        });
      }

      if (this.offset && typeof this.offset === 'string') {
        classes.push(`is-offset-${this.offset}`);
      } else if (this.offset) {
        Object.keys(this.offset).forEach((key) => {
          classes.push(`is-offset-${this.offset[key]}-${this.classNames[key]}`);
        });
      }

      return classes.join(' ');
    },
  },
};
</script>
