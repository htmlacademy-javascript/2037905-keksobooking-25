const getData = (onFail, onSuccess) => {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onFail('Произошла ошибка загрузки данных, перезагрузите страницу');
    })
    .then((ads) => {
      onSuccess(ads);
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
      }
      throw new Error();
    })
    .catch(()=>{
      onFail();
    });
};


export {sendData, getData};
