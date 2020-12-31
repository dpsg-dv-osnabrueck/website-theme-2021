<template>
  <div ref="swiperContainer" class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(element, index) of elements"
        :key="index"
      >
        <div class="slide-content">
          <div :class="`slide-image ${isInit ? 'isInit' : 'isNotInit'}`">
            <img :src="element.stageImage.sizes['1536x1536']" />
          </div>
          <div class="slide-overlay"></div>
          <div class="slide-body flex-left-center">
            <GridContainer :class="`my-6${mq.medium.down ? ' px-3' : ''}`">
              <GridRow>
                <GridCell :width="{ medium: 6, large: 4 }">
                  <Title size="2" subtitle class="has-text-white textShadow">
                    <span subtitle class="has-text-white">
                      {{ element.stageTitle }}
                    </span>
                  </Title>
                  <Title
                    size="4"
                    subtitle
                    v-if="element.stageSubTitle"
                    class="textShadow"
                  >
                    <span subtitle class="has-text-white">
                      {{ element.stageSubTitle }}
                    </span>
                  </Title>
                  <Button
                    class="is-primary is-light mt-6"
                    v-if="element.buttonLabel && element.buttonLink.post_name"
                    @click="
                      goToPage(
                        element.buttonLink.post_name,
                        element.buttonLink.post_type
                      )
                    "
                    iconName="chevron-right"
                    iconRight
                  >
                    {{ element.buttonLabel }}
                  </Button>
                </GridCell>
              </GridRow>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
import goToPage from '@/mixins/goToPage';
import { mapState } from 'vuex';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'Stage',
  mixins: [goToPage, MediaQueries],
  data() {
    return {
      slider: null,
      isInit: false,
    };
  },
  computed: {
    ...mapState(['options']),
    elements() {
      return this.options.data.acf.stageElements;
    },
  },
  mounted() {
    this.slider = new Swiper(this.$refs.swiperContainer, {
      loop: this.elements > 1,
      autoplay: {
        delay: 10000,
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
    });
    setTimeout(() => {
      this.isInit = true;
    }, 400);
  },
};
</script>
<style lang="scss" scoped>
.textShadow {
  text-shadow: 1px 1px 1px #333333;
}
.swiper-container {
  width: 100%;
  height: 460px;
}
.slide {
  &-content {
    height: 100%;
    background-color: #002343;
  }
  &-overlay {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#002343+0,002343+100&1+0,0.6+58,0.3+100 */
    background: -moz-linear-gradient(
      left,
      rgba(0, 35, 67, 1) 0%,
      rgba(0, 35, 67, 0.8) 30%,
      rgba(0, 35, 67, 0.3) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      rgba(0, 35, 67, 1) 0%,
      rgba(0, 35, 67, 0.8) 30%,
      rgba(0, 35, 67, 0.3) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      rgba(0, 35, 67, 1) 0%,
      rgba(0, 35, 67, 0.8) 30%,
      rgba(0, 35, 67, 0.3) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#002343',
    endColorstr='#4d002343',GradientType=1 ); /* IE6-9 */
    opacity: 0.5;
  }

  &-body {
    height: 100%;
    z-index: 2;
    position: relative;
  }

  &-image {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 0;
    height: 100%;
    width: 100%;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
    &.isInit {
      opacity: 1;
      transition: opacity 0.4s ease-in-out;
    }
    &.isNotInit {
      opacity: 0;
    }
  }
}
</style>
