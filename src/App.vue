<template>
  <router-view/>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters('i18n', ['i18n']),
  },
  methods: {
    setTitle() {
      if (this.$router.history.current.name) {
        document.title = `${this.i18n.APP_TITLE} - ${this.$router.history.current.name}`;
      }
    },
  },
  mounted() {
    this.setTitle();
  },
  updated() {
    this.setTitle();
  },
};
</script>
