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

  // Объявления для формы редактирования
  const formEditPopup = popups.querySelector('.popup__form');
  const textName = popups.querySelector('#name');
  const textJob = popups.querySelector('#job');

  // Объявления для формы добавления карточек
  const formAddPopup = popups.querySelector('.popup__form');  
  const textLink = popups.querySelector('#link');
  const textTitle = popups.querySelector('#title');

  function showPopup (popups) {
    popups.classList.add('popup_opened');
  }

  function closePopup (popups) {
    popups.classList.remove('popup_opened');
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

  function showAddProfilePopup () {
    formAddPopup.reset(); // Обнуляем поля формы
    showPopup(addPopup);
  }  
  
  addBtn.addEventListener('click', showAddProfilePopup);
  closeBtn.addEventListener('click', closePopup(popups));

  // Сохраняем данные профиля при закрытии попапа. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function saveDataProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = textName.value;
    profileJob.textContent = textJob.value;
    closePopup(popups);
  }

  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  formEditPopup.addEventListener('submit', saveDataProfile);
  formAddPopup.addEventListener('submit', saveDataProfile);
})