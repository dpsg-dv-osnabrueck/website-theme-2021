<template>
  <div class="content">
    <GridContainer>
      <GridRow isCentered>
        <GridCell :width="{ tablet: 8, widescreen: 6 }">
          <div v-if="page.requestStatus === status.ready" class="my-6">
            <Title class="mb-2">{{ title }}</Title>
            <div v-html="content"></div>
          </div>
          <div v-else>
            <progress
              class="progress is-small is-info my-6"
              max="100"
            ></progress>
          </div>
        </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import requestStatus from '@/data/requestStatus';

export default {
  name: 'Page',
  computed: {
    ...mapState(['page']),
    status() {
      return requestStatus;
    },
    content() {
      return this.page.currentPage.content.rendered;
    },
    title() {
      return this.page.currentPage.title.rendered;
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
};
</script>
