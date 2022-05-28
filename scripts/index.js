import initialCards from './initialCards.js'

window.addEventListener('DOMContentLoaded', function init () {
  window.removeEventListener('DOMContentLoaded', init);  

  const profile = document.querySelector('.profile');
  const profileName = profile.querySelector('.profile__name');
  const profileJob = profile.querySelector('.profile__job');
  const editBtn = profile.querySelector('.profile__edit-btn');
  const addBtn = profile.querySelector('.profile__add-btn');

  const editPopup = document.querySelector('#popupEditProfile');
  //const addPopup = document.querySelector('#popupAddPhoto');
  const photoPopup = document.querySelector('#popupShowPhoto');
  const img =  photoPopup.querySelector('.places__image');
  const imgItem = document.querySelectorAll('.places__image')

  const figcaptionImgPopup = photoPopup.querySelector('.popup__figcaption');

  const popups = document.querySelectorAll('.popup');
  // Объявления для формы редактирования и добавления карточек
  const formEditProfile = document.querySelector('.popup__form');
  const { name:textName, job:textJob } = formEditProfile.elements;
  const formAddPhoto = document.querySelector('.popup__form');

  const likeCard = document.querySelectorAll('.places__like-btn');

  const nameNewCard = document.querySelector('.popup__text-title'); // edit
  const linkNewCard = document.querySelector('.popup__text-url');   // edit

  const newPlaceForm = document.querySelector('#new-place-form');
 
  function showPopup (popups) {
    popups.classList.add('popup_opened');
  }

  function closePopup (popup) {
    popup.classList.remove('popup_opened');
  }

  function showEditProfilePopup () {   
    showPopup(editPopup);
    if (textName.value !== profileName.textContent) {
      textName.value = profileName.textContent;
    }
    if (textJob.value !== profileJob.textContent) {
      textJob.value = profileJob.textContent;
    }
  }

  editBtn.addEventListener('click', showEditProfilePopup);

  function showAddPhotoPopup () {
    showPopup(popupAddPhoto);
  }    
  
  addBtn.addEventListener('click', showAddPhotoPopup);

  // Сохраняем данные профиля при закрытии попапа редактирования профиля. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function saveDataProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = textName.value;
    profileJob.textContent = textJob.value;
    closePopup(document.querySelector('.popup'));
  }

   // Сохраняем данные профиля при закрытии попапа добавления карточки.
   function saveDataPhoto(evt) {
    evt.preventDefault();
    closePopup;
  }

  // Прикрепляем обработчики к форме: он будет следить за событием “submit” - «отправка»
  formEditProfile.addEventListener('submit', saveDataProfile);
  formAddPhoto.addEventListener('submit', saveDataPhoto);

  //Функция делегирования событий для закрытий попапа
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
      }
    });
  });

  //Функция проставления лайка
  function putLike (evt) {
    const card = evt.target.classList.toggle('places__like-btn_active');
    if(card) {
      card.remove()
    }
  }
  
  likeCard.forEach(basket => {
    basket.addEventListener('click', putLike)
  })  

  //Функция открытия попапа для img
  function popupShowPhoto (evt) {
    img.src = evt.target.src;
    figcaptionImgPopup.textContent = evt.target.alt;
    img.alt = evt.target.alt;
    showPopup(photoPopup);
  }
  
  imgItem.forEach(item => {
    item.addEventListener('click', popupShowPhoto);
  });

  //Удаление карточек
  function deleteCard (evt) {
    const card = evt.target.closest('.places__item')
    if(card) {
      card.remove()
    }
  }
  
  document.querySelectorAll('.places__basket').forEach(basket => {
    basket.addEventListener('click', deleteCard)
  })

  //Добавление новых карточек на страницу ERR
 
  initialCards.forEach(createCard);

  //Вывод карточек на страницу
  function createCard (item) { 
    const name = item.name;
    const link = item.link;
    const template = document.querySelector('.template__cards').content.cloneNode(true);
    
    const nameCard = template.querySelector('.places__title');
    nameCard.textContent = name;
    
    const likeBtn = template.querySelector('.places__like-btn');
    likeBtn.addEventListener('click', putLike);
    
    const deleteBtn = template.querySelector('.places__basket');
    deleteBtn.addEventListener('click', deleteCard);
    
    const img =  template.querySelector('.places__image');
    img.addEventListener('click', popupShowPhoto);
    img.src = link;
    img.alt = name;
    
    document.querySelector('.places__cards').prepend(template);
  }

  // Функция создания карточек
  function addCardHandler(evt) {
    evt.preventDefault();
    const item = {link: linkNewCard.value, name: nameNewCard.value};
    createCard(item);
    closePopup(popupAddPhoto);
    evt.target.reset();    
  }

  newPlaceForm.addEventListener('submit', addCardHandler);
})