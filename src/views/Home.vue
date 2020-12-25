<template>
  <div>
    <Stage>
      <Title size="2" subtitle class="has-text-white">
        <span subtitle class="has-text-white">
          {{ i18n.APP_TITLE }}
        </span>
      </Title>
      <Title size="4">
        <span subtitle class="has-text-white">
          {{ i18n.APP_DESCRIPTION }}
        </span>
      </Title>
      <div class="buttons mt-6">
        <button class="button is-primary is-light">
          {{ i18n.APP_STAGE_CTA }} <i class="ml-3 fas fa-chevron-right"></i>
        </button>
      </div>
    </Stage>
    <GridContainer class="my-6">
      <GridRow>
        <GridCell width="4"> </GridCell>
      </GridRow>
    </GridContainer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import logo from '@/assets/img/logo.png';
import formData from '@/mixins/formData';
import Stage from '@/components/molecules/Stage/Stage.vue';

export default {
  name: 'Home',
  components: {
    Stage,
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
    logo() {
      return logo;
    },
  },
  mixins: [formData],
};
</script>
