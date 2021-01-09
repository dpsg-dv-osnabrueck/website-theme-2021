<template>
  <div :class="`my-6${mq.medium.down ? ' px-3' : ''}`">
    <GridContainer>
      <GridRow isCentered>
        <GridCell :width="{ tablet: 10, widescreen: 8 }">
          <transition name="fade">
            <div v-if="post.requestStatus === status.ready">
              <GridRow isMultiline>
                <GridCell width="12">
                  <img :src="wayStart" />

                  <div>
                    <Title class="mb-2">{{ title }}</Title>
                  </div>

                  <RenderImage
                    :src="featuredImage"
                    v-if="featuredImage"
                    is3by2
                    class="mb-6"
                  />
                  <div v-html="content" class="content"></div>

                  <GridCell width="12" class="has-text-right">
                    <img :src="wayEnd" />
                  </GridCell>
                </GridCell>
              </GridRow>
            </div>
          </transition>
          <transition name="fade">
            <ProgressBar :status="post.requestStatus" />
          </transition>
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
