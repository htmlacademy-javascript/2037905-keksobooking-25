import {isEscEvent} from './util.js';
import {CENTER_TOKIO_LAT, CENTER_TOKIO_LNG} from './map.js';
import {sendData} from './api.js';


const adTitleElement = document.querySelector('.ad-form');
const roomsFieldElement = adTitleElement.querySelector('[name="rooms"]');
const capacityFieldElement = adTitleElement.querySelector('[name="capacity"]');
const typeFieldElement = adTitleElement.querySelector('[name="type"]');
const priceFieldElement = adTitleElement.querySelector('#price');
const timeInFieldElement = adTitleElement.querySelector('[name="timein"]');
const timeOutFieldElement = adTitleElement.querySelector('[name="timeout"]');
const successTemplate = document.querySelector ('#success').content.querySelector('.success');
const successMessage = successTemplate.cloneNode(true);
const errorTemplateElement = document.querySelector ('#error');
const errorTemplateContent = errorTemplateElement.content.querySelector('.error');
const errorMessageElement = errorTemplateContent.cloneNode(true);
const errorButtonElement = errorTemplateContent.querySelector('.error__button');
const submitButtonElement = document.querySelector('.ad-form__submit');
const addressElement = document.querySelector('#address');

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const MAX_ROOMS = 100;
const MIN_SYMBOLS = 30;
const MAX_SYMBOLS = 100;

const pristine = new Pristine(adTitleElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error-text',
});

const validateNickname = (value) => value.length >= MIN_SYMBOLS && value.length <= MAX_SYMBOLS;

pristine.addValidator(
  adTitleElement.querySelector('#title'),
  validateNickname,
  `От ${  MIN_SYMBOLS  } до ${  MAX_SYMBOLS  } символов`
);


const getCapacityErrorMessage = (value) => {
  const rooms = Number(value);
  if (rooms === MAX_ROOMS) {
    return 'Выберите "не для гостей"';
  }

  return `не больше ${roomsFieldElement.value} гостя`;
};

const validateCapacity = () => {
  const capacity = Number(capacityFieldElement.value);
  const rooms = Number(roomsFieldElement.value);
  return (
    (rooms >= capacity && rooms < MAX_ROOMS && capacity !== 0) ||
    (rooms === MAX_ROOMS && capacity === 0)
  );
};

pristine.addValidator(
  roomsFieldElement,
  validateCapacity,
  getCapacityErrorMessage,
  1,
  true
);
pristine.addValidator(
  capacityFieldElement,
  validateCapacity,
  'Количество гостей должно соответствовать количеству комнат',
  1,
  true
);

adTitleElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

const validatePrice = () =>
  priceFieldElement.value ? !(priceFieldElement.value < minPrice[typeFieldElement.value]) : true;

const getPriceErrorMessage = () => `Минимальная цена за ночь ${minPrice[typeFieldElement.value]}`;

pristine.addValidator(typeFieldElement, validatePrice, getPriceErrorMessage, 1, true);
typeFieldElement.addEventListener('change', () => {
  priceFieldElement.min = minPrice[typeFieldElement.value];
  priceFieldElement.placeholder = `От ${minPrice[typeFieldElement.value]} ₽/ночь`;
});

timeInFieldElement.addEventListener('change', () => {
  timeOutFieldElement.value = timeInFieldElement.value;
});
timeOutFieldElement.addEventListener('change', () => {
  timeInFieldElement.value = timeOutFieldElement.value;
});


const onSuccess=()=>{
  adTitleElement.reset();
  addressElement.value = `${CENTER_TOKIO_LAT  } ,${ CENTER_TOKIO_LNG}`;
  submitButtonElement.removeAttribute('disabled', 'disabled');
  document.body.append(successMessage);
  window.addEventListener('keydown', onKeyDownSuccessMessage);
  document.addEventListener('click', onClickSuccessMessage);
};


const onFail =()=>{
  document.body.append(errorMessageElement);
  submitButtonElement.removeAttribute('disabled', 'disabled');
  window.addEventListener('keydown', onKeyDownErrorMessage);
  document.addEventListener('click', onClickErrorMessage);
  errorButtonElement.addEventListener('click', onClickErrorButton);
};

adTitleElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    const formData = new FormData(evt.target);
    submitButtonElement.setAttribute('disabled', 'disabled');
    sendData (onSuccess, onFail, formData);
  }
});

function closeSuccessMessage () {
  successMessage.remove();
  window.removeEventListener('keydown', onKeyDownSuccessMessage);
  document.removeEventListener('click', onClickSuccessMessage);
}

function onClickSuccessMessage () {
  closeSuccessMessage();
}

function onKeyDownSuccessMessage (evt) {
  if (isEscEvent(evt)) {
    closeSuccessMessage();
  }
}


function closeErrorMessage () {
  errorMessageElement.remove();
  window.removeEventListener('keydown', onKeyDownErrorMessage);
  document.removeEventListener('click', onClickErrorMessage);
  document.addEventListener('click', onClickSuccessMessage);
}
function onClickErrorMessage  () {
  closeErrorMessage();
}

function onKeyDownErrorMessage (evt) {
  if (isEscEvent(evt)) {
    closeErrorMessage();
  }
}

function onClickErrorButton () {
  closeErrorMessage();
}

export {minPrice};
