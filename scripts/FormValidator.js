export default class FormValidator {
  constructor(data, formSelector) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = formSelector;
  }

  //Метод отображения ошибки
  _showError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._inputErrorClass);
  }

  //Метод скрытия ошибки
  _hideError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {  
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showError(inputElement, errorMessage);
    } else {
        this._hideError(inputElement);
    }
  }

  // Функция проверки на корректность данных
  _hasInvalidInput(inputList) {
    // Проходим по массиву методом some
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
  }

  //Метод деактивации кнопки при повторном открытии попапа для addForm
  _disableSubmitButton(buttonElement) {
    buttonElement.disabled = true;
    buttonElement.classList.add(this._inactiveButtonClass);
  }

  //Метод активации кнопки для editForm
  _enableSubmitButton(buttonElement) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(this._inactiveButtonClass);
  }

  //Метод настройки состояния кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement, this._inactiveButtonClass);
    } else {
      enableSubmitButton(buttonElement, this._inactiveButtonClass)
    }
  }

  //Метод добавления событий для всех форм 
  _setEventListener() {
    const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    const buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
  }

  //Метод валидации
  _enableValidation() {
    const formList = Array.from(document.querySelectorAll(`.${this._form}`));
    formList.forEach((formElement) => {
        setEventListener(formElement);
    })
  };

  _enableValidation()
}
















/*
const objValidation = {
  formSelector: 'popup__form',                  
  inputSelector: 'popup__text',                 
  submitButtonSelector: 'popup__submit-btn',    
  inactiveButtonClass: 'popup__button_disabled', 
  inputErrorClass: 'popup__text_type_error',     
  errorClass: 'popup__error_visible'             
}*/

//Функция отображения ошибки
/*function showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
  inputElement.classList.add(inputErrorClass);
}*/

// //Функция скрытия ошибки
// function hideError(formElement, inputElement, inputErrorClass, errorClass) {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   errorElement.classList.remove(errorClass);
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.textContent = '';
// }


// function checkInputValidity(formElement, inputElement, inputErrorClass, errorClass) {  
//   if (!inputElement.validity.valid) {
//     const errorMessage = inputElement.validationMessage;
//     showError(formElement, inputElement, errorMessage, inputErrorClass, errorClass);
//   } else {
//     hideError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// }

// // Функция проверки на корректность данных
// function hasInvalidInput(inputList) {
//   // Проходим по массиву методом some
//   return inputList.some(inputElement => {
//       return !inputElement.validity.valid;
//   });
// }

// //Функция деактивации кнопки при повторном открытии попапа для addForm
// function disableSubmitButton(buttonElement, inactiveButtonClass) {
//   buttonElement.disabled = true;
//   buttonElement.classList.add(inactiveButtonClass);
// }

// //Функция активации кнопки для editForm
// function enableSubmitButton(buttonElement, inactiveButtonClass) {
//   buttonElement.disabled = false;
//   buttonElement.classList.remove(inactiveButtonClass);
// }

// //Функция настройки состояния кнопки
// function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     disableSubmitButton(buttonElement, inactiveButtonClass);
//   } else {
//     enableSubmitButton(buttonElement, inactiveButtonClass)
//   }
// }

// //Функция добавления событий для всех форм 
// function setEventListener(formElement, valid) {
//   const { inputSelector, submitButtonSelector, errorClass, inputErrorClass, inactiveButtonClass } = valid;
//   const inputList = Array.from(formElement.querySelectorAll(`.${inputSelector}`));
//   const buttonElement = formElement.querySelector(`.${submitButtonSelector}`);

//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);

//   inputList.forEach(inputElement => {
//       inputElement.addEventListener('input', () => {
//           checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
//           toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//       });
//   });
// }

// //Функция валидации
// function enableValidation(objValidation) {
//   const { formSelector } = objValidation;
//   const formList = Array.from(document.querySelectorAll(`.${formSelector}`));
//   formList.forEach((formElement) => {
//       setEventListener(formElement, objValidation);
//   })
// };

// enableValidation(objValidation);


