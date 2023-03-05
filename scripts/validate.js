const showInputError = (setValidation, popupForm, formInput, errorMessage) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(setValidation.inputErrorClass);
  formError.classList.add(setValidation.errorClass);
  formError.textContent = errorMessage;
};

const hideInputError = (setValidation, popupForm, formInput) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(setValidation.inputErrorClass);
  formError.classList.remove(setValidation.errorClass);
  formError.textContent = '';
};

const isValid = (setValidation, popupForm, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(setValidation, popupForm, formInput, formInput.validationMessage);
  } else {
    hideInputError(setValidation, popupForm, formInput);
  }
};

const setEventListeners = (setValidation, popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(setValidation.inputSelector));
  const buttonElement = popupForm.querySelector(setValidation.submitButtonSelector);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(setValidation, popupForm, formInput);
      toggleButtonState(setValidation, inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((popupForm) => {
    return !popupForm.validity.valid;
  });
};

const toggleButtonState = (setValidation, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(setValidation.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(setValidation.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = (setValidation) => {
  const formList = Array.from(document.querySelectorAll(setValidation.formSelector));
  formList.forEach((popupForm) => {
    setEventListeners(setValidation, popupForm);
  })
};

