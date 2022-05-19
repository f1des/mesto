//import initialCards from './initialCards.js'

window.addEventListener('DOMContentLoaded', function init () {
  window.removeEventListener('DOMContentLoaded', init);  

  const profile = document.querySelector('.profile');
  const profileName = profile.querySelector('.profile__name');
  const profileJob = profile.querySelector('.profile__job');
  const editBtn = profile.querySelector('.profile__edit-btn');
  const addBtn = profile.querySelector('.profile__add-btn');

  const editPopup = document.querySelector('#popupEditProfile');
  const addPopup = document.querySelector('#popupAddPhoto');
  const photoPopup = document.querySelector('#popupShowPhoto');
  const imgPopup = photoPopup.querySelector('.places__image');
  const figcaptionImgPopup = photoPopup.querySelector('.popup__figcaption');

  const popups = document.querySelectorAll('.popup');
  // Объявления для формы редактирования и добавления карточек
  const formEditProfile = document.querySelector('.popup__form');
  const { name:textName, job:textJob } = formEditProfile.elements;
  const formAddPhoto = document.querySelector('.popup__form');
  const { title:textTitle, link:textLink } = formAddPhoto.elements;

  const Like = document.querySelectorAll('.places__like-btn');

  function showPopup (popups) {
    popups.classList.add('popup_opened');
  }

  function closePopup (popup) {
    popup.classList.remove('popup_opened');
  }

  const modifyDataInProfile = () => {
    if (textName.value !== profileName.textContent) {
      textName.value = profileName.textContent;
    }
    if (textJob.value !== profileJob.textContent) {
      textJob.value = profileJob.textContent;
    }
  }

  function showEditProfilePopup () {   
    showPopup(editPopup);
    modifyDataInProfile();
  }

  function showAddPhotoPopup () {
    showPopup(addPopup);
  }  
  
  editBtn.addEventListener('click', showEditProfilePopup);
  addBtn.addEventListener('click', showAddPhotoPopup);

  // Сохраняем данные профиля при закрытии попапа редактьирования профиля. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
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
  Like.forEach((likeBtn) => {
    likeBtn.addEventListener('click', (evt) => {
      evt.target.classList.toggle('places__like-btn_active');
    });
  });

  //Функция открытия попапа для img
  function popupShowPhoto () {    
    imgPopup.src = evt.target.src;
    figcaptionImgPopup.textContent = evt.target.alt;
    imgPopup.alt = evt.target.alt;
    showPopup(photoPopup);
  }

  addBtn.addEventListener('click', showAddPhotoPopup);

})