<template>
  <div>
    <Stage />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '@/assets/img/logo.png';
import formData from '@/mixins/formData';
import Stage from '@/components/molecules/Stage/Stage.vue';

export default {
  name: 'Home',
  components: {
    Stage,
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
    logo() {
      return logo;
    },
  },
  mixins: [formData],
};
</script>
