<template>
  <div :class="`my-6${mq.medium.down ? ' px-3' : ''}`">
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
          v-for="(item, index) of teaserItems"
          :key="index"
          class="swiper-slide"
        >
          <GridContainer class="mb-6">
            <GridRow>
              <GridCell width="4">
                <GridRow v-if="item.topicImage">
                  <GridCell>
                    <RenderImage
                      :src="item.topicImage.sizes['is-3by2']"
                      is3by2
                    />
                  </GridCell>
                </GridRow>
              </GridCell>
              <GridCell width="6" class="flex-left-center">
                <GridRow>
                  <GridCell>
                    <Title size="3" subtitle class="mb-5">
                      {{ item.topicTitle }}
                    </Title>
                    <div
                      v-html="item.topicDescription"
                      class="mb-5 content"
                    ></div>
                    <Button
                      class="is-primary"
                      @click="
                        goToPage(
                          item.topicPage.post_name,
                          item.topicPage.post_type
                        )
                      "
                      iconName="chevron-right"
                      iconRight
                    >
                      {{ i18n.APP_PAGE_TEASER_BUTTON_LABEL }}
                    </Button>
                  </GridCell>
                </GridRow>
              </GridCell>
            </GridRow>
          </GridContainer>
        </div>
      </div>
    </div>
    <GridContainer>
      <GridRow isMobile>
        <GridCell class="has-text-center">
          <Button
            @click="prev"
            iconName="chevron-left"
            :disabled="!prevActive"
            v-if="mq.small.is"
            iconOnly
          />
          <Button
            @click="prev"
            iconName="chevron-left"
            :disabled="!prevActive"
            v-else
          >
            {{ i18n.APP_PAGE_TEASER_PREV }}
          </Button>
        </GridCell>
        <GridCell class="has-text-right">
          <Button
            @click="next"
            iconName="chevron-right"
            iconRight
            :disabled="!nextActive"
            v-if="mq.small.is"
            iconOnly
          />
          <Button
            v-else
            @click="next"
            iconName="chevron-right"
            iconRight
            :disabled="!nextActive"
          >
            {{ i18n.APP_PAGE_TEASER_NEXT }}
          </Button>
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
