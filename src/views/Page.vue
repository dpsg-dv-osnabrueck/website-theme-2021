<template>
  <div :class="`my-6${mq.small.is ? ' px-3' : ''}`">
    <GridContainer>
      <GridRow isCentered>
        <GridCell :width="{ tablet: 10, widescreen: 8 }">
          <div v-if="page.requestStatus === status.ready">
            <GridRow isMultiline>
              <GridCell width="12" v-if="subNav && mq.small.is">
                <SubNavigationMobile
                  :data="subNav"
                  :activePage="currentPage.slug"
                  v-if="subNav.children"
                />
              </GridCell>
              <GridCell
                :width="`${subNav ? { tablet: 8, widescreen: 9 } : '12'}`"
              >
                <img :src="wayStart" />
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
                <TeamMember :data="teamMember" v-if="teamMember" />
                <Tribes :data="tribes" v-if="tribes" />
                <GridCell width="12" class="has-text-right">
                  <img :src="wayEnd" />
                </GridCell>
              </GridCell>

              <GridCell
                :width="{ tablet: 4, widescreen: 3 }"
                v-if="subNav && !mq.small.is"
              >
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
              <GridCell>
                <progress
                  class="progress is-small is-info my-6"
                  max="100"
                ></progress>
              </GridCell>
            </GridRow>
          </div>
        </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import requestStatus from '@/data/requestStatus';
import SubNavigation from '@/components/molecules/SubNavigation/SubNavigation.vue';
import SubNavigationMobile from '@/components/molecules/SubNavigation/SubNavigationMobile.vue';
import TeamMember from '@/components/molecules/TeamMember/TeamMember.vue';
import wayStart from '@/assets/img/wayStart.svg';
import wayEnd from '@/assets/img/wayEnd.svg';
import Tribes from '@/components/molecules/Tribes/Tribes.vue';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'Page',
  mixins: [MediaQueries],
  components: {
    SubNavigation,
    SubNavigationMobile,
    TeamMember,
    Tribes,
  },
  computed: {
    ...mapState(['page', 'menus']),
    ...mapGetters('i18n', ['i18n']),
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
      return this.currentPage.featuredImage;
    },

    teamMember() {
      if (!this.currentPage.acf.teammember) return null;
      return this.currentPage.acf.teammember;
    },

    tribes() {
      if (!this.currentPage.acf.tribes) return null;
      return this.currentPage.acf.tribes;
    },

    wayStart() {
      return wayStart;
    },

    wayEnd() {
      return wayEnd;
    },
  },
  methods: {
    ...mapActions('page', ['loadPageData', 'resetPage']),

    setTitle() {
      document.title = `${this.i18n.APP_TITLE} - ${this.currentPage.title.rendered}`;
    },

    loadPage(slug) {
      this.loadPageData(slug).then(() => {
        this.setTitle();
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.loadPage(to.params.slug);
    next();
  },

  mounted() {
    this.loadPage(this.$route.params.slug);
  },
  updated() {
    if (this.page.requestStatus === this.status.error) {
      this.$router.push({ name: 'page', params: { slug: 'not-found' } });
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
