<template>
  <div ref="appRoot">
    <div v-if="status.ready === requestStatus">
      <Navigation />
      <div ref="rootContent">
        <router-view />
      </div>
      <Footer />
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
  },
  methods: {
    ...mapActions(['initializePage']),
    setTitle() {
      document.title = `${this.i18n.APP_TITLE}`;
    },
    setAppHeight() {
      const { rootContent } = this.$refs;

      if (rootContent) {
        const windowHeight = window.innerHeight;
        const appHeight = this.$refs.appRoot.clientHeight;
        const offset = windowHeight - appHeight;
        const newContentHeight = windowHeight - offset;

        if (offset > 0) {
          rootContent.setAttribute('style', `min-height:${newContentHeight}px`);
        }
      }
    },
  },
  mounted() {
    this.setTitle();
    this.initializePage();
  },
  updated() {
    this.setAppHeight();
    this.setTitle();
  },
};
</script>
