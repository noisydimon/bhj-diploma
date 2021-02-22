/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    let buttonSidebar = document.querySelector(".sidebar-toggle");
    //console.log(buttonSidebar);

    buttonSidebar.addEventListener("click", (event) => {
      event.preventDefault();
      let body = document.getElementsByTagName("body")[0];
      body.classList.toggle("sidebar-open");
      body.classList.toggle("sidebar-collapse");
      console.log(body);
    });
  }
  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let buttonEnter = document.querySelector(".menu-item_login");
    let buttonRegistration = document.querySelector(".menu-item_register");

    buttonEnter.addEventListener("click", (event) => {
      event.preventDefault();
      App.getModal("login").open();
      //console.log(App.getModal("login"));
    });
    buttonRegistration.addEventListener("click", (event) => {
      event.preventDefault();
      App.getModal("register").open();
      //console.log(App.getModal("register"));
    });
  }
}
