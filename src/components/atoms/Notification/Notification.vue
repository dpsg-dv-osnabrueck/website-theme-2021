<template>
  <transition name="fade">
    <div v-if="show" :class="classes">
      <button class="delete" @click="show = false"></button>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    isInfo: Boolean,
    isSuccess: Boolean,
    isWarning: Boolean,
    isError: Boolean,
    isPrimary: Boolean,
  },
  data() {
    return {
      show: true,
      classNames: {
        isInfo: 'is-info',
        isSuccess: 'is-success',
        isWarning: 'is-warning',
        isError: 'is-danger',
        isPrimary: 'is-primary',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['notification'];

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
