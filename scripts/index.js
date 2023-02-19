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
const form = document.querySelector('.popup__form_add');
const addButton = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_add');
const closeAddForm = document.querySelector('.popup__button-close_add');
const closePopupImage = document.querySelector('.popup-image__button-close');
const popupImage = document.querySelector('.popup-image');
const titleInput = form.querySelector('.popup__input_type_title');
const linkInput = form.querySelector('.popup__input_type_link');
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

function popupClose() {
  popup.classList.remove('popup_opened');
  popupAdd.classList.remove('popup_add_opened');
  popupImage.classList.remove('popup-image_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupClose();
}

const createCard = (titleInput, linkInput) => {
  const cardTemplate = document.querySelector('.element-template').content.cloneNode(true);
  cardTemplate.querySelector('.element__name').textContent = titleInput.value;
  cardTemplate.querySelector('.element__image').src = linkInput.value;
  cardTemplate.querySelector('.element__image').alt = titleInput.value;
  cardTemplate.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });

  const cardElement = cardTemplate.querySelector('.element');
  cardTemplate.querySelector('.element__trash').addEventListener('click', function () {
    cardElement.remove();
  });

  return cardTemplate;
};

function openFullImage() {
  const cardImage = document.querySelectorAll('.element__image');
  cardImage.forEach(function (imageCard) {
    imageCard.addEventListener('click', function() {
    const popupImage = document.querySelector('.popup-image');
    const popupFullImage = popupImage.querySelector('.popup-image__full-image');
    const titleImage = popupImage.querySelector('.popup-image_title');
    const cardElement = imageCard.closest('.element');
    const cardNameElement = cardElement.querySelector('.element__name').textContent;
    
    popupFullImage.src = imageCard.src;
    popupFullImage.alt = cardNameElement;
    titleImage.textContent = cardNameElement;
  
    popupImage.classList.add('popup-image_opened');
  });
  });
  };

initialCards.forEach(function (element) {
  const cardTemplate = document.querySelector('.element-template').content.cloneNode(true);
  const cardsContainer = document.querySelector('.elements');
  cardTemplate.querySelector('.element__name').textContent = element.name;
  cardTemplate.querySelector('.element__image').src = element.link;
  cardTemplate.querySelector('.element__button-like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button-like_active');
  });

  const cardElement = cardTemplate.querySelector('.element');
  cardTemplate.querySelector('.element__trash').addEventListener('click', function () {
    cardElement.remove();
  });


  cardsContainer.append(cardTemplate);
});
openFullImage();

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  cardTemplate.querySelector('.element__name').textContent = titleInput.value;
  cardTemplate.querySelector('.element__image').src = linkInput.value;
  cardTemplate.querySelector('.element__image').alt = titleInput.value;
  if (titleInput.value, linkInput.value) {
    cardsContainer.prepend(createCard(titleInput, linkInput));
  };
  popupClose();
  titleInput.value = '';
  linkInput.value = '';
  openFullImage();
});

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
formElement.addEventListener('submit', handleFormSubmit);
addButton.addEventListener('click', () => {
  popupAdd.classList.add('popup_add_opened');
});
closeAddForm.addEventListener('click', popupClose);
closePopupImage.addEventListener('click', popupClose);
