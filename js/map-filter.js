import {getCheckedInputValues} from './util.js';
const mapFiltersElement = document.querySelector('.map__filters');
const  MIN_VALUE = 10000;
const MAX_VALUE = 50000;


const filterAds = (cb) => {
  mapFiltersElement.addEventListener('change', () => {
    cb();
  });
};

const checkType = (ads)=>{
  const filterTypeElement = document.querySelector('#housing-type');
  if (filterTypeElement.value === 'any') {
    return true;
  }
  return ads.offer.type===filterTypeElement.value;

};
const checkPrice = (ads)=> {
  const filterPriceElement = document.querySelector('#housing-price');
  if (filterPriceElement.value === 'any') {
    return true;
  } if (filterPriceElement.value === 'middle') {
    return MIN_VALUE <= ads.offer.price && ads.offer.price <= MAX_VALUE;
  } if (filterPriceElement.value === 'low') {
    return ads.offer.price <= MIN_VALUE;
  } if (filterPriceElement.value === 'high') {
    return MAX_VALUE < ads.offer.price;
  }
};

const checkRooms = (ads) => {
  const filterRoomsElement = document.querySelector('#housing-rooms');
  if (filterRoomsElement.value === 'any') {
    return true;
  }
  return ads.offer.rooms === Number(filterRoomsElement.value);

};

const checkGuests = (ads) => {
  const filterGuestsElement = document.querySelector('#housing-guests');
  if (filterGuestsElement.value === 'any') {
    return true;
  }
  return ads.offer.guests === Number(filterGuestsElement.value);

};

const checkFeatures = (ads) => {
  const checkedInputValuesElement = getCheckedInputValues('.map__checkbox:checked');
  let isSimilarAd = true;
  if ( checkedInputValuesElement.length === '0') {
    return true;
  }
  if (!ads.offer.features) {
    return false;
  }

  checkedInputValuesElement.forEach((feature) => {
    if ( !ads.offer.features.includes(feature) ) {
      isSimilarAd = false;
    }
  });


  return isSimilarAd;
};

export {filterAds, checkType, checkPrice, checkRooms, checkGuests, checkFeatures, mapFiltersElement};
