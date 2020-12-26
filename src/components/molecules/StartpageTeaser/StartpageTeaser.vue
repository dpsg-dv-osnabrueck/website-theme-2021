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
        <div
          class="buttons mt-5"
          @click="goToPage(teaser.teaserLink.post_name)"
        >
          <button class="button is-primary">
            {{ teaser.teaserLinkLabel }}
            <i class="ml-3 fas fa-chevron-right"></i>
          </button>
        </div>
      </GridCell>
    </GridRow>
  </GridContainer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'StartpageTeaser',
  computed: {
    ...mapState(['options']),
    teaser() {
      return this.options.data.acf.startpageTeaser;
    },
    image() {
      return this.teaser.teaserImage.sizes.front_news;
    },
  },
  methods: {
    goToPage(slug) {
      this.$router.push({ name: 'Page', params: { slug } });
    },
  },
};
</script>
