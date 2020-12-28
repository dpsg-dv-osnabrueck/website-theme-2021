<template>
  <div>
    <Stage />
    <div :class="`my-6${mq.small.is ? ' px-3' : ''}`">
      <StartpageTeaser />
      <InstagramFeed />
      <PageTeaser />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '@/assets/img/logo.png';
import Stage from '@/components/molecules/Stage/Stage.vue';
import StartpageTeaser from '@/components/molecules/StartpageTeaser/StartpageTeaser.vue';
import InstagramFeed from '@/components/molecules/InstagramFeed/InstagramFeed.vue';
import PageTeaser from '@/components/molecules/PageTeaser/PageTeaser.vue';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'Home',
  mixins: [MediaQueries],
  components: {
    Stage,
    StartpageTeaser,
    InstagramFeed,
    PageTeaser,
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
    logo() {
      return logo;
    },
  },
};
</script>
