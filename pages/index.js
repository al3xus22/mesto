import Card from '../components/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import { initialCards, validationConfig, popupOverlayList, cardsContainer, formAdd, addButton, popupAdd, titleInput, linkInput, popupProfileEdit, editButton, formProfileEdit, nameInput, jobInput, profileName, profileJob, closeButtonList } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//Валидация формы редактирования профиля
const formValidatorProfileEdit = new FormValidator(validationConfig, formProfileEdit);
formValidatorProfileEdit.enableValidation();

//Валидация формы добавления изображений
const formValidatorAddForm = new FormValidator(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link, '.element-template');
    section.addItem(card);
  }
},
  '.elements');

section.renderItems();

const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners();

const formPopupAdd = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (item) => {
    const card = createCard(item.name, item.link, '.element-template');
    section.addItem(card);
    formPopupAdd.close();
  }
})

formPopupAdd.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

const formPopupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  handleFormSubmit: (name, job) => {
    userInfo.setUserInfo(name, job);
    formPopupProfileEdit.close();
  }
})

formPopupProfileEdit.setEventListeners();

function openPopupEditProfile() {
  formPopupProfileEdit.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formValidatorProfileEdit.resetValidationErrors();
  formValidatorProfileEdit.toggleButtonState();
}

function openPopupAdd() {
  formPopupAdd.open();
  formValidatorAddForm.resetValidationErrors();
  formValidatorAddForm.toggleButtonState();
}

//Создать карточку
function createCard(title, image, templateSelector) {
  const card = new Card(title, image, templateSelector, () => popupWithImage.open(title, image));
  return card.generateCard();
}

//Слушатели
editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAdd);