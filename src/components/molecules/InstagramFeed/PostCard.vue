<template>
  <div class="is-relative card">
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
          item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM'
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
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PostCard',
  props: {
    item: Object,
  },
  methods: {
    openInsta(url) {
      window.open(url, '_blank');
    },
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),

    overlayClasses() {
      return 'card-overlay has-background-primary has-text-white flex-center-center-column is-clickable';
    },
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
