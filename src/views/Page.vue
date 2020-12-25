<template>
  <div class="my-6">
    <GridContainer>
      <div v-if="page.requestStatus === status.ready">
        <GridRow isCentered>
          <GridCell :width="{ tablet: 8, widescreen: 6 }">
            <Title class="mb-2">{{ title }}</Title>
            <div v-html="content" class="content"></div>
          </GridCell>
          <GridCell :width="{ tablet: 3, widescreen: 2 }" v-if="subNav">
            <SubNavigation
              :data="subNav"
              :activePage="currentPage.slug"
              v-if="subNav.children"
            />
          </GridCell>
        </GridRow>
      </div>
      <div v-if="page.requestStatus === status.loading">
        <GridRow isCentered>
          <GridCell :width="{ tablet: 8, widescreen: 6 }">
            <progress
              class="progress is-small is-info my-6"
              max="100"
            ></progress>
          </GridCell>
        </GridRow>
      </div>
    </GridContainer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import requestStatus from '@/data/requestStatus';
import SubNavigation from '@/components/molecules/SubNavigation/SubNavigation.vue';

export default {
  name: 'Page',
  components: {
    SubNavigation,
  },
  computed: {
    ...mapState(['page', 'menus']),
    status() {
      return requestStatus;
    },

    currentPage() {
      return this.page.currentPage;
    },

    content() {
      return this.currentPage.content.rendered;
    },

    title() {
      return this.currentPage.title.rendered;
    },

    subNav() {
      return this.page.subNav;
    },
  },
  methods: {
    ...mapActions('page', ['getPage', 'resetPage']),
    loadData(slug) {
      this.getPage(slug);
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params.slug);
    next();
  },

  mounted() {
    this.loadData(this.$route.params.slug);
  },
  updated() {
    console.log(this.page.requestStatus, this.status.error);
    if (this.page.requestStatus === this.status.error) {
      this.$router.push({ name: 'Page', params: { slug: 'not-found' } });
    }
  },
};
</script>
