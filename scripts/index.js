const popupOverlay = document.querySelectorAll('.popup');
const cardTemplate = document.querySelector('.element-template').content;

const cardsContainer = document.querySelector('.elements');
const formAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const submitButtonAdd = popupAdd.querySelector('.popup__button-submit_add');
const closeAddForm = document.querySelector('.popup__button-close_add');
const titleInput = formAdd.querySelector('.popup__input_type_title');
const linkInput = formAdd.querySelector('.popup__input_type_link');

const popupImage = document.querySelector('.popup-image');
const popupFullImage = popupImage.querySelector('.popup-image__full-image');
const closePopupImage = document.querySelector('.popup-image__button-close');
const titleImage = popupImage.querySelector('.popup-image__title');

const popupProfileEdit = document.querySelector('.popup_profile-edit');
const editButton = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form-profile-edit');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const closeButton = document.querySelectorAll('.popup__button-close');
const submitButtonProfileEdit = popupProfileEdit.querySelector('.popup__button-submit_profile-edit');


//Валидация
enableValidation(validationConfig);

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
function openPopup(popup) {
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

//Создание карточки
const createCard = (item) => {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardElement = cardTemplateClone.querySelector('.element');
  const cardImage = cardTemplateClone.querySelector('.element__image');

  cardTemplateClone.querySelector('.element__name').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTemplateClone.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });
  cardTemplateClone.querySelector('.element__trash').addEventListener('click', () => {
    cardElement.remove();
  });
  cardImage.addEventListener('click', () => {
    const cardNameElement = cardElement.querySelector('.element__name').textContent;
    popupFullImage.src = cardImage.src;
    popupFullImage.alt = cardNameElement;
    titleImage.textContent = cardNameElement;
    openPopup(popupImage);
  });
  return cardTemplateClone;
};

//Слушатели
formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardLinkTitle = {
    name: titleInput.value,
    link: linkInput.value
  };
  cardsContainer.prepend(createCard(cardLinkTitle));
  closePopup(popupAdd);
  evt.target.reset();
});
formElement.addEventListener('submit', handleEditProfileFormSubmit);
editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
  resetValidationErrors (validationConfig, popupProfileEdit)
  const inputList = Array.from(popupProfileEdit.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(validationConfig, inputList, submitButtonProfileEdit);
});
addButton.addEventListener('click', () => {
  openPopup(popupAdd);
  formAdd.reset();
  resetValidationErrors (validationConfig, popupAdd)
  const inputList = Array.from(popupAdd.querySelectorAll(validationConfig.inputSelector));
  toggleButtonState(validationConfig, inputList, submitButtonAdd);
});

//Карточки при загрузке
initialCards.forEach((element) => {
  createCard(element);
  cardsContainer.append(createCard(element));
});