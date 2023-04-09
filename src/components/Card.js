class Card {
  constructor(title, image, templateSelector, handleCardClick) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
    this._cardInTemplateSelector = '.element';
    this._handleCardClick = handleCardClick;
  }

  _createTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(this._cardInTemplateSelector).cloneNode(true);
    this._trashButton = this._cardElement.querySelector('.element__trash');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._elementTitle = this._cardElement.querySelector('.element__name');;
    this._cardImage = this._cardElement.querySelector('.element__image');
  }

  generateCard() {
    this._createTemplate();
    this._cardImage.src = this._image;
    this._elementTitle.textContent = this._title;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    return this._cardElement;

  }

  _toggleButtonLike() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
    this._likeButton = null;
    this._elementTitle = null;
    this._cardImage = null;
    this._trashButton = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleButtonLike());
    this._trashButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._title, this._image)
  });
}
}

export default Card;