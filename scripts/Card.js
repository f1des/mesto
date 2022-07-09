class Card {
  constructor(data, cardSelector, showPopupImage) { // showPopups ф-я открытия попапа для 8ПР
    this._name = data.name;
    this._link = data.link;    
    this._showPopupImage = showPopupImage;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.places__item').cloneNode(true);
    return cardElement;
  }

  _declVariables() {
    this._buttonLikePlaces = this._element.querySelector('.places__like-btn');
    this._buttonDeletePlaces = this._element.querySelector('.places__basket');

    this._nameCard = this._element.querySelector('.places__title');
    this._imagePlaces = this._element.querySelector('.places__image');
  }

  // Установка данных полей
  _findData() {
    this._element.querySelector('.places__title').alt = this._name;
    this._element.querySelector('.places__title').textContent = this._name;
    this._element.querySelector('.places__image').src = this._link;    
  }

  //Функция проставления лайка
  _putLike = () => {
    this._buttonLikePlaces.classList.toggle('places__like-btn_active');
  };

  //Функция удаления карточек
  _deleteCard = () => {
    this._buttonDeletePlaces.closest('.places__item').remove();
   };

  // Обработчик открытия изображения
  _handlerImageClick = () => {
    this._showPopupImage({name: this._name, link: this._link});
  }

   // Установка слушателей для полей
   _setEventListeners() {
    this._buttonLikePlaces.addEventListener('click', this._putLike);
    this._buttonDeletePlaces.addEventListener('click', this._deleteCard);
    this._imagePlaces.addEventListener('click', this._handlerImageClick);
  }

  createCardElement() {
    this._element = this._getTemplate();    
    this._declVariables();
    this._findData();
    this._setEventListeners();
    return this._element;
  }
}

export default Card;