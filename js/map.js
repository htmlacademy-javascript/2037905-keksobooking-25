
import {createAd} from './markup-generation.js';
import {getDisactiveState, getActiveState} from './map-form.js';
import {checkType, checkPrice, checkRooms, checkGuests, checkFeatures, mapFilters} from './map-filter.js';
import { getData } from './api.js';
import {showAlert, debounce} from './util.js';
import {adsFilter} from './map-filter.js';
import { newPhotoElement } from './photos.js';

const CENTER_TOKIO_LAT = 35.681729;
const CENTER_TOKIO_LNG = 139.753927;
const MAP_ZOOM = 13;
const MAIN_PIN_ICON_SIZE = [52, 52];
const MAIN_PIN_ICON_ANCHOR = [26, 52];
const PIN_ICON_SIZE = [40, 40];
const PIN_ICON_ANCHOR = [20, 40];
const COOR_DECIMALS = 5;
const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;


const adForm = document.querySelector('.ad-form');
const addressField = adForm.querySelector('[name="address"]');
const resetButton = document.querySelector('.ad-form__reset');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';

const setAddressFieldValue = (address) => {
  addressField.value = `${address.lat.toFixed(COOR_DECIMALS)}, ${address.lng.toFixed(COOR_DECIMALS)}`;
};

addressField.value = `${CENTER_TOKIO_LAT.toFixed(COOR_DECIMALS)}, ${CENTER_TOKIO_LNG.toFixed(COOR_DECIMALS)}`;

getDisactiveState ();

const map = L.map('map-canvas')
  .on('load', () => {
    getActiveState();
  })
  .setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, MAP_ZOOM);


const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
});

const mainPinMarker = L.marker(
  {
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


const offerPinIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: PIN_ICON_SIZE,
  iconAnchor: PIN_ICON_ANCHOR,
});

const markerGroup = L.layerGroup().addTo(map);

const createOfferMarker = (point) => {
  const lat = point.location.lat;
  const lng = point.location.lng;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon: offerPinIcon,
    },
  );
  marker.addTo(markerGroup)
    .bindPopup(
      createAd(point)
    );
};

const renderSimilarAds = (ads, adCount) => {
  markerGroup.clearLayers();
  ads
    .slice()
    .filter((it) => checkType(it) && checkPrice(it) && checkRooms(it) && checkGuests(it) && checkFeatures(it))
    .slice(0, adCount)
    .forEach((advertise) => {
      createOfferMarker(advertise);
    });
};


const resetForm = () => {
  newPhotoElement.remove();
  avatarPreview.src = AVATAR_DEFAULT_SRC;
  mapFilters.reset();
  adForm.reset();
  addressField.value = `${CENTER_TOKIO_LAT.toFixed(COOR_DECIMALS)}, ${CENTER_TOKIO_LNG.toFixed(COOR_DECIMALS)}`;
  mainPinMarker.setLatLng({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  });
  map.setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, MAP_ZOOM);
  map.closePopup();
  getData(showAlert, (data) => {
    renderSimilarAds(data, SIMILAR_AD_COUNT);
    adsFilter(debounce(() => renderSimilarAds(data, SIMILAR_AD_COUNT),RERENDER_DELAY));
  });

};

resetButton.addEventListener('click',(evt)=>{
  evt.preventDefault();
  resetForm();
});

adForm.addEventListener('sumbit',()=>{
  newPhotoElement.remove();
  avatarPreview.src = AVATAR_DEFAULT_SRC;
  mainPinMarker.setLatLng({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  });
  map.setView({
    lat: CENTER_TOKIO_LAT,
    lng: CENTER_TOKIO_LNG,
  }, MAP_ZOOM);

});


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


mainPinMarker.addTo(map);


mainPinMarker.on('moveend', (evt) => {
  setAddressFieldValue(evt.target.getLatLng());
});

export {map, createOfferMarker, CENTER_TOKIO_LAT, CENTER_TOKIO_LNG, renderSimilarAds};
