export default {
  BASE: 'https://dpsg-os.de/wp-json',
  DEFAULT: '/wp/v2',
  MENU_API: '/wp-api-menus/v2',
  ACF_API: 'acf/v3',
  MENUS: {
    ALL: '/menus',
    SINGLE: '/menus',
  },
  PAGES: {
    ALL: '/pages',
    SINGLE: '/pages',
  },
  POSTS: {
    ALL: '/posts',
    SINGLE: '/posts',
  },
  MEDIA: {
    SINGLE: '/media',
  },
  OPTIONS: {
    ALL: '/options/options',
    STAGE_ELEMENTS: '/stageElements',
  },
  INSTAGRAM: {
    BASE: 'https://graph.instagram.com',
    FEED: '/me/media',
    REFRESH: '/refresh_access_token',
    PARAMS: ['?grant_type=ig_refresh_token', '&access_token='],
  },

};
