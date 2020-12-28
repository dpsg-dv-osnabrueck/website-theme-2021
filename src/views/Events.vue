<template>
  <GridContainer
    :class="`my-6${mq.small.is ? ' px-3' : ''}`"
    ref="contentContainer"
  >
    <GridRow isCentered class="mb-4">
      <GridCell width="8">
        <Title size="2">{{ i18n.APP_EVENTS_TITLE }}</Title>
      </GridCell>
    </GridRow>
    <EventEntry v-for="(event, index) of events" :key="index" :event="event" />
  </GridContainer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import EventEntry from '@/components/molecules/EventEntry/EventEntry.vue';
import { sortBy } from 'lodash';
import MediaQueries from '@/mixins/MediaQueries';

export default {
  name: 'Events',
  mixins: [MediaQueries],
  components: {
    EventEntry,
  },
  computed: {
    ...mapState(['options']),
    ...mapGetters('i18n', ['i18n']),
    events() {
      return sortBy(this.options.data.acf.events.eventList, ['startDate']);
    },
  },
  methods: {
    setTitle() {
      document.title = `${this.i18n.APP_TITLE} - ${this.i18n.APP_EVENTS_TITLE}`;
    },
  },
  mounted() {
    this.setTitle();
  },
};
</script>
