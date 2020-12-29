<template>
  <div>
    <div v-for="(item, index) of data" :key="index">
      <div class="card mb-3">
        <div class="card-content">
          <GridRow vCentered isMobile>
            <GridCell :width="{ mobile: 4, tablet: 2 }" v-if="item.logo">
              <img :src="item.logo.sizes.gallery_overview" />
            </GridCell>
            <GridCell>
              <Title size="5" class="mb-2">
                {{ item.tribe }}
              </Title>
              <Title size="6" subtitle class="mb-2">
                <span class="has-text-grey">
                  {{ item.street ? `${item.street},` : "" }}
                  {{ item.zip }}
                  {{ item.city }}
                </span>
              </Title>
              <div v-if="item.url" class="mb-2">
                <Icon name="home" />
                <a :href="item.url">
                  {{ i18n.APP_PAGE_TRIBE_WEBSITE }}
                </a>
              </div>
              <div v-if="item.email">
                <Icon name="envelope" />
                <a :href="`mailto:${item.email}`">
                  {{
                    replaceString(i18n.APP_PAGE_TRIBE_MAIL_LABEL, item.tribe)
                  }}
                </a>
              </div>
            </GridCell>
          </GridRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import stringReplacer from '@/helper/stringReplacer';

export default {
  name: 'Tribes',
  props: {
    data: Array,
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
  },
  methods: {
    replaceString(string, value) {
      return stringReplacer(string, value);
    },
  },
};
</script>
