<template>
  <aside class="menu">
    <div @click="menuIsActive = !menuIsActive" class="px-3">
      <GridRow
        isMobile
        class="mb-3 is-clickable button is-full-width is-medium"
      >
        <GridCell>
          <Title size="4" subtitle>{{ i18n.APP_PAGE_SUB_NAV_TITLE }}</Title>
        </GridCell>
        <GridCell width="3" class="has-text-right">
          <i
            :class="`ml-3 fas is-clickable fa-chevron-${
              menuIsActive ? 'up' : 'down'
            }`"
          >
          </i>
        </GridCell>
      </GridRow>
    </div>
    <ul class="menu-list" v-if="menuIsActive">
      <li
        v-for="(item, index) of items"
        :key="index"
        @click="goToPage(item.object_slug, item.object, item.url)"
      >
        <a :class="{ 'is-active': activePage === item.object_slug }">
          {{ item.title }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex';
import goToPage from '@/mixins/goToPage';

export default {
  name: 'SubNavigation',
  mixins: [goToPage],
  data() {
    return {
      selected: null,
      menuIsActive: false,
    };
  },
  props: {
    data: Object,
    activePage: String,
  },
  computed: {
    ...mapGetters('i18n', ['i18n']),
    items() {
      return this.data.children;
    },

    isActive() {
      return this.activePage === this.data.object_slug;
    },
  },
  methods: {
    touchAlert() {
      // eslint-disable-next-line no-alert
      alert('cool');
    },
  },
  mounted() {
    this.selected = this.activePage;
  },
};
</script>
