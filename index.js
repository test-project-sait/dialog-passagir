
import {formValidator} from "./FormValidator.js"

const submitButton = document.querySelector(".form_submit");
const readMore = document.getElementById('readMore');
const readLess = document.getElementById('readLess');
const spinner = document.querySelector(".spinner");
const descriptionShort = document.getElementById('descriptionShort');
const descriptionLong = document.getElementById('descriptionLong');
const email = document.getElementById('email');
const username = document.getElementById('username');
const text = document.getElementById('user_feedback');
const valid = [];

function renderLoading (isLoading, spinner) {
  if(isLoading) {
    spinner.classList.add(`${spinner.classList[0]}_visible`);
    // content.classList.add(`${content.classList[0]}_hidden`);
  }
  else {
    spinner.classList.remove(`${spinner.classList[0]}_visible`);
    // content.classList.remove(`${content.classList[0]}_hidden`);
  }
}

function renderSaving (isLoading, popup, type) {
  const button = popup.querySelector('.popup__save');
  if(isLoading) {
    switch (type) {
      case 'save': 
        button.textContent = 'Сохранение...';
        break;
      case 'add':
        button.textContent = 'Сохранение...';
        break;
      case 'delete':
        button.textContent = 'Удаление...';
        break;
    }}
  else {
    switch (type) {
      case 'save': 
        button.textContent = 'Сохранить';
        break;
      case 'add':
        button.textContent = 'Создать';
        break;
      case 'delete':
        button.textContent = 'Да';
        break;
    }
  }
}



readMore.addEventListener('click', async () => {
    descriptionShort.classList.add('hide');
    descriptionLong.classList.remove('hide');
})

readLess.addEventListener('click', async () => {
  descriptionLong.classList.add('hide');
  descriptionShort.classList.remove('hide');
})

function enableValidation({formSelector, ...rest}) {
  // Найдём все формы с указанным классом в DOM,
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    const formElementClass = formElement.getAttribute('class');
    valid[formElementClass] = new formValidator(rest, formElement);
    valid[formElementClass].enableValidation();
    });
}

enableValidation({
  formSelector: ".feedback_form",
  inputSelector: ".input-wrapper_input",
  submitButtonSelector: ".form_submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "input-wrapper-error",
  errorClass: "input-error_active",
});

submitButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  // renderLoading (true, spinner);

  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', 'http://web.monovar.ru/api/send/email', true);
  // xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  // xhr.send(JSON.stringify({email: email.value, username: username.value, text: text.value}));
  // xhr.onload = function () {
  //   renderLoading (false, spinner);
  //       };
    valid['feedback_form'].reset();
});




  