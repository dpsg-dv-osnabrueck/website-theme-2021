<template>
  <i
    :class="`${!fab ? 'fas' : 'fab'} fa-${name}${size ? ` fa-${size}x` : ''}`"
    @click="$emit('click')"
  >
  </i>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    name: String,
    size: String,
    fab: Boolean,
  },
};
</script>
