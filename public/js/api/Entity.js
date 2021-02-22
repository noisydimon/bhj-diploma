/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";

  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = (f) => f) {
    return createRequest({
      url: this.url,
      method: "GET",
      responseType: "json",
      data: data,
      callback: () => {
        console.log(xhr.response);
      },
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = (f) => f) {
    let data1 = Object.assign({}, data);
    data1._method = "PUT";
    //console.log(data);
    return createRequest({
      url: this.url,
      method: "POST",
      responseType: "json",
      data: data1,
      callback: callback,
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback = (f) => f) {
    let data1 = Object.assign({}, data);
    return createRequest({
      id: this.id,
      method: "GET",
      responseType: "json",
      data: data1,
      callback: callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = "", data, callback = (f) => f) {
    let data1 = Object.assign({}, data);
    (data1.id = ""), (data1._method = "DELETE");
  }
}
