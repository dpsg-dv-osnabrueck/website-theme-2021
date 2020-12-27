<template>
  <div>
    <GridRow class="mb-4" isCentered v-if="!pastDate">
      <GridCell width="8">
        <div class="card blueBorder">
          <div class="card-content">
            <GridRow vCentered>
              <GridCell with="6">
                <Title size="5" subtitle>
                  <i class="fas fa-calendar-alt mr-3 has-text-grey-lighter">
                  </i>
                  {{ event.eventTitle }}
                </Title>
              </GridCell>
              <GridCell class="has-text-right">
                <div v-if="!event.oneDayEvent">
                  <span class="has-text-grey-light">Von:</span>
                  {{ transformDate(this.event.startDate) }}
                  {{ event.startTime ? ` - ${event.startTime}` : "" }}
                </div>
                <div v-if="!event.oneDayEvent">
                  <span class="has-text-grey-light">Bis:</span>
                  {{ transformDate(event.endDate) }}
                  {{ event.endTime ? ` - ${event.endTime}` : "" }}
                </div>
                <div v-if="event.oneDayEvent">
                  <div>
                    <span class="has-text-grey-light">Datum:</span>
                    {{ transformDate(this.event.startDate) }}
                  </div>
                  <div v-if="event.startTime">
                    <span class="has-text-grey-light">Uhrzeit:</span>
                    {{ event.startTime ? ` ${event.startTime}` : "" }}
                    {{ event.endTime ? ` - ${event.endTime}` : "" }}
                  </div>
                </div>
              </GridCell>
              <GridCell class="has-text-right" width="1">
                <i
                  v-if="!noDetails"
                  :class="`ml-3 fas is-clickable fa-chevron-${
                    details ? 'up' : 'down'
                  }`"
                  @click="details = !details"
                >
                </i>
                <i
                  v-if="noDetails"
                  class="has-text-grey-lighter ml-3 fas is-clickable fa-chevron-down"
                ></i>
              </GridCell>
            </GridRow>
            <GridRow v-if="details">
              <GridCell>
                <Title size="6" class="mb-2">Details:</Title>
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
                  <i class="ml-3 fas fa-chevron-right"></i>
                </a>
                <a
                  v-if="event.externalLink"
                  :href="event.externalLink"
                  target="_blank"
                >
                  {{ event.externalLinkLabel }}
                  <i class="ml-3 fas fa-chevron-right"></i>
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
