/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * Наследуется от AsyncForm
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно (в котором находится форма) в случае успеха,
   * а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    Account.create(options, () => {
      if (xhr.readyState === xhr.DONE && xhr.status === 200) {
        App.getModal("createAccount").close();
        //сбросить форму?????
        App.update();
      }
    });
  }
}

/*
onSubmit(options) {
  User.login(options, (err, response) => {
    if (response !== null) {
      App.setState("user-logged");
      App.getModal("login").close();
    }
  });
}*/
