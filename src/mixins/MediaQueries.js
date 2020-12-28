export default {
  data() {
    return {
      windowWidth: 0,
      breakpoints: {
        medium: 769,
        large: 1024,
        xlarge: 1216,
        xxlarge: 1408,
      },
    };
  },
  mounted() {
    this.updateWindowWidth();
    window.addEventListener('resize', this.updateWindowWidth);
  },
  methods: {
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
    },

  },
  computed: {
    mq() {
      return {
        small: {
          is: this.windowWidth < this.breakpoints.medium,
          up: this.windowWidth > 0,
          down: this.windowWidth < this.breakpoints.medium,
        },
        medium: {
          is: this.windowWidth > this.breakpoints.medium
          && this.windowWidth < this.breakpoints.large,
          up: this.windowWidth > this.breakpoints.medium,
          down: this.windowWidth < this.breakpoints.large,
        },
        large: {
          is: this.windowWidth > this.breakpoints.large
          && this.windowWidth < this.breakpoints.xlarge,
          up: this.windowWidth > this.breakpoints.large,
          down: this.windowWidth < this.breakpoints.xlarge,
        },
        xlarge: {
          is: this.windowWidth > this.breakpoints.xlarge
          && this.windowWidth < this.breakpoints.xxlarge,
          up: this.windowWidth > this.breakpoints.xlarge,
          down: this.windowWidth < this.breakpoints.xxlarge,
        },
        xxlarge: {
          is: this.windowWidth > this.breakpoints.xxlarge,
          up: this.windowWidth > this.breakpoints.xxlarge,
        },
      };
    },
  },
};
