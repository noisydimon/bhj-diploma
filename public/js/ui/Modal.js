/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    this.onClose = this.onClose.bind(this);
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  //let closeElements = this.element.querySelectorAll('[data-dismiss="modal"]');

  registerEvents() {
    let closeElements = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (let i = 0; i < closeElements.length; i++) {
      closeElements[i].addEventListener("click", this.onClose);
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    this.close();
  }

  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    let closeElements = this.element.querySelectorAll('[data-dismiss="modal"]');
    for (let i = 0; i < closeElements.length; i++) {
      closeElements[i].removeEventListener("click", this.onClose);
    }
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.setAttribute("style", "display: block");
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.removeAttribute("style"); //, "display: block");
    //console.log(this.element.style);
  }
}
