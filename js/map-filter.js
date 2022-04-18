import {getCheckedInputValues} from './util.js';
const mapFilters = document.querySelector('.map__filters');
const  MIN_VALUE = 10000;
const MAX_VALUE = 50000;


const adsFilter = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const checkType = (ads)=>{
  const filterType = document.querySelector('#housing-type');
  if (filterType.value === 'any') {
    return true;
  }
  return ads.offer.type===filterType.value;

};
const checkPrice = (ads)=> {
  const filterPrice = document.querySelector('#housing-price');
  if (filterPrice.value === 'any') {
    return true;
  } if (filterPrice.value === 'middle') {
    return MIN_VALUE <= ads.offer.price && ads.offer.price <= MAX_VALUE;
  } if (filterPrice.value === 'low') {
    return ads.offer.price <= MIN_VALUE;
  } if (filterPrice.value === 'high') {
    return MAX_VALUE < ads.offer.price;
  }
};

const checkRooms = (ads) => {
  const filterRooms = document.querySelector('#housing-rooms');
  if (filterRooms.value === 'any') {
    return true;
  }
  return ads.offer.rooms === Number(filterRooms.value);

};

const checkGuests = (ads) => {
  const filterGuests = document.querySelector('#housing-guests');
  if (filterGuests.value === 'any') {
    return true;
  }
  return ads.offer.guests === Number(filterGuests.value);

};

const checkFeatures = (ads) => {
  const checkedInputValues = getCheckedInputValues('.map__checkbox:checked');
  let isSimilarAd = true;
  if ( checkedInputValues.length === '0') {
    return true;
  }
  if (!ads.offer.features) {
    return false;
  }

  checkedInputValues.forEach((feature) => {
    if ( !ads.offer.features.includes(feature) ) {
      isSimilarAd = false;
    }
  });


  return isSimilarAd;
};

export {adsFilter, checkType, checkPrice, checkRooms, checkGuests, checkFeatures, mapFilters};
