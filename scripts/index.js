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

const cardTemplate = document.querySelector('.element-template').content.cloneNode(true);
const cardsContainer = document.querySelector('.elements');
const formAdd = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closeAddForm = document.querySelector('.popup__button-close_add');
const closePopupImage = document.querySelector('.popup-image__button-close');
const popupImage = document.querySelector('.popup-image');
const titleInput = formAdd.querySelector('.popup__input_type_title');
const linkInput = formAdd.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_profile-edit');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');


function popupOpen(popup) {
  popup.classList.add('popup_opened');
};

function popupClose(popup) {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose(popupProfileEdit);
}

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

  const cardImage = document.querySelectorAll('.element__image');
  cardImage.forEach((imageCard) => {
    imageCard.addEventListener('click', () => {
      const popupImage = document.querySelector('.popup-image');
      const popupFullImage = popupImage.querySelector('.popup-image__full-image');
      const titleImage = popupImage.querySelector('.popup-image__title');
      const cardElement = imageCard.closest('.element');
      const cardNameElement = cardElement.querySelector('.element__name').textContent;
      popupFullImage.src = imageCard.src;
      popupFullImage.alt = cardNameElement;
      titleImage.textContent = cardNameElement;

      popupOpen(popupImage);
    });
  });

  return cardTemplate;
};



formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const cardLinkTitle = {
    name: titleInput.value,
    link: linkInput.value
  };
  cardsContainer.prepend(createCard(cardLinkTitle));

  const cardImage = document.querySelectorAll('.element__image');  // - новые карточки иначе не открываются увеличенными
  cardImage.forEach((imageCard) => {
    imageCard.addEventListener('click', () => {
      const popupImage = document.querySelector('.popup-image');
      const popupFullImage = popupImage.querySelector('.popup-image__full-image');
      const titleImage = popupImage.querySelector('.popup-image__title');
      const cardElement = imageCard.closest('.element');
      const cardNameElement = cardElement.querySelector('.element__name').textContent;
      popupFullImage.src = imageCard.src;
      popupFullImage.alt = cardNameElement;
      titleImage.textContent = cardNameElement;

      popupOpen(popupImage);
    });
  });

  popupClose(popupAdd);
  evt.target.reset();
});

editButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupOpen(popupProfileEdit);
});
closeButton.addEventListener('click', () => {
  popupClose(popupProfileEdit);
});
formElement.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', () => {
  popupOpen(popupAdd);
});
closeAddForm.addEventListener('click', () => {
  popupClose(popupAdd);
});
closePopupImage.addEventListener('click', () => {
  popupClose(popupImage);
});

initialCards.forEach((element) => {
  createCard(element);
  cardsContainer.append(createCard(element));
});