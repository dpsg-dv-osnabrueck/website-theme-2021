<template>
  <button :class="classes" :disabled="disabled" @click="$emit('click')">
    <span class="icon" v-if="iconName && !iconRight">
      <Icon :name="iconName" :fab="fab" />
    </span>
    <span v-if="!iconOnly"><slot></slot></span>
    <span class="icon" v-if="iconName && iconRight">
      <Icon :name="iconName" :fab="fab" />
    </span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    isSmall: Boolean,
    isNormal: Boolean,
    isMedium: Boolean,
    isLarge: Boolean,
    isFullWidth: Boolean,
    isOutlined: Boolean,
    isRounded: Boolean,
    isLoading: Boolean,
    disabled: Boolean,
    iconName: String,
    iconRight: Boolean,
    fab: Boolean,
    iconOnly: Boolean,
  },
  data() {
    return {
      classNames: {
        isSmall: 'is-small',
        isNormal: 'is-normal',
        isMedium: 'is-medium',
        isLarge: 'is-large',
        isFullWidth: 'is-fullwidth',
        isOutlined: 'is-outlined',
        isRounded: 'is-rounded',
        isLoading: 'is-loading',
      },
    };
  },
  computed: {
    classes() {
      const classes = ['button', `${this.disabled ? '' : 'is-clickable'}`];
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
