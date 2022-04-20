const formElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');

const getDisactiveState = () => {
  formElement.classList.add('ad-form--disabled');
  for (let i=0; i < formElement.children.length; i++) {
    formElement.children[i].disabled = true;
  }
  mapFiltersElement.classList.add('ad-form--disabled');
  for (let i=0; i < mapFiltersElement.children.length; i++) {
    mapFiltersElement.children[i].disabled = true;
  }
};

const getActiveState = () => {
  formElement.classList.remove('ad-form--disabled');
  for (let i=0; i < formElement.children.length; i++) {
    formElement.children[i].disabled = false;
  }
  mapFiltersElement.classList.remove('ad-form--disabled');
  for (let i=0; i < mapFiltersElement.children.length; i++) {
    mapFiltersElement.children[i].disabled = false;
  }
};

export{getDisactiveState, getActiveState};
