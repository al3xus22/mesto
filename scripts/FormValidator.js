class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._form = form;
  }

  _isValid(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput, formInput.validationMessage);
    } else {
      this._hideInputError(formInput);
    }
  };

  _hideInputError(formInput) {
    const formError = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    formError.classList.remove(this._errorClass);
    formError.textContent = '';
  };

  _showInputError(formInput, errorMessage) {
    const formError = this._form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(this._inputErrorClass);
    formError.classList.add(this._errorClass);
    formError.textContent = errorMessage;
  };

  enableValidation() {
    _setEventListeners();
  }

  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const buttonElement = this._form.querySelector(this._submitButtonSelector);
    inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._isValid(formInput);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((popupForm) => {
      return !popupForm.validity.valid;
    });
  };

  //Активация-деактивация кнопки-сабмита
  toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  //Очистить инпуты
  _resetErrorInput() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputs.forEach((input) => {
      input.classList.remove(this._inputErrorClass);
    });
  };
  //Очистить сообщения об ошибке
  _resetErrorMessage() {
    const formErrors = Array.from(this._form.querySelectorAll('.popup__input-error'));
    formErrors.forEach((error) => {
      error.classList.remove(this._errorClass);
      error.textContent = '';
    });
  };
  //Очистить значения формы (инпуты, сообщения)
  resetValidationErrors() {
    this._resetErrorInput();
    this._resetErrorMessage()
  };
}

export default FormValidator;