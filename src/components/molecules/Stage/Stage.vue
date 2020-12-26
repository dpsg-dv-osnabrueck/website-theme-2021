<template>
  <div ref="swiperContainer" class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(element, index) of elements"
        :key="index"
      >
        <div
          class="slide-content"
          :style="`background-image: url(${element.stageImage})`"
        >
          <div class="slide-overlay"></div>
          <div class="slide-body">
            <GridContainer>
              <GridRow>
                <GridCell width="4">
                  <Title size="2" subtitle class="has-text-white">
                    <span subtitle class="has-text-white">
                      {{ element.stageTitle }}
                    </span>
                  </Title>
                  <Title size="4" subtitle v-if="element.stageSubTitle">
                    <span subtitle class="has-text-white">
                      {{ element.stageSubTitle }}
                    </span>
                  </Title>
                  <div
                    class="buttons mt-6"
                    v-if="element.buttonLabel && element.buttonLink.post_name"
                    @click="goToPage(element.buttonLink.post_name)"
                  >
                    <button class="button is-primary is-light">
                      {{ element.buttonLabel }}
                      <i class="ml-3 fas fa-chevron-right"></i>
                    </button>
                  </div> </GridCell
                >x
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
import 'swiper/swiper-bundle.min.css';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Stage',
  data() {
    return {
      slider: null,
    };
  },
  methods: {
    ...mapActions('startpage', ['getStageElements']),
    goToPage(slug) {
      this.$router.push({ name: 'Page', params: { slug } });
    },
  },
  computed: {
    ...mapState(['startpage']),
    elements() {
      return this.startpage.stageElements;
    },
  },
  mounted() {
    this.getStageElements().then(() => {
      this.slider = new Swiper(this.$refs.swiperContainer, {
        loop: true,
        autoplay: {
          delay: 10000,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
      });
    });
  },
};
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 460px;
}
.slide {
  &-content {
    background-size: cover;
    height: 100%;
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
      rgba(0, 35, 67, 0.6) 58%,
      rgba(0, 35, 67, 0.3) 100%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      rgba(0, 35, 67, 1) 0%,
      rgba(0, 35, 67, 0.6) 58%,
      rgba(0, 35, 67, 0.3) 100%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      rgba(0, 35, 67, 1) 0%,
      rgba(0, 35, 67, 0.6) 58%,
      rgba(0, 35, 67, 0.3) 100%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#002343',
    endColorstr='#4d002343',GradientType=1 ); /* IE6-9 */
    opacity: 0.9;
  }

  &-body {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    height: 100%;
    z-index: 2;
    position: relative;
  }
}
</style>
