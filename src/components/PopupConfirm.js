import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submit = this._popup.querySelector('.popup__button-submit_confirm');
  }

  setHandleDelete(handleDelete) {
    this._handleDelete = handleDelete
  }

  loading(isLoading) {
    if (isLoading) {
      this._submit.textContent = 'Удаление...';
      this._submit.disabled = true;
    } else {
      this._submit.textContent = 'Да';
      this._submit.disabled = false;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._submit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleDelete();
    })
  }
}