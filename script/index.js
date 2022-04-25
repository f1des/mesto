window.addEventListener('DOMContentLoaded', function init () {
  window.removeEventListener('DOMContentLoaded', init)
    //Получаем все элементы классов с помощью querySelector и присваиваем к константам
    const profile = document.querySelector('.profile');
    const profileName = profile.querySelector('.profile__name');
    const profileJob = profile.querySelector('.profile__job');
    const editBtn = profile.querySelector('.profile__edit-btn');
    const addBtnPlace = profile.querySelector('.profile__add-btn');

    const popups = document.querySelector('.popup');
    const closeBtn = popups.querySelector('.popup__close-btn');
    const form = popups.querySelector('.popup__form');
    const { name:textName, job:textJob } = form.elements

    const submitBtn = document.querySelector('.popup__submit-btn');

    editBtn.addEventListener('click', function () {
      popups.classList.add('popup_opened');
    });

    function closePopup () {
      popups.classList.remove('popup_opened');
    }

    closeBtn.addEventListener('click', closePopup);

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

    editBtn.addEventListener('click', anchorFormProfile);

    // Сохраняем данные профиля при закрытии попапа. Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
    function saveDataProfile(evt) {
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
      profileName.textContent = textName.value;
      profileJob.textContent = textJob.value;
      closePopup(popups);
    }

    // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
    form.addEventListener('submit', saveDataProfile);

    //Функция проверки на ввод
    function checkName()  {
      if ((textName.value !== profileName.textContent) || (textJob.value !== profileJob.textContent)) {
        submitBtn.disabled = false;
      }    
    }

    form.querySelectorAll('input').forEach((input) => {
      input.addEventListener('input', checkName)
    })
})