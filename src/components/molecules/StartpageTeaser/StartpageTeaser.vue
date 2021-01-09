<template>
  <GridContainer :class="`my-6${mq.medium.down ? ' px-3' : ''}`">
    <GridRow>
      <GridCell width="4">
        <RenderImage :src="image" is3by2 />
      </GridCell>
      <GridCell width="6" class="flex-left-center">
        <Title size="3" class="mb-5" subtitle>{{ teaser.teaserTitle }}</Title>
        <div v-html="teaser.teaserText"></div>
        <Button
          class="is-primary mt-5"
          @click="
            goToPage(teaser.teaserLink.post_name, teaser.teaserLink.post_type)
          "
          iconName="chevron-right"
          iconRight
        >
          {{ teaser.teaserLinkLabel }}
        </Button>
      </GridCell>
    </GridRow>
  </GridContainer>
</template>

<script>
import { mapState } from 'vuex';
import goToPage from '@/mixins/goToPage';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'StartpageTeaser',
  mixins: [goToPage, MediaQueries],
  computed: {
    ...mapState(['options']),
    teaser() {
      return this.options.data.acf.startpageTeaser;
    },
    image() {
      return this.teaser.teaserImage.sizes['is-3by2'];
    },
  },
};
</script>
