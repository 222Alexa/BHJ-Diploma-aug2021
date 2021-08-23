/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();

  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accSelect = this.element.querySelector('.accounts-select');


    Account.list(User.current(), (err, response) => {
      if (response && response.success) {
        accSelect.innerHTML = '';
        response.data.forEach((element) => {
          const values = `<option value="${element.id}">${element.name}</option>`;
          accSelect.insertAdjacentHTML('beforeend', values);
        });
      };
    });
  };

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    console.log(data)
    Transaction.create(data, (err, response) => {
      if (response && response.success === true) {
        console.log(response)
        this.element.reset();
        App.getModal('newIncome').close;
        App.getModal('newExpense').close;
        App.update();

      }
    });
  }
}