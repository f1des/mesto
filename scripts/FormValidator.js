class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
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

  // Меняем показ ошибки
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
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement, this._inactiveButtonClass);
    } else {
      this._enableSubmitButton(buttonElement, this._inactiveButtonClass);
    }
  }

  //Публичный метод добавления событий для всех форм 
  enableValidation() {
    const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    const buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(inputList, buttonElement);
        });
    });
  }

  //Публичный метод очистки формы 
  resetForm = () => {
    const inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    const buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);

    this._toggleButtonState(inputList, buttonElement);
    
    inputList.forEach(inputElement => {
      this._hideError(inputElement);
    });
  }
}

export default FormValidator;