const cardElement = document.querySelector('#card').content.querySelector('.popup');

const typesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
const createAd = (card) => {
  const adElement = cardElement.cloneNode(true);
  const photoElement = adElement.querySelector('.popup__photos');
  if (card.offer.title) {
    adElement.querySelector('.popup__title').textContent = card.offer.title;
  } else {
    adElement.querySelector('.popup__title').classList.add('hidden');
  }

  if (card.offer.address) {
    adElement.querySelector('.popup__text--address').textContent = card.offer.address;
  } else {
    adElement.querySelector('.popup__text--address').classList.add('hidden');
  }
  if (card.offer.price) {
    adElement.querySelector('.popup__text--price').textContent = `${card.offer.price  }₽/ночь`;
  } else {
    adElement.querySelector('.popup__text--price').classList.add('hidden');
  }

  if (card.offer.rooms && card.offer.guests) {
    adElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests  } гостей`;
  } else {
    adElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }

  if (card.offer.checkin && card.offer.checkout) {
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${  card.offer.checkin  }, выезд до${card.offer.checkout}`;
  } else {
    adElement.querySelector('.popup__text--time').classList.add('hidden');
  }

  if (card.offer.description) {
    adElement.querySelector('.popup__description').textContent = card.offer.description;
  } else {
    adElement.querySelector('.popup__description').classList.add('hidden');
  }

  if (card.author.avatar) {
    adElement.querySelector('.popup__avatar').src = card.author.avatar;
  } else {
    adElement.querySelector('.popup__avatar').classList.add('hidden');
  }

  if (card.offer.type) {
    adElement.querySelector('.popup__type').textContent = typesDictionary[card.offer.type];
  } else {
    adElement.querySelector('.popup__type').classList.add('hidden');
  }

  if (card.offer.features) {
    adElement.querySelectorAll('.popup__feature').forEach((featureListItem) =>  {
      const isNecessary = card.offer.features.some(
        (feature) => featureListItem.classList.contains(`popup__feature--${feature}`)
      );
      if(!isNecessary){
        featureListItem.remove();
      }
    });
  } else {
    adElement.querySelector('.popup__feature').classList.add('hidden');
  }

  if (card.offer.photos) {
    card.offer.photos.forEach((url)=>{
      const photoListItem = photoElement.querySelector('.popup__photo').cloneNode(true);
      photoListItem.src = url;
      photoElement.appendChild(photoListItem);
    });
    photoElement.querySelectorAll('.popup__photo')[0].remove();
  } else {
    adElement.querySelector('.popup__photos').classList.add('hidden');
  }
  return adElement;
};


export {createAd};
