<template>
  <div class="has-background-primary py-2 nav-container">
    <GridContainer>
      <nav
        class="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a
            class="navbar-item"
            href="#"
            :title="i18n.APP_TITLE"
            @click="goHome"
          >
            <img :src="logo" :alt="i18n.APP_TITLE" />
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
              :class="`${navItemClasses(item.children)} ${
                isActiveSub[item.id] ? 'is-active' : ''
              }`"
              v-for="(item, index) of menuItems"
              :key="index"
            >
              <span
                v-if="!item.children"
                @click="openPage(item.object_slug, item.object, item.url)"
              >
                {{ item.title }}
              </span>
              <a
                v-if="item.children"
                class="navbar-link"
                :title="item.title"
                @click="toggleDropDown(item.id)"
              >
                {{ item.title }}
              </a>
              <div
                v-if="item.children && isActiveSub[item.id]"
                class="navbar-dropdown is-boxed"
              >
                <a
                  v-for="(subItem, subIndex) of item.children"
                  :key="subIndex"
                  class="navbar-item"
                  :title="subItem.title"
                  @click="
                    openPage(subItem.object_slug, subItem.object, subItem.url)
                  "
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
                  <Icon name="instagram" fab />
                </a>
                <a
                  class="button is-primary"
                  :title="i18n.APP_SOCIAL_TWITTER"
                  :href="i18n.APP_SOCIAL_TWITTER_URL"
                  target="_blank"
                >
                  <Icon name="twitter" fab />
                </a>
                <a
                  class="button is-primary"
                  :title="i18n.APP_SOCIAL_FACEBOOK"
                  :href="i18n.APP_SOCIAL_FACEBOOK_URL"
                  target="_blank"
                >
                  <Icon name="facebook-square" fab />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </GridContainer>
  </div>
</template>

<script>
import logo from '@/assets/img/logo.svg';
import { mapGetters, mapState } from 'vuex';
import goToPage from '@/mixins/goToPage';

export default {
  name: 'Navigation',
  mixins: [goToPage],
  data() {
    return {
      isActive: false,
      isActiveSub: {},
    };
  },
  computed: {
    ...mapState('menus', ['mainNavigation']),
    ...mapGetters('i18n', ['i18n']),
    logo() {
      return logo;
    },
    menuItems() {
      return this.mainNavigation.items;
    },
  },
  methods: {
    navItemClasses(children) {
      const classes = [];
      classes.push('navbar-item');
      if (children) classes.push('has-dropdown');
      return classes.join(' ');
    },

    toggleMenu() {
      this.isActive = !this.isActive;
    },

    toggleDropDown(id) {
      const currentToggle = this.isActiveSub[id];
      this.closeDropDown();
      this.isActiveSub[id] = !currentToggle;
    },

    closeDropDown() {
      Object.keys(this.isActiveSub).forEach((item) => {
        this.isActiveSub[item] = false;
      });
    },

    goHome() {
      this.$router.push({ name: 'Home' });
    },

    setIds() {
      const ids = {};
      this.menuItems.forEach((item) => {
        if (item.children) {
          ids[item.id] = false;
        }
      });
      return ids;
    },

    openPage(slug, type, url) {
      this.closeDropDown();
      this.toggleMenu();
      this.goToPage(slug, type, url);
    },
  },
  mounted() {
    this.isActiveSub = this.setIds();
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/styles/main";
.nav-container {
  border-bottom: 2px solid $red;
}

.navbar {
  .navbar-end,
  .navbar-start {
    .has-dropdown {
      &.is-active {
        .navbar-link {
          &:after {
            transition: transform 0.2s ease-out;
            transform: rotate(135deg);
          }
        }
      }
      .navbar-link {
        &:after {
          transition: transform 0.2s ease-out;
        }
      }
    }
  }
}
</style>
