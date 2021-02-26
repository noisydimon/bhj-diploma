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
    let createAccButton = document.querySelector(".create-account");
    createAccButton.addEventListener("click", () => {
      App.getModal("createAccount");
    });
    let existingAcc = document.querySelectorAll(".account");
    for (let i = 0; i < existingAcc.length; i++) {
      currentAcc[i].addEventListener("click", () => {
        AccountsWidget.onSelectAccount();
      });
    }
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
          this.renderItem(item);
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
    let existingAcc = document.querySelectorAll(".account");
    let target = element.target;
    existingAcc.addEventListener("click", (element) => {
      for (let i = 0; i < existingAcc.length; i++) {
        existingAcc[i].classList.remove(".active");
      }
      target.classList.add(".active");
    });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  static getAccountHTML(item) {
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
  renderItem(item) {}
}

//document.getElementById("items").innerHTML +=`
//     <div class="item">
//     <div class="item__code">
//     ${valuteNames[i]}
//     </div>
//     <div class="item__value">
//     ${valuteVolue[i]}
//     </div>
//     <div class="item__currency">
//         руб.
//     </div>
// </div>
// `;
