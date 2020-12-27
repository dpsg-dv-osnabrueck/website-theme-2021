<template>
  <div class="has-background-light py-6">
    <GridContainer v-if="status.ready === instagram.requestStatus">
      <GridRow>
        <GridCell>
          <Title size="3" subtitle>{{ i18n.APP_INSTAGRAM_TITLE }}</Title>
        </GridCell>
      </GridRow>
      <GridRow isMultiline>
        <GridCell width="3" v-for="(item, index) of posts" :key="index">
          <div v-if="index <= 3" class="card">
            <div class="is-relative">
              <div class="card-image">
                <img
                  :src="item.media_url"
                  v-if="
                    item.media_type === 'IMAGE' ||
                    item.media_type === 'CAROUSEL_ALBUM'
                  "
                  class="image"
                />
                <video
                  v-if="item.media_type === 'VIDEO'"
                  width="320"
                  height="240"
                  controls
                >
                  <source :src="item.media_URL" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div class="card-content flex-left-bottom">
                <div
                  class="content has-text-white"
                  v-html="transformText(item.caption)"
                ></div>
                <a :href="item.permalink" target="_blank">
                  <button class="button is-primary is-light is-small">
                    <i class="mr-2 fa-2x fab fa-instagram"></i>
                    {{ i18n.APP_INSTAGRAM_LABEL }}
                    <i class="ml-3 fas fa-chevron-right"></i>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </GridCell>
      </GridRow>
    </GridContainer>

    <GridContainer v-else>
      <GridRow isCentered>
        <GridCell :width="{ tablet: 8, widescreen: 6 }">
          <progress class="progress is-small is-info my-6" max="100"></progress>
        </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import requestStatus from '@/data/requestStatus';

export default {
  name: 'InstagramFeed',
  methods: {
    ...mapActions('instagram', ['refreshToken', 'getFeed']),

    transformText(text) {
      const formatted = text.replace(/\n/g, '<br />');
      const chars = formatted.length;
      const limit = 160;

      if (chars >= limit) {
        return `${formatted.substring(0, limit)}...`;
      }

      return formatted;
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

    this.getFeed();
  },
};
</script>
<style lang="scss" scoped>
.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: -moz-linear-gradient(
    top,
    rgba(0, 35, 67, 0.2) 0%,
    rgba(0, 35, 67, 0.8) 40%,
    rgba(0, 35, 67, 1) 100%
  ); /* FF3.6-15 */
  background: -webkit-linear-gradient(
    top,
    rgba(0, 35, 67, 0.2) 0%,
    rgba(0, 35, 67, 0.8) 40%,
    rgba(0, 35, 67, 1) 100%
  ); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(
    to bottom,
    rgba(0, 35, 67, 0.2) 0%,
    rgba(0, 35, 67, 0.8) 40%,
    rgba(0, 35, 67, 1) 100%
  ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33002343',
  endColorstr='#002343',GradientType=0 ); /* IE6-9 */
}
.card-image {
  filter: grayscale(60%) blur(1px);
  transition: 0.5s;
}
</style>
