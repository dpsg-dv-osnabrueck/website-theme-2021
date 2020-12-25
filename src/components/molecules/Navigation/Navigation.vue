<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="#" :title="i18n.APP_TITLE">
        <img :src="logo" width="48" height="48" :alt="i18n.APP_TITLE" />
      </a>
      <a
        role="button"
        :class="['navbar-burger', isActive ? 'is-active' : '']"
        aria-label="menu"
        aria-expanded="false"
        data-target="mainNavigation"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="mainNavigation"
      :class="['navbar-menu', isActive ? 'is-active' : '']"
    >
      <div class="navbar-start">
        <a
          :class="navItemClasses(item.children)"
          v-for="(item, index) of menuItems"
          :key="index"
        >
          {{ !item.children ? item.title : null }}
          <a v-if="item.children" class="navbar-link" :title="item.title">
            {{ item.title }}
          </a>
          <div v-if="item.children" class="navbar-dropdown">
            <a
              v-for="(subItem, subIndex) of item.children"
              :key="subIndex"
              class="navbar-item"
              :title="subItem.title"
            >
              {{ subItem.title }}
            </a>
          </div>
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-primary"
              :title="i18n.APP_SOCIAL_INSTAGRAM"
              :href="i18n.APP_SOCIAL_INSTAGRAM_URL"
              target="_blank"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              class="button is-primary"
              :title="i18n.APP_SOCIAL_TWITTER"
              :href="i18n.APP_SOCIAL_TWITTER_URL"
              target="_blank"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              class="button is-primary"
              :title="i18n.APP_SOCIAL_FACEBOOK"
              :href="i18n.APP_SOCIAL_FACEBOOK_URL"
              target="_blank"
            >
              <i class="fab fa-facebook-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from '@/assets/img/logo.svg';
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'Navigation',
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    ...mapState('menus', ['menus']),
    ...mapGetters('i18n', ['i18n']),
    logo() {
      return logo;
    },
    menuItems() {
      return this.menus.items;
    },
  },
  methods: {
    navItemClasses(children) {
      const classes = [];
      classes.push('navbar-item');
      if (children) classes.push('has-dropdown is-hoverable');
      return classes.join(' ');
    },

    toggleMenu() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
