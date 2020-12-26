import wordpressAPI from '@/api/wordpressAPI';

/**
 *
 * Retrieve image url from image id
 *
 * @param {number} id image id
 * @param {string} size image size according to functions.php
 * @returns {Promise}
 * @example imageHelper(2, 'portrait').then((response) => console.log(response))
 * @author Dominik Niemann <info@dpsg-os.de>
 *
 */
const imageHelper = (id, size) => new Promise((resolve) => {
  wordpressAPI.getMediaItem(id).then((response) => {
    if (response.status === 200) {
      if (size) {
        resolve(response.data.media_details.sizes[size].source_url);
      } else {
        resolve(response.data.source_url);
      }
    }
  });
});

export default imageHelper;
