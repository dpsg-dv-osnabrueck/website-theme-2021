<template>
  <div class="container mx-auto">
    <h1>{{ i18n.APP_TITLE }}</h1>
    <img :src="logo" width="300" />

    <a @click="getData">getData</a>

    <a @click="postData">postData</a>

    <a @click="changeLocale('en-EN')">changeLocale</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import logo from '@/assets/img/logo.png';
import formData from '@/mixins/formData';

export default {
  name: 'Home',
  computed: {
    ...mapGetters('i18n', ['i18n']),
    logo() {
      return logo;
    },
  },
  mixins: [formData],
  methods: {
    ...mapActions({
      postData: 'exampleModule/postData',
      getData: 'exampleModule/getData',
      changeLocale: 'i18n/changeLocale',
      goToPage() {
        this.$router.push({ name: 'Pattern Library' });
      },
    }),
  },
};
</script>
