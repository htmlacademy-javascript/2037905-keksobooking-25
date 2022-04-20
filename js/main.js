import {renderSimilarAds} from './map.js';
import {getData} from './api.js';
import {filterAds} from './map-filter.js';
import {showAlert, debounce} from './util.js';
import './photos.js';
import './form.js';

const SIMILAR_AD_COUNT = 10;
const RERENDER_DELAY = 500;

getData(showAlert, (data) => {
  renderSimilarAds(data, SIMILAR_AD_COUNT);
  filterAds(debounce(() => renderSimilarAds(data, SIMILAR_AD_COUNT),RERENDER_DELAY));
});


