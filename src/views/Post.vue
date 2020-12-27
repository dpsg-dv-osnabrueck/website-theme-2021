<template>
  <div class="my-6">
    <GridContainer>
      <div v-if="post.requestStatus === status.ready">
        <GridRow isCentered>
          <GridCell :width="{ tablet: 8, widescreen: 6 }">
            <div v-if="featuredImage" class="featuredImage mb-6">
              <img :src="featuredImage" />
              <div class="p-3 mb-3 has-background-primary">
                <Title>
                  <span class="has-text-white">
                    {{ title }}
                  </span>
                </Title>
              </div>
            </div>
            <div v-else>
              <Title class="mb-2">{{ title }}</Title>
            </div>
            <div v-html="content" class="content"></div>
          </GridCell>
        </GridRow>
      </div>
      <div v-if="post.requestStatus === status.loading">
        <GridRow isCentered>
          <GridCell :width="{ tablet: 8, widescreen: 6 }">
            <progress
              class="progress is-small is-info my-6"
              max="100"
            ></progress>
          </GridCell>
        </GridRow>
      </div>
    </GridContainer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import requestStatus from '@/data/requestStatus';

export default {
  name: 'Post',
  computed: {
    ...mapState(['post']),
    status() {
      return requestStatus;
    },

    currentPost() {
      return this.post.currentPost;
    },

    content() {
      return this.currentPost.content.rendered;
    },

    title() {
      return this.currentPost.title.rendered;
    },

    featuredImage() {
      if (!this.currentPost.featuredImage) return null;
      return this.currentPost.featuredImage;
    },
  },
  methods: {
    ...mapActions('post', ['loadPostData']),
  },

  beforeRouteUpdate(to, from, next) {
    this.loadPostData(to.params.slug);
    next();
  },

  mounted() {
    this.loadPostData(this.$route.params.slug);
  },
};
</script>
<style lang="scss" scoped>
.featuredImage {
  width: 100%;
  height: 300px;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: flex-end;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  > div {
    position: absolute;
    opacity: 0.8;
  }
}
</style>
