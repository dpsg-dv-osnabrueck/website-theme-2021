import apiClient from '@/api/base';
import ROUTES from '@/data/routes';

/**
 * @module wordpressAPI
 */

/**
 * Retrieve navigation data from api
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getMenus().then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getMenus = () => apiClient.get(`${ROUTES.MENU_API}${ROUTES.MENUS.ALL}`);

/**
 * Retrieve a single menu
 * @param {number} id menu id
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getMenu(5).then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getMenu = (id) => apiClient.get(`${ROUTES.MENU_API}${ROUTES.MENUS.SINGLE}/${id}`);

/**
 * Retrieve a list of all pages
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getPages().then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getPages = () => apiClient.get(`${ROUTES.DEFAULT}${ROUTES.PAGES.ALL}?per_page=100`);

/**
 * Retrieve a single post
 * @param {string} slug post slug
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getPost('post-name').then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getPost = (slug) => apiClient.get(`${ROUTES.DEFAULT}${ROUTES.POSTS.SINGLE}/?slug=${slug}`);

/**
 * Retrieve a single media item
 * @param {number} id media item id
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getMediaItem(5).then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getMediaItem = (id) => apiClient.get(`${ROUTES.DEFAULT}${ROUTES.MEDIA.SINGLE}/${id}`);

/**
 * Retrieve a single page
 * @param {string} slug page slug
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getPage('page-name').then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getPage = (slug) => apiClient.get(`${ROUTES.DEFAULT}${ROUTES.PAGES.SINGLE}/?slug=${slug}`);

const exportFunctions = {
  getMenus,
  getMenu,
  getPages,
  getPage,
  getMediaItem,
  getPost,
};

export default exportFunctions;
