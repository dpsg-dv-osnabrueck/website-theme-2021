<template>
  <GridContainer class="my-6">
    <GridRow>
      <GridCell width="4">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="image" />
            </figure>
          </div>
        </div>
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

export default {
  name: 'StartpageTeaser',
  mixins: [goToPage],
  computed: {
    ...mapState(['options']),
    teaser() {
      return this.options.data.acf.startpageTeaser;
    },
    image() {
      return this.teaser.teaserImage.sizes.front_news;
    },
  },
};
</script>
