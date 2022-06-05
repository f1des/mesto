// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const objValidation = {
  formSelector: 'popup__form',                  //+ all form
  inputSelector: 'popup__text',                 //+ all input
  submitButtonSelector: 'popup__submit-btn',    //+ button
  inactiveButtonClass: 'popup__button_disabled', //+
  inputErrorClass: 'popup__text_type_error',     //+ изменили на свой с input
  errorClass: 'popup__error_visible'             //+ text error
}

//Функция отображения ошибки
function showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}

//Функция скрытия ошибки
function hideError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
}


function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {  
  if (!inputElement.validity.valid) {
    const errorMessage = inputElement.validationMessage;
    showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
  } else {
    hideError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// Функция проверки на корректность данных
function hasInvalidInput(inputList) {
  // Проходим по массиву методом some
  return inputList.some(inputElement => {
      return !inputElement.validity.valid;
  });
}

//Функция деактивации кнопки при повторном откртии попапа 
function disableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.disabled = true;
  buttonElement.classList.add(inactiveButtonClass);
}

//Функция настройки состояния кнопки
function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.disabled = true;
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.disabled = false;
  }
}

//Функция добавления событий для всех форм 
function setEventListener(formElement, valid) {
  const { inputSelector, submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass } = valid;
  const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
  const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
          checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
          toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      });
  });
}

//Функция валидации
function enableValidation(objValidation) {
  const { formSelector } = objValidation;
  const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', evt => {
          evt.preventDefault();
      });
      setEventListener(formElement, objValidation);
  })
};

enableValidation(objValidation);