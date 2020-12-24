<template>
  <div>
    <GridContainer>
      <GridRow>
        <GridCell width="12">
          <Title>{{ i18n.APP_TITLE }}</Title>
          <img :src="logo" width="300" />
        </GridCell>
      </GridRow>
      <GridRow>
        <GridCell width="6">
          <div>
            <a @click="getData">getData</a>
          </div>
        </GridCell>
        <GridCell width="6">
          <div>
            <a @click="postData">postData</a>
          </div>
        </GridCell>
      </GridRow>
    </GridContainer>
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
