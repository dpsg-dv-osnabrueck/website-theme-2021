<template>
  <GridContainer v-if="requestStatus.ready !== status" class="px-6">
    <GridRow isCentered isMobile>
      <GridCell width="12">
        <progress class="progress is-small is-info my-6" max="100"></progress>
      </GridCell>
    </GridRow>
  </GridContainer>
</template>

<script>
import requestStatus from '@/data/requestStatus';

export default {
  name: 'ProgressBar',
  props: {
    status: {
      type: Number,
      default: requestStatus.init,
    },
  },
  computed: {
    requestStatus() {
      return requestStatus;
    },
  },
};
</script>
