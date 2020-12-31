<template>
  <div id="app-container">
    <div v-if="status.ready === requestStatus">
      <Navigation />
      <div ref="appBody" id="app-body">
        <router-view />
      </div>
      <div ref="appFooter" id="app-footer">
        <Footer />
      </div>
    </div>
    <ProgressBar :status="requestStatus" />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Navigation from '@/components/molecules/Navigation/Navigation.vue';
import requestStatus from '@/data/requestStatus';
import Footer from '@/components/molecules/Footer/Footer.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
  },
  computed: {
    ...mapState(['requestStatus']),
    ...mapGetters('i18n', ['i18n']),
    status() {
      return requestStatus;
    },

    footerHeight() {
      return this.$refs.appFooter.clientHeight;
    },
  },
  methods: {
    ...mapActions(['initializePage']),
    setTitle() {
      document.title = `${this.i18n.APP_TITLE}`;
    },
    setFooterHeight() {
      const { appBody } = this.$refs;
      if (appBody) {
        appBody.style.paddingBottom = `${this.footerHeight}px`;
      }
    },
  },
  mounted() {
    this.setTitle();
    this.initializePage();
    this.setFooterHeight();
  },
  updated() {
    this.setTitle();
    this.setFooterHeight();
  },
};
</script>
