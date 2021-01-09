<template>
  <div>
    <div>
      <div v-for="(item, index) of data" :key="index" class="mb-6 mt-6">
        <GridRow>
          <GridCell width="12">
            <Title size="3">{{ item.name }} {{ item.lastname }}</Title>
            <Title size="5" subtitle>{{ item.position }}</Title>
          </GridCell>
        </GridRow>
        <GridRow>
          <GridCell width="6">
            <RenderImage :src="item.photo" is3by4 />
          </GridCell>
          <GridCell width="6">
            <div v-html="item.description"></div>
            <a :href="`mailto:${item.email}`">
              <span class="fa fa-envelope mr-2 mt-4"></span>
              {{ replaceString(i18n.APP_PAGE_TEAM_WRITE_MAIL, item.name) }}
            </a>
          </GridCell>
        </GridRow>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import stringReplacer from '@/helper/stringReplacer';

export default {
  name: 'TeamMember',
  props: {
    data: Array,
  },
  computed: {
    ...mapState(['page']),
    ...mapGetters('i18n', ['i18n']),
  },
  methods: {
    replaceString(string, value) {
      return stringReplacer(string, value);
    },
  },
};
</script>
