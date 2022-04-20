
import {createAd} from './markup-generation.js';
import {getDisactiveState, getActiveState} from './map-form.js';
import {filterAds, checkType, checkPrice, checkRooms, checkGuests, checkFeatures, mapFiltersElement} from './map-filter.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {newPhotoElement} from './photos.js';

const CENTER_TOKIO_LAT = 35.681729;
const CENTER_TOKIO_LNG = 139.753927;
const MAP_ZOOM = 13;
const COOR_DECIMALS = 5;
const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;
const sizes = [52, 52];
const anchors = [26, 52];
const formats = [40, 40];
const ankers = [20, 40];

const adFormElement = document.querySelector('.ad-form');
const addressFieldElement = adFormElement.querySelector('[name="address"]');
const resetButtonElement = document.querySelector('.ad-form__reset');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const AVATAR_DEFAULT_SRC = 'img/muffin-grey.svg';

const setAddressFieldValue = (address) => {
  addressFieldElement.value = `${address.lat.toFixed(COOR_DECIMALS)}, ${address.lng.toFixed(COOR_DECIMALS)}`;
};

addressFieldElement.value = `${CENTER_TOKIO_LAT.toFixed(COOR_DECIMALS)}, ${CENTER_TOKIO_LNG.toFixed(COOR_DECIMALS)}`;

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
  iconSize: sizes,
  iconAnchor: anchors,
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
  iconSize: formats,
  iconAnchor: ankers,
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
  avatarPreviewElement.src = AVATAR_DEFAULT_SRC;
  mapFiltersElement.reset();
  adFormElement.reset();
  addressFieldElement.value = `${CENTER_TOKIO_LAT.toFixed(COOR_DECIMALS)}, ${CENTER_TOKIO_LNG.toFixed(COOR_DECIMALS)}`;
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
    filterAds(debounce(() => renderSimilarAds(data, SIMILAR_AD_COUNT),RERENDER_DELAY));
  });

};

resetButtonElement.addEventListener('click',(evt)=>{
  evt.preventDefault();
  resetForm();
});

adFormElement.addEventListener('submit',()=>{
  newPhotoElement.remove();
  avatarPreviewElement.src = AVATAR_DEFAULT_SRC;
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

export {map, createOfferMarker, CENTER_TOKIO_LAT, CENTER_TOKIO_LNG, renderSimilarAds, resetForm};
