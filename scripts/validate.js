const showInputError = (validationConfig, popupForm, formInput, errorMessage) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validationConfig.inputErrorClass);
  formError.classList.add(validationConfig.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (validationConfig, popupForm, formInput) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validationConfig.inputErrorClass);
  formError.classList.remove(validationConfig.errorClass);
  formError.textContent = '';
};

const isValid = (validationConfig, popupForm, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(validationConfig, popupForm, formInput, formInput.validationMessage);
  } else {
    hideInputError(validationConfig, popupForm, formInput);
  }
};

const setEventListeners = (validationConfig, popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = popupForm.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(validationConfig, popupForm, formInput);
      toggleButtonState(validationConfig, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupForm) => {
    return !popupForm.validity.valid;
  });
};

const toggleButtonState = (validationConfig, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((popupForm) => {
    setEventListeners(validationConfig, popupForm);
  })
};

function resetErrorInput(validationConfig, popup) {
  const form = popup.querySelector(validationConfig.formSelector);
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  inputs.forEach((input) => {
    input.classList.remove(validationConfig.inputErrorClass);
  });
};

function resetErrorMessage(validationConfig, popup) {
  const form = popup.querySelector(validationConfig.formSelector);
  const formErrors = Array.from(form.querySelectorAll('.popup__input-error'));
  formErrors.forEach((error) => {
    error.classList.remove(validationConfig.errorClass);
    error.textContent = '';
  });
};

function resetValidationErrors (validationConfig, popup) {
  resetErrorInput(validationConfig, popup);
  resetErrorMessage(validationConfig, popup)
};
