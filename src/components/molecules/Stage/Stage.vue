<template>
  <GridContainer>
    <!-- Slider main container -->
    <div ref="swiperContainer" class="swiper-container">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" v-for="(item, index) of images" :key="index">
          <div class="slide-content">
            <div class="slide-body p-6"><slot></slot></div>
            <div class="slide-overlay"></div>
            <img :src="item" class="slide-image" />
          </div>
        </div>
      </div>
    </div>
  </GridContainer>
</template>

<script>
import Swiper from 'swiper';
import 'swiper/swiper-bundle.min.css';
import SliderSettings from '@/components/molecules/Stage/SliderSettings';
import scouts1 from '@/assets/img/scouts1.jpg';
import scouts2 from '@/assets/img/scouts2.jpg';

export default {
  name: 'Stage',
  methods: {
    next() {
      this.slider.slideNext();
    },
    prev() {
      this.slider.slidePrev();
    },
  },
  computed: {
    images() {
      return [scouts1, scouts2];
    },
  },
  mounted() {
    this.slider = new Swiper(this.$refs.swiperContainer, SliderSettings);
  },
};
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 500px;
}
.slide {
  &-content {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
  }
  &-overlay {
    position: absolute;
    left: 0;
    right: 0;
    z-index: 2;
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
  }
  &-image {
    position: relative;
    z-index: 1;
    width: 100%;
    height: auto;
    object-fit: cover;
    line-height: 0;
  }
  &-body {
    width: 33.3333333333%;
    z-index: 3;
    position: absolute;
  }
}
</style>
