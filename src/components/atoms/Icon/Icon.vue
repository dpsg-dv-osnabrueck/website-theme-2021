<template>
  <i
    :class="`fas fa-${name}${size ? ` fa-${size}x` : ''}`"
    @click="$emit('click')"
  ></i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    size: Number,
  },
};
</script>
