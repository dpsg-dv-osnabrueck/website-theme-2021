<template>
  <aside class="menu">
    <p class="menu-label">{{ i18n.APP_PAGE_SUB_NAV_TITLE }}</p>
    <ul class="menu-list">
      <li
        v-for="(item, index) of items"
        :key="index"
        @click="goToPage(item.object_slug)"
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

export default {
  name: 'SubNavigation',
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
      console.log(this.activePage, this.data.object_slug);
      return this.activePage === this.data.object_slug;
    },
  },
  methods: {
    goToPage(slug) {
      this.$router.push({ name: 'Page', params: { slug } });
    },
  },
};
</script>
