//Получаем все элементы классов с помощью querySelector и присваиваем к константам
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const editBtn = profile.querySelector('.profile__edit-btn');
const addBtnPlace = profile.querySelector('.profile__add-btn');

const popups = document.querySelector('.popup');
const closeBtn = popups.querySelector('.popup__close-btn');

function openPopup() {
  popups.classList.add('popup_opened');
}

function closePopup() {
  popups.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

// // Находим форму в DOM
// let formElement = // Воспользуйтесь методом querySelector()
// // Находим поля формы в DOM
// let nameInput = // Воспользуйтесь инструментом .querySelector()
// let jobInput = // Воспользуйтесь инструментом .querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function formSubmitHandler (evt) {
//     evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
//                                                 // Так мы можем определить свою логику отправки.
//                                                 // О том, как это делать, расскажем позже.

//     // Получите значение полей jobInput и nameInput из свойства value

//     // Выберите элементы, куда должны быть вставлены значения полей

//     // Вставьте новые значения с помощью textContent
// }

// // Прикрепляем обработчик к форме:
// // он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', formSubmitHandler);
