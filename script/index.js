// let page = document.querySelector('.page');
// let popup_opened = page.querySelector('.popup');

// function openPopap() {
//   /*popup_opened.setAttribute('disabled', true); */
//   popup_opened.classList.add('.popup_opened');

//   console.log('Мы кликнули по элементу');
// }

// // popup_opened.addEventListener('click', openPopap);
// let page = document.querySelector('.page');
// let openP = page.querySelector('.popup');

let btn = document.querySelector('.profile__add-btn');
let par = document.querySelector('.popup');
btn[0].onclick = function() {
  par[0].classList.add("popup_opened");
}