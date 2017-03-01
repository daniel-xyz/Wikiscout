/* eslint-disable */

let jsonp = require('jsonp');

function send (method, json, url, callback) {
  let xhr = typeof XMLHttpRequest != 'undefined'
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');

  xhr.open(method, url, true);

  if (method === 'post') {
    xhr.setRequestHeader('X-CSRF-Token', csrfToken);
  }

  if (json) {
    xhr.setRequestHeader('Accept', 'application/json');
  }

  xhr.onreadystatechange = function() {
    let status;
    let data;

    if (xhr.readyState == 4) { // `DONE`
      status = xhr.status;

      if (status == 200) {
        data = json ? JSON.parse(xhr.responseText) : xhr.responseText;
        callback(null, data);
      } else {
        callback(status, null);
      }
    }
  };

  xhr.send();
}

function getJSON (url, callback) {
  send('get', true, url, callback)
}

function post (url, callback) {
  send('post', true, url, callback)
}

function getJSONP (url, callback) {
  jsonp(url, null, function (err, data) {
    if (err) {
      console.error(err.message);
      callback(err.message, null);
    } else {
      console.log(data);
      callback(null, data);
    }
  });
}

export {
  getJSON,
  post,
  getJSONP,
};
