<template>
  <div class="my-6">
    <GridContainer class="mb-5">
      <GridRow>
        <GridCell>
          <Title size="3" subtitle>
            {{ i18n.APP_PAGE_TEASER_TITLE }}
            <span class="is-size-6"
              >{{ activeSlide }}/{{ teaserItems.length }}</span
            >
          </Title>
        </GridCell>
      </GridRow>
    </GridContainer>
    <div ref="pageTeaser" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          width="12"
          v-for="(item, index) of teaserItems"
          :key="index"
          class="swiper-slide"
        >
          <GridContainer class="mb-6">
            <GridRow>
              <GridCell width="4">
                <GridRow v-if="item.topicImage">
                  <GridCell>
                    <div class="card">
                      <div class="card-image">
                        <img
                          :src="item.topicImage.sizes.front_news"
                          class="image"
                        />
                      </div>
                    </div>
                  </GridCell>
                </GridRow>
              </GridCell>
              <GridCell width="6">
                <GridRow>
                  <GridCell class="flex-left-center" style="height: 100%">
                    <Title size="3" subtitle class="mb-5">
                      {{ item.topicPage.post_title }}
                    </Title>
                    <div
                      v-html="item.topicDescription"
                      class="mb-5 content"
                    ></div>
                    <a
                      @click="
                        goToPage(
                          item.topicPage.post_name,
                          item.topicPage.post_type
                        )
                      "
                      target="_blank"
                    >
                      <button class="button is-primary">
                        Mehr erfahren
                        <i class="ml-3 fas fa-chevron-right"></i>
                      </button>
                    </a>
                  </GridCell>
                </GridRow>
              </GridCell>
            </GridRow>
          </GridContainer>
        </div>
      </div>
    </div>
    <GridContainer>
      <GridRow>
        <GridCell class="has-text-center">
          <a
            @click="prev"
            class="mr-6"
            :class="{ 'has-text-grey-light': !prevActive }"
          >
            <i
              :class="`ml-3 fas fa-chevron-left${mq.small.is ? ' fa-2x' : ''}`"
            >
            </i>
            {{ !mq.small.is ? i18n.APP_PAGE_TEASER_PREV : "" }}
          </a>
          <a @click="next" :class="{ 'has-text-grey-light': !nextActive }">
            {{ !mq.small.is ? i18n.APP_PAGE_TEASER_NEXT : "" }}
            <i
              :class="`ml-3 fas fa-chevron-right${mq.small.is ? ' fa-2x' : ''}`"
            >
            </i>
          </a>
        </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Swiper from 'swiper/bundle';
import goToPage from '@/mixins/goToPage';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'PageTeaser',
  mixins: [goToPage, MediaQueries],
  data() {
    return {
      slider: null,
      activeSlide: 1,
      nextActive: true,
      prevActive: false,
    };
  },
  computed: {
    ...mapState(['options']),
    ...mapGetters('i18n', ['i18n']),

    teaserItems() {
      return this.options.data.acf.recentTopics.topicPages;
    },
  },
  methods: {
    slideSwitch() {},

    next() {
      if (this.nextActive) {
        this.slider.slideNext();
      }
    },

    prev() {
      if (this.prevActive) {
        this.slider.slidePrev();
      }
    },
  },
  mounted() {
    this.slider = new Swiper(this.$refs.pageTeaser);
    this.slider.on('slideChange', () => {
      this.activeSlide = this.slider.activeIndex + 1;
      this.prevActive = !this.slider.isBeginning;
      this.nextActive = !this.slider.isEnd;
    });
  },
};
</script>

<style>
.swiper-container {
  width: 100%;
}
</style>
