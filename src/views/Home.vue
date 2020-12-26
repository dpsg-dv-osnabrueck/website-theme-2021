<template>
  <div>
    <Stage />
    <StartpageTeaser />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '@/assets/img/logo.png';
import formData from '@/mixins/formData';
import Stage from '@/components/molecules/Stage/Stage.vue';
import StartpageTeaser from '@/components/molecules/StartpageTeaser/StartpageTeaser.vue';

export default {
  name: 'Home',
  components: {
    Stage,
    StartpageTeaser,
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
