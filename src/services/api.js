/* eslint-disable */

import { getJSON, getJSONP } from '../utils/ajax';

const endpoint = 'https://de.wikipedia.org/w/api.php';

let markers = {

  getInRadius (lng, lat, radius, callback) {
    // const url = endpoint + '?action=query&prop=coordinates&colimit=100&pilimit=50&generator=geosearch&ggscoord=' + lat + '|' + lng + '&ggsradius=' + radius + '&ggslimit=100&format=json';
    const url = endpoint + '?action=query&prop=coordinates|pageimages&colimit=100&piprop=thumbnail&pithumbsize=80&pilimit=50&generator=geosearch&ggscoord=' + lat + '|' + lng + '&ggsradius=' + radius + '&ggslimit=100&format=json&origin=*';

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

    getJSON(url, callback);
  },

  getTwoNeighborsInRadius (lng, lat, radius, callback) {
    const url = endpoint + '?action=query&prop=coordinates|pageimages&colimit=3&piprop=thumbnail&pithumbsize=144&pilimit=3&generator=geosearch&ggscoord=' + lat + '|' + lng + '&ggsradius=' + radius + '&ggslimit=3&format=json&origin=*';

    getJSON(url, callback);
  }
};

let entries = {

  getByTitle (title, callback) {
    const url = endpoint + '?action=query&prop=extracts|pageimages|coordinates&piprop=thumbnail&pithumbsize=700&format=json&exintro=1&origin=*&titles=' + title;

    // TODO - Build url with params object
    const params = {
      action: 'query',
      prop: 'extracts|pageimages',
      piprop: 'thumbnail',
      pithumbsize: '700',
      format: 'json',
      exintro: '1',
      titles: title,
    };

    getJSON(url, callback);
  }
};

export {
  markers,
  entries,
};
