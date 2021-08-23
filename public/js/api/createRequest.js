/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  xhr.withCredentials = true;

  if (options.method === "GET") {
    options.url += '?';

    for (let key in options.data) {
      options.url += `${key}=${options.data[key]}&`;
    }
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);

    }

  }

  try {
    xhr.open(options.method, options.url);
    xhr.send(formData);

  }

  catch (err) {
    callback(err);

  }
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);

      if (response.success === true) {
        options.callback(null, response);
      } else {
        options.callback(response.error, response);
      }
    }
  });
};

