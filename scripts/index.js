import initialCards from './initialCards.js'

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
  const cardsTemplate = document.querySelector('.template__cards');
 
  function showPopup(popup) {
    popup.classList.add('popup_opened');
  }

  function closePopup(popup) {
    popup.classList.remove('popup_opened');
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

  buttonEdit.addEventListener('click', showEditProfilePopup);

  function showAddpopupOpenPhoto() {
    showPopup(popupAddPhoto);
  }    
  
  buttonAdd.addEventListener('click', showAddpopupOpenPhoto);

  // Функция сохранения данных профиля при закрытии попапа редактирования профиля
  function saveDataProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы
    profileName.textContent = textName.value;
    profileJob.textContent = textJob.value;
    closePopup(popupEditProfile);
  }

  formEditProfile.addEventListener('submit', saveDataProfile);

  //Закрытие попапа
  popups.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
      }
    });
  })

  //Функция открытия попапа для image
  function popupShowPhoto(evt) {
    image.src = evt.target.src;
    figCaptionImagePopup.textContent = evt.target.alt;
    image.alt = evt.target.alt;
    showPopup(popupOpenPhoto);
  }

   //Функция проставления лайка
   function putLike(evt) {
    evt.target.classList.toggle('places__like-btn_active');
  }

  //Функция удаления карточек
  function deleteCard(evt) {
    const card = evt.target.closest('.places__item')
    if(card) {
      card.remove()
    }
  }

  //Вывод карточек на страницу
  function createCard(item) { 
    const name = item.name;
    const link = item.link;    
    const template = cardsTemplate.content.cloneNode(true);
    
    const nameCard = template.querySelector('.places__title');
    nameCard.textContent = name;
    
    const buttonLikePlaces = template.querySelector('.places__like-btn');
    buttonLikePlaces.addEventListener('click', putLike);
    
    const buttonDeletePlaces = template.querySelector('.places__basket');
    buttonDeletePlaces.addEventListener('click', deleteCard);
    
    const imagePlaces =  template.querySelector('.places__image');
    imagePlaces.addEventListener('click', popupShowPhoto);
    imagePlaces.src = link;
    imagePlaces.alt = name;
    
    return template;
  } 

  //Функция добавления карточек в разметку
  function addCard(wrap, item) {
    wrap.prepend(createCard(item));
  }

  //Добавление карточек из массива на страницу
  initialCards.forEach(item => {
    addCard(cardsPlaces, item);
  })

  function renderCard(evt) {
    evt.preventDefault();
    const item = {link: linkNewCard.value, name: nameNewCard.value}; 
    addCard(cardsPlaces, item); 
    closePopup(popupAddPhoto);
    evt.target.reset();
  }

  formPlaceNew.addEventListener('submit', renderCard);
})

// Валидация форм -> Работа с формами -> п.6 События change и input -> Тренажер зад.5-6-7
// HTML              Валидация форм -> 2. Встроенная браузерная валидация форм -> Тренажер зад.1-2-3
// JS                                  4.