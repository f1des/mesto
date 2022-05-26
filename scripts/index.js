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
  const img =  photoPopup.querySelector('.places__image');
  const imgItem = document.querySelectorAll('.places__image')

  const figcaptionImgPopup = photoPopup.querySelector('.popup__figcaption');

  const popups = document.querySelectorAll('.popup');
  // Объявления для формы редактирования и добавления карточек
  const formEditProfile = document.querySelector('.popup__form');
  const { name:textName, job:textJob } = formEditProfile.elements;
  const formAddPhoto = document.querySelector('.popup__form');
  // const { title:textTitle, link:textLink } = formAddPhoto.elements;


  const likeCard = document.querySelectorAll('.places__like-btn');

  const delCard = document.querySelectorAll('.places__basket');

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
  function putLike () {
    likeCard.forEach((likeBtn) => {
      likeBtn.addEventListener('click', (evt) => {
        evt.target.classList.toggle('places__like-btn_active');
      });
    });
  }

  putLike();  

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
  function deleteCard () {
    delCard.forEach (item => {
      item.addEventListener('click', (evt) => {      
        evt.target.closest('.places__item').remove();
      })
    })
  }  

  deleteCard();

  //Добавление новых карточек на страницу ERR
  // function createCard (item) {
  //   const name = item.name;
  //   const link = item.link;
  //   const templates = document.querySelector('.template').textContent.querySelector('.card').cloneNode(true);
  //   const nameCardTemplate = templates.querySelector('.places__title');
  //   const imgCardTemplate =  templates.querySelector('.places__image');
  //   const likeCardTemplate = templates.querySelector('.places__like-btn');
  //   const delCardTemplate = templates.querySelector('.places__basket');
  //   likeCardTemplate.addEventListener('click', deleteCard);
  //   delCardTemplate.addEventListener('click', putLike);
  //   imgCardTemplate.addEventListener('click', popupShowPhoto);
  //   nameCardTemplate.textContent = name;
  //   imgCardTemplate.src = link;
  //   imgCardTemplate.alt = name;
  //   containerCardItems.append(templates);
  // }

  // // Функция создания карточек
  // function AddCardHandler() {
  //   evt.preventDefault();
  //   //createCard({link: linkNewCard.value, name: nameNewCard.value});
  //   closePopup(formAddPhoto);
  //   evt.target.reset();

  //   formHandlerAddCard.addEventListener('submit', AddCardHandler);
  // }
  



})