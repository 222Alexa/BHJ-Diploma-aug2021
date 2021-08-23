/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {

    User.register(data, (err, response) => {
      if (err === null && response.success) {
        App.setState('user-logged'); // сразу же авторизация зарегистрированного пользователя
        App.getModal('register').close();// закрытие окна
      }
      this.element.reset(); //сброс формы
    });
  }
}