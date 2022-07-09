class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;   

    this._form = form;
    
    this._inputList = Array.from(this._form.querySelectorAll(`.${this._inputSelector}`));
    this._buttonElement = this._form.querySelector(`.${this._submitButtonSelector}`);
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
  _hasInvalidInput() {
    // Проходим по массиву методом some
    return this._inputList.some(inputElement => {
        return !inputElement.validity.valid;
    });
  }

  //Метод деактивации кнопки при повторном открытии попапа для addForm
  _disableSubmitButton() {
    this._buttonElement.disabled = true;
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  //Метод активации кнопки для editForm
  _enableSubmitButton() {
    this._buttonElement.disabled = false;
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  //Метод настройки состояния кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  //Публичный метод добавления событий для всех форм 
  enableValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
        });
    });
  }

  //Публичный метод очистки формы 
  resetForm = () => {
    this._toggleButtonState();
    
    this._inputList.forEach(inputElement => {
      this._hideError(inputElement);
    });
  }
}

export default FormValidator;