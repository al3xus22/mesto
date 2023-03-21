import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { initialCards } from './consts.js';


const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const popupOverlayList = document.querySelectorAll('.popup');

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
const formProfileEdit = document.querySelector('.popup__form-profile-edit');
const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
const jobInput = formProfileEdit.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButtonList = document.querySelectorAll('.popup__button-close');
const submitButtonProfileEdit = popupProfileEdit.querySelector('.popup__button-submit_profile-edit');

//Валидация формы редактирования профиля
const formValidatorProfileEdit = new FormValidator(validationConfig, formProfileEdit);
formValidatorProfileEdit.enableValidation();

//Валидация формы добавления изображений
const formValidatorAddForm = new FormValidator(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

//Карточки при загрузке
initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, '.element-template');
  cardsContainer.append(card);
});

//Закрытие-открытие попаов
closeButtonList.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  })
});
popupOverlayList.forEach((popup) => {
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

function saveNewCard(evt) {
  evt.preventDefault();
  const newCard = createCard(titleInput.value, linkInput.value, '.element-template');
  cardsContainer.prepend(newCard);
  evt.target.reset();
}

function saveProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopupEditProfile() {
  saveProfile();
  openPopup(popupProfileEdit);
  formValidatorProfileEdit.resetValidationErrors();
  formValidatorProfileEdit.toggleButtonState();
}

function openPopupAdd() {
  openPopup(popupAdd);
  formAdd.reset();
  formValidatorAddForm.resetValidationErrors();
  formValidatorAddForm.toggleButtonState();
}

//Создать карточку
function createCard(title, image, templateSelector) {
  const card = new Card(title, image, templateSelector);
  return card.generateCard();
}

//Слушатели
formAdd.addEventListener('submit', (evt) => {
  saveNewCard(evt);
  closePopup(popupAdd);
});
formProfileEdit.addEventListener('submit', handleEditProfileFormSubmit);
editButton.addEventListener('click', () => openPopupEditProfile());
addButton.addEventListener('click', () => openPopupAdd());