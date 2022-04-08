const adFormTitle = document.querySelector('.ad-form');

const MAX_ROOMS = 100;
//вынес в константы
const MIN_SYMBOLS = 30;
const MAX_SYMBOLS = 100;

const pristine = new Pristine(adFormTitle, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorClass: 'ad-form--invalid',
  successClass: 'ad-form--valid',
  errorTextTag: 'p',
  errorTextClass: 'ad-form__error-text',
});

pristine.addValidator(
  adFormTitle.querySelector('#title'),
  validateNickname,
  `От ${  MIN_SYMBOLS  } до ${  MAX_SYMBOLS  } символов`
);
function validateNickname(value) {
  return value.length >= MIN_SYMBOLS && value.length <= MAX_SYMBOLS;
}

const roomsField = adFormTitle.querySelector('[name="rooms"]');
const capacityField = adFormTitle.querySelector('[name="capacity"]');


function getCapacityErrorMessage(value) {
  const rooms = Number(value);
  if (rooms === MAX_ROOMS) {
    return 'Выберите "не для гостей"';
  }

  return `не больше ${roomsField.value} гостя`;
}
function validateCapacity() {
  const capacity = Number(capacityField.value);
  const rooms = Number(roomsField.value);
  return (
    (rooms >= capacity && rooms < MAX_ROOMS && capacity !== 0) ||
    (rooms === MAX_ROOMS && capacity === 0)
  );
}

pristine.addValidator(
  roomsField,
  validateCapacity,
  getCapacityErrorMessage,
  1,
  true
);
pristine.addValidator(
  capacityField,
  validateCapacity,
  'Количество гостей должно соответствовать количеству комнат',
  1,
  true
);

adFormTitle.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

const typeField = adFormTitle.querySelector('[name="type"]');
const priceField = adFormTitle.querySelector('#price');
const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const validatePrice = () =>
  priceField.value ? !(priceField.value < minPrice[typeField.value]) : true;

function getPriceErrorMessage() {
  return `Минимальная цена за ночь ${minPrice[typeField.value]} `;
}

pristine.addValidator(typeField, validatePrice, getPriceErrorMessage, 1, true);
typeField.addEventListener('change', () => {
  priceField.min = minPrice[typeField.value];
  priceField.placeholder = `От ${minPrice[typeField.value]} ₽/ночь`;
});

const timeInField = adFormTitle.querySelector('[name="timein"]');
const timeOutField = adFormTitle.querySelector('[name="timeout"]');

timeInField.addEventListener('change', () => {
  timeOutField.value = timeInField.value;
});
timeOutField.addEventListener('change', () => {
  timeInField.value = timeOutField.value;
});
