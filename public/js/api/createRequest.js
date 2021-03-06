/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  //{method, url, data = {}, callback}
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  let url = options.url;
  if (options.method == "GET") {
    url += "?";
    for (let key in options.data) {
      url += `${key}=${options.data[key]}&`;
    }
    url = url.substring(0, url.length - 1);
    try {
      xhr.open(options.method, url);
      xhr.send();
    } catch (err) {
      options.callback(e);
    }
  } else {
    let formdata = new FormData();
    for (let key in options.data) {
      formdata.append(key, options.data[key]);
    }
    try {
      xhr.open(options.method, url);
      xhr.send(formdata);
    } catch (err) {
      options.callback(err);
    }
  }
  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState == xhr.DONE && xhr.status == 200) {
      if (options.callback) {
        options.callback(null, xhr.response);
      }
    }
  });
  //console.log(xhr.response);
  return xhr;
};
/*
createRequest({
  url: "/user/login",
  data: {
    email: "ivan@biz.pro",
    password: "odinodin",
  },
  method: "POST",
});*/
