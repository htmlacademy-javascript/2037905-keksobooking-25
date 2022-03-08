
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

export {getRandomInt, getRandomFloat, getRandomLengthArray, getRandomArrayElement};