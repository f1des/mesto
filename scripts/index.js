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
  const formAddPopup = addPopup.querySelector('.popup__form');

  const popups = document.querySelector('.popup');
  const closeBtn = popups.querySelector('.popup__close-btn');
  //const form = popups.querySelector('.popupEditProfile');
  const popupFormEdit = popups.querySelector('.popup__form');
  const popupFormAdd = popups.querySelector('.popup__form');

  const textName = popups.querySelector('#name');
  const textJob = popups.querySelector('#job');
  const textLink = popups.querySelector('#link');

  //Проверка на валидность
function anchorFormProfile () {
  if (textName.value !== profileName.textContent) {
    textName.value = profileName.textContent;
  }
  if (textJob.value !== profileJob.textContent) {
    textJob.value = profileJob.textContent;
  }
  submitBtn.disabled = true;
}

  function showPopup () {
    popups.classList.add('popup_opened');
  }

  function showEditProfilePopup () {
    showPopup(editPopup);
    anchorFormProfile;
  }
  
  editBtn.addEventListener('click', showEditProfilePopup);  

  function showAddProfilePopup () {
    formAddPopup.reset();
    showPopup(addPopup);
  }  
  
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
  popupFormEdit.addEventListener('submit', saveDataProfile);
})