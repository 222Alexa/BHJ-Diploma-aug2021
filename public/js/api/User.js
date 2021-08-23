
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */


class User {

  static URL = '/user';
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */

  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);

  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {

    localStorage.removeItem('user');

  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    try {
      return JSON.parse(localStorage.user);

    } catch (err) {
      // console.log(err);
      return null;

    }
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {

   createRequest({
      url: this.URL + '/current',
      responseType: 'json',
      method: 'GET',
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);

        } else {
          User.unsetCurrent();

        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    return createRequest({
      url: User.URL + '/register',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
        }
        callback(err, response);
      }
    })
  }


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {

    return createRequest({
      url: this.URL + '/logout',
      data: data,
      responseType: 'json',
      method: 'POST',
      callback: (err, response) => {
        if (response.success === true) {

          User.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}

