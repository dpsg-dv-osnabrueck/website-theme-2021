<template>
  <div>
    <GridRow class="mb-4" isCentered v-if="!pastDate">
      <GridCell width="8">
        <div class="card blueBorder">
          <div class="card-content">
            <GridRow vCentered>
              <GridCell with="6">
                <Title size="5" subtitle>
                  <Icon
                    name="calendar-alt"
                    class="mr-3 has-text-grey-lighter"
                  />
                  {{ event.eventTitle }}
                </Title>
              </GridCell>
              <GridCell class="has-text-right-tablet">
                <div v-if="!event.oneDayEvent">
                  <span class="has-text-grey-light">
                    {{ i18n.APP_EVENTS_FROM }}:
                  </span>
                  {{ transformDate(this.event.startDate) }}
                  {{ event.startTime ? ` - ${event.startTime}` : "" }}
                </div>
                <div v-if="!event.oneDayEvent">
                  <span class="has-text-grey-light">
                    {{ i18n.APP_EVENTS_TO }}:
                  </span>
                  {{ transformDate(event.endDate) }}
                  {{ event.endTime ? ` - ${event.endTime}` : "" }}
                </div>
                <div v-if="event.oneDayEvent">
                  <div>
                    <span class="has-text-grey-light">
                      {{ i18n.APP_EVENTS_DATE }}:
                    </span>
                    {{ transformDate(this.event.startDate) }}
                  </div>
                  <div v-if="event.startTime">
                    <span class="has-text-grey-light">
                      {{ i18n.APP_EVENTS_TIME }}:
                    </span>
                    {{ event.startTime ? ` ${event.startTime}` : "" }}
                    {{ event.endTime ? ` - ${event.endTime}` : "" }}
                  </div>
                </div>
              </GridCell>
              <GridCell class="has-text-right" width="1">
                <Icon
                  :name="`chevron-${details ? 'up' : 'down'}`"
                  v-if="!noDetails"
                  class="ml-3 is-clickable"
                  @click="details = !details"
                />
                <Icon
                  name="chevron-down"
                  v-if="noDetails"
                  class="has-text-grey-lighter ml-3"
                />
              </GridCell>
            </GridRow>
            <GridRow v-if="details">
              <GridCell>
                <Title size="6" class="mb-2">
                  {{ i18n.APP_EVENTS_DETAILS }}:
                </Title>
                <div v-html="event.eventInformation" class="mb-4"></div>
                <a
                  v-if="event.internalLink"
                  @click="
                    goToPage(
                      event.internalLink.post_name,
                      event.internalLink.post_type
                    )
                  "
                >
                  {{ event.internalLinkLabel }}
                  <Icon name="chevron-right" class="ml-3" />
                </a>
                <a
                  v-if="event.externalLink"
                  :href="event.externalLink"
                  target="_blank"
                >
                  {{ event.externalLinkLabel }}
                  <Icon name="chevron-right" class="ml-3" />
                </a>
              </GridCell>
            </GridRow>
          </div>
        </div>
      </GridCell>
    </GridRow>
  </div>
</template>

<script>
import dateHelper from '@/helper/dateHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'EventEntry',
  props: {
    event: Object,
  },
  data() {
    return {
      details: false,
    };
  },
  methods: {
    goToPage(slug, type) {
      this.$router.push({ name: type, params: { slug } });
    },
    transformDate(date) {
      return dateHelper(date);
    },
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
    noDetails() {
      return !this.event.eventInformation && !this.event.internalLink && !this.event.externalLink;
    },
    pastDate() {
      const today = new Date().getTime();
      const eventDate = new Date(this.event.startDate).getTime();
      return today > eventDate;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/main";
.blueBorder {
  border-left: 6px solid $info;
}
</style>
