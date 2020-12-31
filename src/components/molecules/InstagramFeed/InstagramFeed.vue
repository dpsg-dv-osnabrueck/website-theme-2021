<template>
  <div class="has-background-light py-6">
    <transition name="fade">
      <GridContainer
        v-if="status.ready === instagram.requestStatus"
        :class="`${mq.medium.down ? ' px-3' : ''}`"
      >
        <GridRow>
          <GridCell>
            <Title size="3" subtitle>{{ i18n.APP_INSTAGRAM_TITLE }}</Title>
          </GridCell>
        </GridRow>
        <GridRow isMultiline v-if="!mq.small.is">
          <GridCell width="3" v-for="(item, index) of posts" :key="index">
            <PostCard v-if="index <= 3" :item="item" />
          </GridCell>
        </GridRow>
        <GridRow v-if="mq.small.is" isMobile>
          <GridCell width="12" class="mb-5">
            <div ref="instaSwiper" class="swiper-container mb-2">
              <div class="swiper-wrapper">
                <div
                  v-for="(item, index) of posts"
                  :key="index"
                  class="swiper-slide"
                >
                  <PostCard v-if="index <= 3" :item="item" />
                </div>
              </div>
            </div>
            <div class="is-relative">
              <div class="swiper-pagination is-relative"></div>
            </div>
          </GridCell>
        </GridRow>
        <GridRow>
          <GridCell>
            <div class="buttons is-centered">
              <a :href="i18n.APP_SOCIAL_INSTAGRAM_URL" target="_blank">
                <Button isOutlined fab iconName="instagram">
                  {{ i18n.APP_SOCIAL_INSTAGRAM_CTA }}
                </Button>
              </a>
            </div>
          </GridCell>
        </GridRow>
      </GridContainer>
    </transition>

    <ProgressBar :status="instagram.requestStatus" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import requestStatus from '@/data/requestStatus';
import PostCard from '@/components/molecules/InstagramFeed/PostCard.vue';
import Swiper from 'swiper/bundle';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'InstagramFeed',
  data() {
    return {
      slider: null,
    };
  },
  mixins: [MediaQueries],
  components: {
    PostCard,
  },
  methods: {
    ...mapActions('instagram', ['refreshToken', 'getFeed']),
    next() {
      this.slider.slideNext();
    },
  },
  computed: {
    ...mapState(['instagram']),
    ...mapGetters('i18n', ['i18n']),

    today() {
      return new Date().getTime();
    },

    creationDate() {
      return this.instagram.creationDateToken;
    },

    fourtyDays() {
      return 3456000000000;
    },

    difference() {
      return this.today - this.creationDate;
    },

    fortyDaysInPast() {
      return this.today - this.creationDate >= this.fortyDays;
    },

    status() {
      return requestStatus;
    },

    posts() {
      return this.instagram.data.filter((item, index) => index <= 3);
    },
  },
  mounted() {
    if (this.fortyDaysInPast) {
      this.refreshToken();
    }

    this.getFeed().then(() => {
      if (this.mq.small.is) {
        this.slider = new Swiper(this.$refs.instaSwiper, {
          loop: true,
          autoplay: {
            delay: 5000,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
          },
        });
      }
    });
  },
};
</script>
<style lang="scss">
.swiper-pagination-bullet {
  margin: 0 2px;
}
</style>
