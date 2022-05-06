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

  const popups = document.querySelector('.popup');
  const closeBtn = popups.querySelector('.popup__close-btn');

  // Объявления для формы редактирования и добавления карточек
  const formEditProfile = popups.querySelector('.popup__form');
  const { name:textName, job:textJob } = formEditProfile.elements;
  const formAddPhoto = popups.querySelector('.popup__form');
  const { title:textTitle, link:textLink } = formAddPhoto.elements;

  function showPopup (popups) {
    popups.classList.add('popup_opened');
  }

  function closePopup () {
    popups.classList.remove('popup_opened');
  }

  const modifyDataInProfile = () => {
    if (textName.value !== profileName.textContent) {
      textName.value = profileName.textContent;
    }
    if (textJob.value !== profileJob.textContent) {
      textJob.value = profileJob.textContent;
    }
  };

  function showEditProfilePopup () {   
    showPopup(editPopup);
    modifyDataInProfile();
  }
  
  editBtn.addEventListener('click', showEditProfilePopup);
  //closeBtn.addEventListener('click', closePopup);

  function showAddProfilePopup () {
    showPopup(addPopup);
  }  
  
  addBtn.addEventListener('click', showAddProfilePopup);
  //closeBtn.addEventListener('click', closePopup);

  // Сохраняем данные профиля при закрытии попапа. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function saveDataProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = textName.value;
    profileJob.textContent = textJob.value;
    closePopup;
  }

   // Сохраняем данные профиля при закрытии попапа. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
   function saveDataPhoto(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    closePopup;
  }

  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  formEditProfile.addEventListener('submit', saveDataProfile);
  formAddPhoto.addEventListener('submit', saveDataPhoto);
})