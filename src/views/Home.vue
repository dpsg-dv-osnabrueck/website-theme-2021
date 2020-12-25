<template>
  <div>
    <GridContainer>
      <GridRow>
        <GridCell width="12">
          <Title>{{ i18n.APP_TITLE }}</Title>
          <img :src="logo" width="300" />
        </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
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
};
</script>
