const houses = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkins = ['12:00','13:00','14:00'];
const checkouts = ['12:00','13:00','14:00'];
const conveniences = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator'];
const roomsphotos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];




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

let getAvatar = function () {
if (getRandomInt(PIC_NUM, PIC_NUM.max) < 10) {
  getAvatar = '0' + getRandomInt();
  return getAvatar;
};
};
  let author = {
    avatar: 'img/avatars/user{getAvatar}.png',
  };

const xLocation = getRandomFloat(locationRange.lat.from, locationRange.lat.to, locationRange.decimals);
const yLocation = getRandomFloat(locationRange.lng.from, locationRange.lng.to, locationRange.decimals);


  let offer = {
title: 'Форма',
address:`${xLocation}, ${yLocation}`,
price: getRandomInt(PRICE_NUM.min, PRICE_NUM.max),
type: getRandomArrayElement(houses),
rooms: getRandomInt(ROOMS_NUM.min, ROOMS_NUM.max),
guests: getRandomInt(GUESTS_NUM.min, GUESTS_NUM.max),
checkin: getRandomArrayElement(checkins),
checkout: getRandomArrayElement(checkouts),
features: getRandomLengthArray(conveniences),
description: 'все окна выходят в подвал',
photos: getRandomLengthArray(roomsphotos),
location: {
  x: xLocation,
  y: yLocation,
},
 };
