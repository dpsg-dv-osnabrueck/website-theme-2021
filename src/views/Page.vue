<template>
  <div class="my-6">
    <GridContainer>
      <div v-if="page.requestStatus === status.ready">
        <GridRow isCentered>
          <GridCell :width="{ tablet: 8, widescreen: 6 }">
            <div v-if="featuredImage" class="featuredImage mb-6">
              <img :src="featuredImage" />
              <div class="p-3 mb-3 has-background-primary">
                <Title>
                  <span class="has-text-white">
                    {{ title }}
                  </span>
                </Title>
              </div>
            </div>
            <div v-else>
              <Title class="mb-2">{{ title }}</Title>
            </div>
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

    featuredImage() {
      if (!this.currentPage.featuredImage) return null;
      return this.currentPage.featuredImage.source_url;
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
<style lang="scss" scoped>
.featuredImage {
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-end;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > div {
    position: absolute;
    opacity: 0.8;
  }
}
</style>
