<template>
  <div :class="`my-6${mq.small.is ? ' px-3' : ''}`">
    <GridContainer>
      <GridRow isCentered>
        <GridCell :width="{ tablet: 10, widescreen: 8 }">
          <div v-if="post.requestStatus === status.ready">
            <GridRow isMultiline>
              <GridCell width="12">
                <img :src="wayStart" />
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

                <GridCell width="12" class="has-text-right">
                  <img :src="wayEnd" />
                </GridCell>
              </GridCell>
            </GridRow>
          </div>

          <div v-if="post.requestStatus === status.loading">
            <GridRow isCentered>
              <GridCell>
                <progress
                  class="progress is-small is-info my-6"
                  max="100"
                ></progress>
              </GridCell>
            </GridRow>
          </div>
        </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import requestStatus from '@/data/requestStatus';
import wayStart from '@/assets/img/wayStart.svg';
import wayEnd from '@/assets/img/wayEnd.svg';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'Post',
  mixins: [MediaQueries],
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

    wayStart() {
      return wayStart;
    },

    wayEnd() {
      return wayEnd;
    },
  },
  methods: {
    ...mapActions('post', ['loadPostData']),

    setTitle() {
      document.title = `${this.i18n.APP_TITLE} - ${this.currentPost.title.rendered}`;
    },

    loadPost(slug) {
      this.loadPageData(slug).then(() => {
        this.setTitle();
      });
    },
  },

  beforeRouteUpdate(to, from, next) {
    this.loadPost(to.params.slug);
    next();
  },

  mounted() {
    this.loadPost(this.$route.params.slug);
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
