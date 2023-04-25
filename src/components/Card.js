export default class Card {
  constructor(id, data, templateSelector, handleCardClick, handleDelete, putLikeHandler, deleteLikeHandler) {
    this._userId = id;
    this._data = data;
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._cardInTemplateSelector = '.element';
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this.putLike = putLikeHandler;
    this.deleteLike = deleteLikeHandler;
  }

  _createTemplate() {
    this._cardId = this._data._id;
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(this._cardInTemplateSelector).cloneNode(true);
    this._trashButton = this._cardElement.querySelector('.element__trash');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._elementTitle = this._cardElement.querySelector('.element__name');
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._likes = this._cardElement.querySelector('.element__likes');
  }

  generateCard() {

    this._createTemplate();
    this._cardImage.src = this._image;
    this._elementTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    if (this._data.owner._id !== this._userId) {
      this._trashButton.classList.add('element__trash_hidden');
    };
    if (this._data.likes.length) {
      this._likes.textContent = this._data.likes.length;
    };
    if (this._data.likes.some(item => {
      return item._id === this._userId;
    })) {
      this._likeButton.classList.add('element__button-like_active');
    } else '';

    return this._cardElement;
  }

  toggleLike(res) {
    this._likes.textContent = res.likes.length;
  }

  toggleButtonLike() {
    if (!this._likeButton.classList.contains('element__button-like_active')) {
      this._likeButton.classList.add('element__button-like_active');
      this.putLike(this);
    } else {
      this._likeButton.classList.remove('element__button-like_active');
      this.deleteLike(this);
    }
  }

  getCardId() {
    return this._data._id;
  }

  deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this.toggleButtonLike(this));
    this._trashButton.addEventListener('click', () => this._handleDelete(this));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image)
    });
  }
}