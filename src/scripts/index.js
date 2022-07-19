import '../pages/index.css';
import { initialCards, objValidation, templateSelector } from './constants.js';
import FormValidator from './FormValidator.js';
import Card from './Card.js';

window.addEventListener('DOMContentLoaded', function init () {
  window.removeEventListener('DOMContentLoaded', init);  

  const profile = document.querySelector('.profile');
  const profileName = profile.querySelector('.profile__name');
  const profileJob = profile.querySelector('.profile__job');
  const buttonEdit = profile.querySelector('.profile__edit-btn');
  const buttonAdd = profile.querySelector('.profile__add-btn');

  const popupEditProfile = document.querySelector('.popup_edit-photo');
  const popupOpenPhoto = document.querySelector('.popup_show-photo');
  const popupAddPhoto = document.querySelector('.popup_add-photo');

  const image =  popupOpenPhoto.querySelector('.popup__image');

  const figCaptionImagePopup = popupOpenPhoto.querySelector('.popup__figcaption');
  
  const popups = document.querySelectorAll('.popup');
  
  const formEditProfile = document.querySelector('#form-profile-new');
  const { name:textName, job:textJob } = formEditProfile.elements;

  const nameNewCard = document.querySelector('.popup__text-title');
  const linkNewCard = document.querySelector('.popup__text-url');  

  const formPlaceNew = document.querySelector('#form-place-new');

  const cardsPlaces = document.querySelector('.places__cards');

  const formValidators = {};

  // Преробразовываем в массив из коллекций
  Array.from(document.forms).forEach((formElement) => {
    formValidators[formElement.name] = new FormValidator(objValidation, formElement); // Помещаем экземпляр класса в новый объект
    formValidators[formElement.name].enableValidation(); //Включаем валидацию для всех форм
  });

  function closeByEscape(evt) {    
    if (evt.key === 'Escape') {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened);
    }
  }

  function showPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }

  function showEditProfilePopup() { 
    showPopup(popupEditProfile);
    if (textName.value !== profileName.textContent) {
      textName.value = profileName.textContent;
    }
    if (textJob.value !== profileJob.textContent) {
      textJob.value = profileJob.textContent;
    }
  }

  buttonEdit.addEventListener('click', () => {
    formValidators[formProfileNew.name].resetForm(); 
    showEditProfilePopup();
  });

  function showAddPopupOpenPhoto() {
    showPopup(popupAddPhoto);
  }    
  
  buttonAdd.addEventListener('click', () => {
    formValidators[formPlaceNew.name].resetForm(); 
    showAddPopupOpenPhoto();
  });

  // Функция сохранения данных профиля при закрытии попапа редактирования профиля
  function saveDataProfile(evt) {
    evt.preventDefault();
    profileName.textContent = textName.value;
    profileJob.textContent = textJob.value;
    closePopup(popupEditProfile);
  }

  formEditProfile.addEventListener('submit', saveDataProfile);

   //Закрытие попапа
   popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-btn') || evt.target.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  })

  //Функция открытия попапа для image
  function showPopupPhoto(data) {
    const {name, link} = data;
    image.src = link;
    figCaptionImagePopup.textContent = name;
    image.alt = name;
    showPopup(popupOpenPhoto);
  }

  //Вывод карточек на страницу
  function createCard(data) {
    const card = new Card(data, templateSelector, showPopupPhoto);
    return card.createCardElement();
  } 

  //Функция добавления карточек в разметку
  function addCard(cardElement) {
    cardsPlaces.prepend(cardElement);
  }

  //Добавление карточек из перевернутого массива на страницу
  initialCards.reverse().forEach((item) => {
    addCard(createCard(item));
  })

  function renderCard(evt) {
    evt.preventDefault();
    const item = {name: nameNewCard.value, link: linkNewCard.value}; 
    addCard(createCard(item)); 

    closePopup(popupAddPhoto);
    evt.target.reset();
  }

  formPlaceNew.addEventListener('submit', renderCard);
})