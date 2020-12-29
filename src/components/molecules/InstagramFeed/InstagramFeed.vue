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
              <a
                :class="overlayClasses"
                @click="openInsta(item.permalink)"
                :title="i18n.APP_INSTAGRAM_LABEL"
              >
                <Icon name="external-link-alt" size="2" class="mb-3" />
                <div>{{ i18n.APP_INSTAGRAM_LABEL }}</div>
              </a>
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
    openInsta(url) {
      window.open(url, '_blank');
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

    overlayClasses() {
      return 'card-overlay has-background-primary has-text-white flex-center-center-column is-clickable';
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
.card {
  &-overlay {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.2s ease-out;
    &:hover {
      transition: opacity 0.3s ease-out;
      opacity: 0.7;
    }
  }
}
</style>
