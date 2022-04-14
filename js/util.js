const ALERT_SHOW_TIME = 5000;

const getRandomInt = (min, max) =>{
  if (min >= 0 && max > min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomFloat = (min, max, decimals = 2) =>{
  if(min >= 0 && max > min) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  }
};

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const getRandomLengthArray = (array) => {
  const newArray = array.slice(getRandomInt(0, array.length - 1));
  shuffleArray(newArray);
  return newArray;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '5px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {getRandomInt, getRandomFloat, getRandomLengthArray, getRandomArrayElement, isEscEvent, showAlert};
