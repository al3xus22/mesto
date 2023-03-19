import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popupOverlay = document.querySelectorAll('.popup');

const cardsContainer = document.querySelector('.elements');
const formAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const submitButtonAdd = popupAdd.querySelector('.popup__button-submit_add');
const titleInput = formAdd.querySelector('.popup__input_type_title');
const linkInput = formAdd.querySelector('.popup__input_type_link');

export const popupImage = document.querySelector('.popup-image');
export const popupFullImage = popupImage.querySelector('.popup-image__full-image');
export const titleImage = popupImage.querySelector('.popup-image__title');

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form-profile-edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButton = document.querySelectorAll('.popup__button-close');
const submitButtonProfileEdit = popupProfileEdit.querySelector('.popup__button-submit_profile-edit');

//Валидация формы редактирования профиля
class FormValidatorProfileEdit extends FormValidator {
  constructor(config, form) {
    super(config, form);
  }

  enableValidation() {
    super._setEventListeners();
  }
}
const formValidatorProfileEdit = new FormValidatorProfileEdit(validationConfig, formElement);
formValidatorProfileEdit.enableValidation();

//Валидация формы добавления изображений
class FormValidatorAddForm extends FormValidator {
  constructor(config, form) {
    super(config, form);
  }

  enableValidation() {
    super._setEventListeners();
  }
}
const formValidatorAddForm = new FormValidatorAddForm(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

//Карточки при загрузке
initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, '.element-template');
  cardsContainer.append(card);
});

//Закрытие-открытие попаов
closeButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
});
popupOverlay.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  })
});
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupEsc);
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupEsc);
};
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const openPopuped = document.querySelector('.popup_opened');
    closePopup(openPopuped);
  }
};

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfileEdit);
};

//Создать карточку
function createCard(title, image, templateSelector) {
  const card = new Card(title, image, templateSelector);
  return card.generateCard();
}

//Слушатели
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, linkInput.value, '.element-template');
  cardsContainer.prepend(newCard);
  closePopup(popupAdd);
  evt.target.reset();
});
formElement.addEventListener('submit', handleEditProfileFormSubmit);
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
  formValidatorProfileEdit.resetValidationErrors();
  const inputListPopupProfileEdit = Array.from(popupProfileEdit.querySelectorAll(validationConfig.inputSelector));
  formValidatorProfileEdit.toggleButtonState(inputListPopupProfileEdit, submitButtonProfileEdit)
});
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  formAdd.reset();
  formValidatorAddForm.resetValidationErrors();
  const inputListPopupAdd = Array.from(popupAdd.querySelectorAll(validationConfig.inputSelector));
  formValidatorAddForm.toggleButtonState(inputListPopupAdd, submitButtonAdd);
});