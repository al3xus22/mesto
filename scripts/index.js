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

const setValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-submit',
  inactiveButtonClass: 'popup__button-submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

enableValidation(setValidation);

const popupOverlay = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('.element-template').content.cloneNode(true);
const cardsContainer = document.querySelector('.elements');
const formAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const submitButtonAdd = popupAdd.querySelector('.popup__button-submit_add');
const closeAddForm = document.querySelector('.popup__button-close_add');
const closePopupImage = document.querySelector('.popup-image__button-close');
const popupImage = document.querySelector('.popup-image');
const titleInput = formAdd.querySelector('.popup__input_type_title');
const linkInput = formAdd.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const formElement = document.querySelector('.popup__form-profile-edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButton = document.querySelectorAll('.popup__button-close');

//Закрытие-открытие попаов
closeButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    popupClose(popup);
  })
});
popupOverlay.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      popupClose(popup);
    }
  })
});
function popupOpen(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupEsc);
  toggleSubmitButton();
};
function popupClose(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupEsc);
};
function closePopupEsc(event) {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    popupClose(popupOpened);
  }
};

//Деактивация кнопи submit
function toggleSubmitButton() {
  if (titleInput.value.length === 0 || linkInput.value.length === 0) {
    submitButtonAdd.disabled = true;
    submitButtonAdd.classList.add('popup__button-submit_inactive');
  }
};

//Сброс полей ввода и ошибок при открытии
function resetErrorInput(setValidation, popup) {
  const forms = popup.querySelector('.popup__form');
  const inputs = Array.from(forms.querySelectorAll('.popup__input'));
  inputs.forEach((input) => {
    input.classList.remove(setValidation.inputErrorClass);
  });
};
function resetErrorMessage(setValidation, popup) {
  const forms = popup.querySelector('.popup__form');
  const formErrors = Array.from(forms.querySelectorAll('.popup__input-error'));
  formErrors.forEach((error) => {
    error.classList.remove(setValidation.errorClass);
    error.textContent = '';
  });
};


function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose(popupProfileEdit);
};

//Создание карточки
const createCard = (item) => {
  const cardTemplate = document.querySelector('.element-template').content.cloneNode(true);
  cardTemplate.querySelector('.element__name').textContent = item.name;
  cardTemplate.querySelector('.element__image').src = item.link;
  cardTemplate.querySelector('.element__image').alt = item.name;
  cardTemplate.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });

  const cardElement = cardTemplate.querySelector('.element');
  cardTemplate.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove();
  });

  const cardImage = cardTemplate.querySelector('.element__image');
  cardImage.addEventListener('click', () => {
    const popupImage = document.querySelector('.popup-image');
    const popupFullImage = popupImage.querySelector('.popup-image__full-image');
    const titleImage = popupImage.querySelector('.popup-image__title');
    const cardNameElement = cardElement.querySelector('.element__name').textContent;
    popupFullImage.src = cardImage.src;
    popupFullImage.alt = cardNameElement;
    titleImage.textContent = cardNameElement;

    popupOpen(popupImage);
  });

  return cardTemplate;
};

//Слушатели
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardLinkTitle = {
    name: titleInput.value,
    link: linkInput.value
  };
  cardsContainer.prepend(createCard(cardLinkTitle));
  popupClose(popupAdd);
  evt.target.reset();
});
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(popupProfileEdit);
  resetErrorInput(setValidation, popupProfileEdit);
  resetErrorMessage(setValidation, popupProfileEdit);
});
formElement.addEventListener('submit', handleEditProfileFormSubmit);
addButton.addEventListener('click', () => {
  popupOpen(popupAdd);
  formAdd.reset();
  resetErrorInput(setValidation, popupAdd);
  resetErrorMessage(setValidation, popupAdd);
});

//Карточки при загрузке
initialCards.forEach((element) => {
  createCard(element);
  cardsContainer.append(createCard(element));
});