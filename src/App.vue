<template>
  <div>
    <div v-if="status.ready === requestStatus">
      <Navigation />
      <router-view />
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
    ...mapState(['requestStatus']),
    ...mapGetters('i18n', ['i18n']),
    status() {
      return requestStatus;
    },
  },
  methods: {
    ...mapActions(['initializePage']),
    setTitle() {
      if (this.$router.history.current.name) {
        document.title = `${this.i18n.APP_TITLE} - ${this.$router.history.current.name}`;
      }
    },
  },
  mounted() {
    this.setTitle();
    this.initializePage();
  },
  updated() {
    this.setTitle();
  },
};
</script>
