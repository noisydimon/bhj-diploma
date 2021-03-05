/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    return JSON.parse(localStorage.getItem("user"));
    //localStorage.getItem("data");
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback = (f) => f) {
    createRequest((err, response) => {
      if (response.success) {
        let user = {
          id: response.user.id,
          name: response.user.name,
        };
        User.setCurrent(user);
      } else if (!response.success) {
        User.unsetCurrent();
      }
      callback(err, response);
    });
  }
  /*static fetch(data, callback = (f) => f) {
    createRequest(
      {
        data: data,
        method: "GET",
        url: User.URL + "/current",
      },
      (err, response) => {
        if (response.success) {
          let user = {
            id: response.user.id,
            name: response.user.name,
          };
          User.setCurrent(user);
        } else if (!response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      }
    );
  }*/

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    return createRequest({
      data: data,
      method: "POST",
      url: this.URL + "/login",
      //responseType: "json",
      callback: (err, response) => {
        if (err === null && response.success) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback = (f) => f) {
    createRequest({
      data: data,
      method: "POST",
      url: this.URL + "/register",
      //responseType: "json",
      callback: (err, response) => {
        if (err === null && response.success) {
          this.setCurrent(response.user);
          callback(response); //callback из RegisterForm.onSubmit
        }
      },
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (f) => f) {
    return createRequest({
      data: data,
      method: "POST",
      url: this.URL + "/logout",
      callback: (err, response) => {
        if (xhr.response.success) {
          User.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}
