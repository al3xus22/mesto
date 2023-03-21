import { popupImage, popupFullImage, titleImage, openPopup } from './index.js';

class Card {
  constructor(title, image, templateSelector) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
    this._template = '.element';
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content;
    this._cardElement = this._cardTemplate.querySelector(this._template).cloneNode(true);
    this._trashButton = this._cardElement.querySelector('.element__trash');
    this._likeButton = this._cardElement.querySelector('.element__button-like');
    this._elementTitle = this._cardElement.querySelector('.element__name');;
    this._cardImage = this._cardElement.querySelector('.element__image');
  }

  generateCard() {
    this._getTemplate();
    this._cardElement.querySelector('.element__image').src = this._image;
    this._cardElement.querySelector('.element__name').textContent = this._title;
    this._cardElement.querySelector('.element__image').alt = this._title;
    this._setEventListeners();
    return this._cardElement;

  }

  _toggleButtonLike() {
    this._likeButton.classList.toggle('element__button-like_active');
  }

  _deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _openFullImage() {
    popupFullImage.src = this._cardImage.src;
    popupFullImage.alt = this._elementTitle.textContent;
    titleImage.textContent = this._elementTitle.textContent;
    openPopup(popupImage);
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._toggleButtonLike());
    this._trashButton.addEventListener('click', this._deleteCard);
    this._cardImage.addEventListener('click', () => this._openFullImage());
  }
}

export default Card;