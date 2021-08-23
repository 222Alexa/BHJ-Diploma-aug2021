/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {

    User.login(data, (err, response) => {
      if (response && response.success) {
        App.setState('user-logged'); //авторизация
        App.getModal('login').close();// Находит окно, в котором находится форма и закрывает его (через метод Modal.close)
        this.element.reset();// сброс формы
      }
    });
  }
}