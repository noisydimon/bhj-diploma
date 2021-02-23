//const { response } = require("express");

/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */

  onSubmit(options) {
    User.register(options, (err, response) => {
      console.log(response);
      //if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      if (response !== null) {
        //сбросить форму при успешной регистрации
        App.setState("user-logged");
        App.getModal("register").close();
      }
    });
  }
}
