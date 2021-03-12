/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    if (this.element === null) {
      const elementEmpty = new Error("Объект не существует");
      throw elementEmpty;
    }
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */

  registerEvents() {
    let createAccButton = this.element.querySelector(".create-account");
    let bindOnSelectAccount = this.onSelectAccount.bind(this);

    this.element.addEventListener("click", (event) => {
      if (event.target === createAccButton) {
        App.getModal("createAccount").open();
      } else {
        bindOnSelectAccount(event.target);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response.success) {
          this.clear();
          for (let key of response.data) {
            this.renderItem(key);
          }
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let existingAcc = document.querySelectorAll(".account");
    for (let i = 0; i < existingAcc.length; i++) {
      existingAcc[i].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    let targetElement = this.element.querySelector("active");
    let closestElement = element.closest(".account");
    if (targetElement) {
      targetElement.classList.remove("active");
      closestElement.classlist.add("active");
    } else {
      closestElement.classList.add("active");
    }

    App.showPage("transactions", closestElement.getAttribute("data-id"));
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let accountHTML = `<li class="active account" data-id=${item.id}>
      <a href="#">
        <span>${item.name}</span> /
        <span>${item.sum} ₽</span>
      </a>
    </li>`;
    return accountHTML;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    //const sidebarMenu = document.querySelector(".sidebar-menu.accounts-panel");
    // sidebarMenu.firstElementChild.insertAdjacentHTML(
    this.element.insertAdjacentHTML("beforeEnd", this.getAccountHTML(item));
  }
}

//console.log(AccountsWidget.getAccountHTML({ id: 35, name: "Сбербанк", sum: 2396.3 }));
