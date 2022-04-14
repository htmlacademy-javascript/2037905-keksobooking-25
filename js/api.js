const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail('Произошла ошибка загрузки данных, перезагрузите страницу');
      }})
    .then((data) => {
      data.forEach((point)=>{
        onSuccess(point);
      });
    })
    .catch(()=>{
      onFail('Произошла ошибка загрузки данных, перезагрузите страницу');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response)=>{
      if (response.ok)
      {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(()=>{
      onFail();
    });
};


export {sendData, getData};
