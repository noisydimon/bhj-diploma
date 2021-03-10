/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = "/account";
  /**
   * Получает информацию о счёте
   * */

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback = (f) => f) {
    //let data1 = Object.assign({}, data);
    return createRequest({
      id: this.id,
      method: "GET",
      responseType: "json",
      data: data,
      callback: callback,
    });
  }
}
//get специально вывели сюда
