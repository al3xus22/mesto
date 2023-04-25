export const initialCards = [
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

export const formAdd = document.querySelector('.popup__form_add');
export const addButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile__edit-button');
export const formProfileEdit = document.querySelector('.popup__form-profile-edit');
export const nameInput = formProfileEdit.querySelector('.popup__input_type_name');
export const jobInput = formProfileEdit.querySelector('.popup__input_type_job');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const updateAvatarButton = document.querySelector('.profile__avatar-edit');
export const popupUpdateAvatar = document.querySelector('.popup_update-avatar');
export const linkInputUpdateAvatar = popupUpdateAvatar.querySelector('.popup__input_type_link');