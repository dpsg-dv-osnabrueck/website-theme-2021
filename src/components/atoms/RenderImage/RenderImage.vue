<template>
  <div class="card">
    <div class="card-image">
      <figure :class="classes">
        <transition name="fade">
          <img :src="src" @load="initImage" v-show="isLoaded" />
        </transition>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Render',
  props: {
    src: String,
    is16: Boolean,
    is24: Boolean,
    is32: Boolean,
    is48: Boolean,
    is64: Boolean,
    is96: Boolean,
    is128: Boolean,
    isSquare: Boolean,
    is5by4: Boolean,
    is4by3: Boolean,
    is3by2: Boolean,
    is16by9: Boolean,
    is2by1: Boolean,
    is3by1: Boolean,
    is4by5: Boolean,
    is3by4: Boolean,
    is2by3: Boolean,
    is3by5: Boolean,
    is9by16: Boolean,
    is1by2: Boolean,
    is1by3: Boolean,
    isRounded: Boolean,
  },
  data() {
    return {
      classNames: {
        is16: 'is-16x16',
        is24: 'is-24x24',
        is32: 'is-32x32',
        is48: 'is-48x48',
        is64: 'is-64x64',
        is96: 'is-96x96',
        is128: 'is-128x128',
        isSquare: 'is-square',
        is5by4: 'is-5by4',
        is4by3: 'is-4by3',
        is3by2: 'is-3by2',
        is16by9: 'is-16by9',
        is2by1: 'is-2by1',
        is3by1: 'is-3by1',
        is4by5: 'is-4by5',
        is3by4: 'is-3by4',
        is2by3: 'is-2by3',
        is3by5: 'is-3by5',
        is9by16: 'is-9by16',
        is1by2: 'is-1by2',
        is1by3: 'is-1by3',
        isRounded: 'is-rounded',
      },
      isLoaded: false,
    };
  },
  computed: {
    classes() {
      const classes = ['image', 'animatedBackground'];

      Object.keys(this.classNames).forEach((key) => {
        if (this[key]) {
          classes.push(this.classNames[key]);
        }
      });
      return classes.join(' ');
    },
  },
  methods: {
    initImage() {
      this.isLoaded = true;
    },
  },
};
</script>
