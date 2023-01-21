let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__button-close')

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('inputName');
let jobInput = formElement.querySelector('inputJob');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let submitBottom = document.querySelector('.popup__button-submit')

function handleFormSubmit(evt) {
  evt.preventDefault();  
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}

formElement.addEventListener('submit', handleFormSubmit);
submitBottom.addEventListener('click', popupClose);

