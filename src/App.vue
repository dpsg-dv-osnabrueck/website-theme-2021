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
    <div v-else>
      <GridContainer>
        <GridRow isCentered>
          <GridCell :width="{ tablet: 8, widescreen: 6 }">
            <progress
              class="progress is-small is-info my-6"
              max="100"
            ></progress>
          </GridCell>
        </GridRow>
      </GridContainer>
    </div>
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
    ...mapState(['requestStatus', 'instagram']),
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
