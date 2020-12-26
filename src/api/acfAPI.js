import apiClient from '@/api/base';
import ROUTES from '@/data/routes';

/**
 * @module acfAPI
 */

/**
 * Retrieve options
 *
 * @returns {Promise<AxiosResponse<any>>}
 * @example acfAPI.getOptions().then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getOptions = () => apiClient.get(`${ROUTES.ACF_API}${ROUTES.OPTIONS.ALL}`);

const exportFunctions = {
  getOptions,
};

export default exportFunctions;
