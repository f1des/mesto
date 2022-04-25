//Получаем все элементы классов с помощью querySelector и присваиваем к константам
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');
const editBtn = profile.querySelector('.profile__edit-btn');
const addBtnPlace = profile.querySelector('.profile__add-btn');

const popups = document.querySelector('.popup');
const closeBtn = popups.querySelector('.popup__close-btn');
const textName = popups.querySelector('#name');
const textJob = popups.querySelector('#job');
const popupDataSave = popups.querySelector(".popup__wrapper");

const submitBtn = document.querySelector('.popup__submit-btn');

editBtn.addEventListener('click', function () {
  popups.classList.add('popup_opened');
});

function closePopup () {
  popups.classList.remove('popup_opened');
}

closeBtn.addEventListener('click', closePopup);

//Проверка на валидность
function anchorFromProfile () {
  if (textName.value !== profileName.textContent) {
    textName.value = profileName.textContent;
  }
  if (textJob.value !== profileJob.textContent) {
    textJob.value = profileJob.textContent;
  }
};

editBtn.addEventListener('click', anchorFromProfile);

// Сохраняем данные профиля при закрытии попапа
function saveDataProfile(evt) {
  evt.preventDefault();
  profileName.textContent = textName.value;
  profileJob.textContent = textJob.value;
  closePopup;
}

popupDataSave.addEventListener("submit", saveDataProfile);

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler(evt) {
  //evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  saveDataProfile(evt);
}

// // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
submitBtn.addEventListener('submit', formSubmitHandler);
