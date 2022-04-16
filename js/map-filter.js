import {getCheckedInputValues} from './util.js';
const mapFilters = document.querySelector('.map__filters');

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
    return 10000 <= ads.offer.price && ads.offer.price <= 50000;
  } if (filterPrice.value === 'low') {
    return ads.offer.price <= 10000;
  } if (filterPrice.value === 'high') {
    return 50000 < ads.offer.price;
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

export {adsFilter, checkType, checkPrice, checkRooms, checkGuests, checkFeatures};