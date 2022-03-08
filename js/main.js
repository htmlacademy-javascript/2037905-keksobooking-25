const ADVERTS_NUMBER = 10;
const arrayOfAdverts = [];
const HOUSES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'];

const CONVENIENCES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator'];

const ROOMSPHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


 const getRandomInt = (min, max) =>{
    if (min >= 0 && max > min) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
  };

  const getRandomFloat = (min, max, decimals = 2) =>{
    if(min >= 0 && max > min) {
      return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
    };
  };

const locationRange = {
  lat: {
    from: 35.65,
    to: 35.7,
  },
  lng: {
    from: 139.7,
    to: 139.8,
  },
  decimals: 5,
};



const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  };
};

const getRandomLengthArray = (array) => {
  const newArray = array.slice(getRandomInt(0, array.length - 1))
  shuffleArray(newArray)
  return newArray
};

const PRICE_NUM = {
  min: 0,
  max: 9999,
};

const ROOMS_NUM = {
  min: 0,
  max: 99,
};

const GUESTS_NUM = {
  min: 0,
  max: 10,
};

const PIC_NUM = {
  min: 1,
  max: 10,
};

let getImgNumber = function () {
  if (getRandomInt(PIC_NUM, PIC_NUM.max) < 10) {
    getImgNumber = '0' + getRandomInt();
    return getImgNumber;
  };
};

function createOffers() {
  const xLocation = getRandomFloat(locationRange.lat.from, locationRange.lat.to, locationRange.decimals);
  const yLocation = getRandomFloat(locationRange.lng.from, locationRange.lng.to, locationRange.decimals);

  return ({
    author: {
      avatar: `img/avatars/user-${getImgNumber()}.png`
    },

    offer: {
      title: 'Форма',
      address:`${xLocation}, ${yLocation}`,
      price: getRandomInt(PRICE_NUM.min, PRICE_NUM.max),
      type: getRandomArrayElement(HOUSES),
      rooms: getRandomInt(ROOMS_NUM.min, ROOMS_NUM.max),
      guests: getRandomInt(GUESTS_NUM.min, GUESTS_NUM.max),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getRandomLengthArray(CONVENIENCES),
      description: 'все окна выходят в подвал',
      photos: getRandomLengthArray(ROOMSPHOTOS),
    },

    location: {
      x: xLocation,
      y: yLocation,
    },
  });
};

for (let i = 0;  i < ADVERTS_NUMBER; i++) {
  arrayOfAdverts[i] = createOffers(i);
}
