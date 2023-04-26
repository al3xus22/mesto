import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, formAdd, addButton, editButton, formProfileEdit, nameInput, jobInput, updateAvatarButton, popupUpdateAvatar } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '8fdce149-9bec-467e-96d2-64987568c2dd',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      id: userData._id
    });
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log('Ошибка. Запрос не выполнен: ', err);
  });

//Создать карточку------------------------
function createCard(data, templateSelector) {
  const card = new Card(
    userInfo.id,
    data,
    templateSelector,
    () => popupWithImage.open(data),
    (card) => {
      popupConfirmDelete.open();
      popupConfirmDelete.setHandleDelete(() => {
        popupConfirmDelete.loading(true);
        api.deleteUserCard(card.getCardId())
          .then(() => {
            card.deleteCard();
            popupConfirmDelete.close();
          })
          .catch((err) => {
            console.log('Ошибка. Запрос не выполнен: ', err);
          })
          .finally(() => {
            popupConfirmDelete.loading(false);
          })
      })
    },
    (card) => {
      api.putLike(card.getCardId())
        .then((res) => {
          card.toggleLike(res);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
    },
    (card) => {
      api.deleteLike(card.getCardId())
        .then((res) => {
          card.toggleLike(res);
        })
        .catch((err) => {
          console.log('Ошибка. Запрос не выполнен: ', err);
        })
    })
  return card.generateCard();
}

//Инфо пользователя----------------------
const userInfo = new UserInfo({
  name: '.profile__name',
  about: '.profile__job',
  avatar: '.profile__avatar'
});

//Секция карточек------------------------
const section = new Section({
  renderer: (data) => {
    section.addItem(createCard(data, '.element-template'));
  }
},
  '.elements');

//Попапы--------------------------------
const popupWithImage = new PopupWithImage('.popup-image');

const formPopupAdd = new PopupWithForm({
  popupSelector: '.popup_add',
  handleFormSubmit: ({ title, link }) => {
    formPopupAdd.loading(true);
    api.addNewCard({ title, link })
      .then((data) => {
        section.addNewItem(createCard(data, '.element-template'));
        formPopupAdd.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        formPopupAdd.loading(false);
      });
  }
});

const formPopupProfileEdit = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  handleFormSubmit: ({ name, job }) => {
    formPopupProfileEdit.loading(true);
    api.setUserInfo({ name, job })
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
        formPopupProfileEdit.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        formPopupProfileEdit.loading(false);
      });
  }
});

const updateAvatar = new PopupWithForm({
  popupSelector: '.popup_update-avatar',
  handleFormSubmit: ({ avatar }) => {
    updateAvatar.loading(true);
    api.updateUserAvatar({ avatar })
      .then((data) => {
        userInfo.setUserInfo({ name: data.name, about: data.about, avatar: data.avatar });
        updateAvatar.close();
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      })
      .finally(() => {
        updateAvatar.loading(false);
      });
  }
});

const popupConfirmDelete = new PopupConfirm('.popup_confirm')

//Попапы при открытии-------------------
function openPopupEditProfile() {
  formPopupProfileEdit.open();
  const { name, about } = userInfo.getUserInfo();
  nameInput.value = name;
  jobInput.value = about;
  formValidatorProfileEdit.resetValidationErrors();
  formValidatorProfileEdit.toggleButtonState();
}

function openPopupAdd() {
  formPopupAdd.open();
  formValidatorAddForm.resetValidationErrors();
  formValidatorAddForm.toggleButtonState();
}

function openPopupUpdateAvatar() {
  updateAvatar.open();
  formValidatorUpdateAvatar.resetValidationErrors();
  formValidatorUpdateAvatar.toggleButtonState();
}

//Слушатели-----------------------------
popupConfirmDelete.setEventListeners();
updateAvatar.setEventListeners();
popupWithImage.setEventListeners();
formPopupAdd.setEventListeners();
formPopupProfileEdit.setEventListeners();

editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAdd);
updateAvatarButton.addEventListener('click', openPopupUpdateAvatar);

//Валидация формы редактирования профиля
const formValidatorProfileEdit = new FormValidator(validationConfig, formProfileEdit);
formValidatorProfileEdit.enableValidation();

//Валидация формы добавления изображений
const formValidatorAddForm = new FormValidator(validationConfig, formAdd);
formValidatorAddForm.enableValidation();

//Валидация формы обновления аватара
const formValidatorUpdateAvatar = new FormValidator(validationConfig, popupUpdateAvatar);
formValidatorUpdateAvatar.enableValidation();