import apiClient from '@/api/base';
import ROUTES from '@/data/routes';

/**
 * @module acfAPI
 */

/**
 * Retrieve stageElements
 *
 * @returns {Promise<AxiosResponse<any>>}
 * @example acfAPI.getStageElements().then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const getStageElements = () => apiClient.get(`${ROUTES.ACF_API}${ROUTES.OPTIONS.ALL}${ROUTES.OPTIONS.STAGE_ELEMENTS}`);

const exportFunctions = {
  getStageElements,
};

export default exportFunctions;
