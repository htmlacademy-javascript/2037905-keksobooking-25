
import {createAd} from './markup-generation.js';
import {getActiveState, getDisactiveState} from './map-form.js';
import './form.js';
import './map.js';
import './api.js';

createAd();

getDisactiveState();
setTimeout(getActiveState, 2000);
