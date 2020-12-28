<template>
  <footer class="footer has-background-light">
    <GridContainer>
      <GridRow vCentered>
        <GridCell>
          <div class="content has-text-centered-mobile">
            <p v-html="replaceString(i18n.APP_FOOTER_COPYRIGHT)"></p>
          </div>
        </GridCell>
        <GridCell width="2" class="has-text-centered">
          <img :src="lilie" width="24" class="has-text-grey-light" />
        </GridCell>
        <GridCell>
          <div class="has-text-right-tablet has-text-centered-mobile content">
            <a
              v-for="(item, index) of menuItems"
              :key="index"
              @click="goToPage(item.object_slug, item.object, item.url)"
              :title="item.title"
              class="mr-3"
            >
              {{ item.title }}
            </a>
          </div>
        </GridCell>
      </GridRow>
    </GridContainer>
  </footer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import stringReplacer from '@/helper/stringReplacer';
import lilie from '@/assets/img/lilie.svg';
import goToPage from '@/mixins/goToPage';

export default {
  name: 'Footer',
  mixins: [goToPage],
  computed: {
    ...mapState('menus', ['footerNavigation']),
    ...mapGetters('i18n', ['i18n']),

    menuItems() {
      return this.footerNavigation.items;
    },

    lilie() {
      return lilie;
    },
  },
  methods: {
    replaceString(string) {
      return stringReplacer(string, new Date().getFullYear());
    },
  },
};
</script>
