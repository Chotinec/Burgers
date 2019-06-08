const cancel = $('.form__btn-cancel');
const order = $('.form__btn-order');
const form = document.querySelector('.form');

const template = document.querySelector("#orderOverlay").innerHTML;

const URL = 'https://webdev-api.loftschool.com/sendmail';
const MAIL = 'test@gmail.com';

$(cancel).on('click', e => {
  e.preventDefault();
  $(".form")[0].reset();
});

$(order).on('click', e => {
  e.preventDefault();

  var response;
  let overlay = createOrderOverlay(template);

  if (validateForm(form)) {
    const xhr = new XMLHttpRequest();
    fd = new FormData(form);
    fd.append('to', MAIL);
    
    xhr.responseType = 'json';
    xhr.open('POST', URL);
    xhr.send(fd);

    xhr.addEventListener('load', () => {
      if (xhr.status >= 400) {
        response = "Mail was not sent!"
      } else {
        response = xhr.response.message;
      }
      overlay.open();
      overlay.setContent(response);
    });
  } else {
    response = "Form data is not valid!";
    overlay.open();
    overlay.setContent(response);
  }
});

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.street)) {
    valid = false;
  }
  if (!validateField(form.elements.house)) {
    valid = false;
  }
  if (!validateField(form.elements.flat)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  return field.checkValidity();
}