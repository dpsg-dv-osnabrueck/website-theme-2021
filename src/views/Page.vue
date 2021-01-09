<template>
  <div :class="`my-6${mq.medium.down ? ' px-3' : ''}`">
    <GridContainer>
      <GridRow isCentered>
        <GridCell :width="{ tablet: 10, widescreen: 8 }">
          <transition name="fade">
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

                  <div>
                    <Title class="mb-2">{{ title }}</Title>
                  </div>

                  <RenderImage
                    :src="featuredImage"
                    v-if="featuredImage"
                    is3by2
                  />

                  <ContactForm v-if="currentPage.template === 'contact.php'" />

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
          </transition>
          <transition name="fade">
            <ProgressBar :status="page.requestStatus" />
          </transition>
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
import ContactForm from '@/components/molecules/ContactForm/ContactForm.vue';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'Page',
  mixins: [MediaQueries],
  components: {
    SubNavigation,
    SubNavigationMobile,
    TeamMember,
    Tribes,
    ContactForm,
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
      this.resetPage();
      this.loadPageData(slug).then(() => {
        this.setTitle();
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.loadPage(to.params.slug);
    next();
  },

  beforeRouteLeave(to, from, next) {
    this.resetPage();
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

  unmounted() {
    this.resetPage();
  },
};
</script>
