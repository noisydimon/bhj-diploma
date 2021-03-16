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
    Account.list(User.current(), (err, response) => {
      //console.log(response);
      if (response !== null) {
        for (let key in response.data) {
          this.element
            .querySelector(".accounts-select")
            .insertAdjacentHTML(
              "BeforeEnd",
              `<option value="${response.data[key].id}">${response.data[key].name}</option>`
            );
        }
      }
    });
  }

  //<select name="account_id" id="income-accounts-list" class="form-control accounts-select" required=""></select>
  //<select name="account_id" id="expense-accounts-list" class="form-control accounts-select" required=""></select>
  //{"success":true,"data":[{"name":"Сбербанк","user_id":"800a3r1z9rklx4s5iv","id":"800a3rfqgkmca0jct","sum":0},
  //{"name":"Chase","user_id":"800a3r1z9rklx4s5iv","id":"800a3rg60kmcb83ip","sum":0},{"name":"Bank of America","user_id":"800a3r1z9rklx4s5iv","id":"800a3rgbikmcbtwqf","sum":0}]}

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
