import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { initialCards, validationConfig, formAdd, addButton, editButton, formProfileEdit, nameInput, jobInput, profileName, profileJob } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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

const formPopupAdd = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: (item) => {
    section.addItem(createCard(item.title, item.link, '.element-template'));
  }
})

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job'
});

const formPopupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item.name, item.job);
  }
})

popupWithImage.setEventListeners();
formPopupAdd.setEventListeners();
formPopupProfileEdit.setEventListeners();

function openPopupEditProfile() {
  formPopupProfileEdit.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;;
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