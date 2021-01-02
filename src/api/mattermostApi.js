import apiClient from '@/api/base';
import ROUTES from '@/data/routes';

/**
 * @module mattermostAPI
 */

/**
 * Post message
 *
 * @returns {Promise<AxiosResponse<any>>}
 * @example mattermostApi.send(payload).then((response) => console.log(response));
 * @author Dominik Niemann <info@dpsg-os.de>
 */
const send = (payload) => apiClient.post(`${ROUTES.MATTERMOST.BASE}${ROUTES.MATTERMOST.HOOKS}/${process.env.VUE_APP_MAIL_HOOK}`, payload);

const exportFunctions = {
  send,
};

export default exportFunctions;
