import apiClient from '@/api/base';
import ROUTES from '@/data/routes';

/**
 * @module exampleApi
 */

/**
 * Retrieve data from api
 * @returns {Promise<AxiosResponse<any>>}
 * @example test.getData().then((response) => console.log(response));
 * @author Dominik Niemann <dominik@polargold.de>
 */
const getData = () => apiClient.get(ROUTES.EXAMPLE_API.GET);

/**
 * Post data to api
 * @param {Object} payload
 * @returns {Promise<AxiosResponse<any>>}
 * @example exampleApi.post({
    title: 'foo',
    body: 'bar',
    userId: 1,
  }).then((response) => console.log(response));
 * @author Dominik Niemann <dominik@polargold.de>
 */
const postData = (payload) => apiClient.post(ROUTES.EXAMPLE_API.POST, payload);

const exportFunctions = {
  getData,
  postData,
};

export default exportFunctions;
