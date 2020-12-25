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
const getPages = () => apiClient.get(ROUTES.DEFAULT.PAGES.ALL);

/**
 * Retrieve a single page
 * @param {number} id page id
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getPage(5).then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getPage = (id) => apiClient.get(`${ROUTES.DEFAULT.PAGE.ALL}/${id}`);

/**
 * Retrieve a list of all gets
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getPages().then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getgets = () => apiClient.get(ROUTES.DEFAULT.getS.ALL);

/**
 * Retrieve a single get
 * @param {number} id get id
 * @returns {Promise<AxiosResponse<any>>}
 * @example wordpressAPI.getget(5).then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getget = (id) => apiClient.get(`${ROUTES.DEFAULT.get.ALL}/${id}`);

const exportFunctions = {
  getMenus,
  getMenu,
  getPages,
  getPage,
  getgets,
  getget,
};

export default exportFunctions;
