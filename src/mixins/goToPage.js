import regex from '@/data/regex';

export default {
  methods: {
    goToPage(slug, type, url) {
      if (type === 'custom' && url.match(regex.routerLink)) {
        this.$router.push({ name: url.split('.')[1] });
      } else if (type === 'custom' && url) {
        window.open(
          url, '_blank',
        );
      }

      if (type === 'custom') return;

      this.$router.push({ name: type, params: { slug } }).catch(() => {
        console.log('Gleiche Seite ;-)');
      });
    },
  },
};
