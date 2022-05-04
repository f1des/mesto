//import initialCards from './initialCards.js'

window.addEventListener('DOMContentLoaded', function init () {
  window.removeEventListener('DOMContentLoaded', init);  

  const profile = document.querySelector('.profile');
  const profileName = profile.querySelector('.profile__name');
  const profileJob = profile.querySelector('.profile__job');
  const editBtn = profile.querySelector('.profile__edit-btn');
  const addBtn = profile.querySelector('.profile__add-btn');

  const popups = document.querySelector('.popup');
  const closeBtn = popups.querySelector('.popup__close-btn');
  const form = popups.querySelector('.popup__form');
  const { name:textName, job:textJob, link:textLink } = form.elements;

  function showEditProfilePopup () {
    popups.classList.add('popup_opened');
    if (textName.value !== profileName.textContent) {
      textName.value = profileName.textContent;
    }
    if (textJob.value !== profileJob.textContent) {
      textJob.value = profileJob.textContent;
    }
  }

  function showAddProfilePopup () {
    popups.classList.add('popup_opened');
    if (textName.value !== profileName.textContent) {
      textName.value = profileName.textContent;
    }
    if (textLink.value !== profileLink.textContent) {
      textLink.value = profileLink.textContent;
    }
  }
  
  editBtn.addEventListener('click', showEditProfilePopup);
  addBtn.addEventListener('click', showAddProfilePopup);

  function closePopup () {
    popups.classList.remove('popup_opened');
  }

  closeBtn.addEventListener('click', closePopup);

  // Сохраняем данные профиля при закрытии попапа. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
  function saveDataProfile(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    profileName.textContent = textName.value;
    profileJob.textContent = textJob.value;
    closePopup(popups);
  }

  // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
  form.addEventListener('submit', saveDataProfile);
})