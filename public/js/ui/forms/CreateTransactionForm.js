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
    //     // Account.list(data, (callback = (f) => f));
  }
  //   /**
  //    * Создаёт новую транзакцию (доход или расход)
  //    * с помощью Transaction.create. По успешному результату
  //    * вызывает App.update(), сбрасывает форму и закрывает окно,
  //    * в котором находится форма
  //    * */
  onSubmit(data) {
    Transaction.create(data, () => {
      if (response !== null) {
        App.getModal("newIncome").close();
        App.getModal("newExpense").close();
        App.initForms("newIncome").reset();
        App.initForms("newExpense").reset(); //сбросить форму?????
        App.update();
      }
    });
  }
}
