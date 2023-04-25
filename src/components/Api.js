export default class Api {
  constructor({ baseUrl, headers }) {
    this.url = baseUrl;
    this.headers = headers;
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  setUserInfo({name, job}) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: job
      })
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

addNewCard({ title, link}) {
  return fetch(`${this.url}/cards`, {
    method: 'POST',
    headers: this.headers,
    body: JSON.stringify({ 
      name: title,
      link: link
     })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

deleteUserCard(cardId) {
  return fetch(`${this.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

updateUserAvatar({avatar}) {
  return fetch(`${this.url}/users/me/avatar`, {
    method: 'PATCH',
    headers: this.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

putLike(cardId) {
  return fetch(`${this.url}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: this.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

deleteLike(cardId) {
  return fetch(`${this.url}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: this.headers
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
}

}