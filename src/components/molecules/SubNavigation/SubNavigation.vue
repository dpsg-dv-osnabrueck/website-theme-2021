<template>
  <aside class="menu">
    <p class="menu-label">{{ i18n.APP_PAGE_SUB_NAV_TITLE }}</p>
    <ul class="menu-list">
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
};
</script>
