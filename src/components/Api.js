export default class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  setUserInfo({ name, job }) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  addNewCard({ title, link }) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  deleteUserCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  updateUserAvatar({ avatar }) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  putLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this.headers
    }).then(res => {
      return this._checkResponse(res);
    })
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this.headers
    }).then(res => {
      return this._checkResponse(res);
    })
  }

}