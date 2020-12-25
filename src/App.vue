<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navigation from '@/components/molecules/Navigation/Navigation.vue';

export default {
  name: 'App',
  components: {
    Navigation,
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
  },
  methods: {
    ...mapActions({
      getMenus: 'menus/getMenus',
      getPages: 'pages/getPages',
    }),
    setTitle() {
      if (this.$router.history.current.name) {
        document.title = `${this.i18n.APP_TITLE} - ${this.$router.history.current.name}`;
      }
    },
  },
  mounted() {
    this.setTitle();
    this.getMenus();
  },
  updated() {
    this.setTitle();
  },
};
</script>
