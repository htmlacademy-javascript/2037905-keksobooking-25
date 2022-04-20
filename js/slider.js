const MAX_PRICE = 100000;
const MIN_PRICE = 0;
const SLIDER_STEP = 1;
const SLIDER_START = 5000;

const minPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adFormElement = document.querySelector('.ad-form');
const priceSliderElement = adFormElement.querySelector('.ad-form__slider');
const priceElement = adFormElement.querySelector('#price');
const typeElement = adFormElement.querySelector('#type');

noUiSlider.create(priceSliderElement, {
  range: {
    min: MIN_PRICE,
    max: MAX_PRICE,
  },
  start: SLIDER_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

priceSliderElement.noUiSlider.on('update', () => {
  priceElement.value = priceSliderElement.noUiSlider.get();
});

priceElement.addEventListener('input', () => priceSliderElement.noUiSlider.set(priceElement.value));
typeElement.addEventListener('change', () => {
  priceSliderElement.noUiSlider.updateOptions({
    start: minPrice[typeElement.value],
  });
});
