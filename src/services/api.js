/* eslint-disable */

import { getJSONP } from '../utils/ajax';

const endpoint = 'https://de.wikipedia.org/w/api.php';

let markers = {

  getInRadius (lng, lat, radius, callback) {
    const url = endpoint + '?action=query&prop=coordinates|pageimages&colimit=100&piprop=thumbnail&pithumbsize=144&pilimit=50&generator=geosearch&ggscoord=' + lat + '|' + lng + '&ggsradius=' + radius + '&ggslimit=100&format=json';

    // TODO - Build url with params object
    const params = {
      action: 'query',
      prop: 'coordinates|pageterms',
      colimit: '50',
      pithumbsize: '144',
      pilimit: '50',
      generator: 'geosearch',
      ggscoord: lat + '|' + lng,
      ggsradius: radius,
      ggslimit: '50',
      format: 'json',
      wbptterms: 'description',
    };

    getJSONP(url, callback);
  }
};

let entries = {

  getByTitle (title, callback) {
    const url = endpoint + '?action=query&prop=extracts|pageimages&piprop=thumbnail&pithumbsize=1200&format=json&exintro=1&titles=' + title;

    // TODO - Build url with params object
    const params = {
      action: 'query',
      prop: 'extracts|pageimages',
      piprop: 'thumbnail',
      pithumbsize: '1200',
      format: 'json',
      exintro: '1',
      titles: title,
    };

    getJSONP(url, callback);
  }
};

export {
  markers,
  entries,
};
