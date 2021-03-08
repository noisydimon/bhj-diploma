/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /*
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }
  //   /**
  //    * Получает список счетов с помощью Account.list
  //    * Обновляет в форме всплывающего окна выпадающий список
  //    * */
  renderAccountsList() {
    Account.list(User.current(), (response) => {
      ///???? data это что
      if (response !== null) {
        for (let key in response.data) {
          this.element.insertAdjacentHTML(
            "beforeEnd",
            `<option value="${response.data[key].id}">${response.data[key].name}</option>`
          );
        }
      }
    });
  }
  //   /**
  //    * Создаёт новую транзакцию (доход или расход)
  //    * с помощью Transaction.create. По успешному результату
  //    * вызывает App.update(), сбрасывает форму и закрывает окно,
  //    * в котором находится форма
  //    * */
  onSubmit(options) {
    Transaction.create(options, (response) => {
      if (response.success) {
        this.element.reset();
        if (this.element === document.querySelector("#new-income-form")) {
          App.getModal("newIncome").close();
        } else {
          App.getModal("newExpense").close();
        }
        App.update();
      }
    });
  }
}

//<select name="account_id" id="income-accounts-list" class="form-control accounts-select" required=""></select>
//<select name="account_id" id="expense-accounts-list" class="form-control accounts-select" required=""></select>
//<option value="${id}">${name}</option>
