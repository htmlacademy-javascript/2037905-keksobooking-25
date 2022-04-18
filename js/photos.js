const FILE_TYPES = [
  'gif',
  'jpg',
  'jpeg',
  'png'
];

const loadAvatar = document.querySelector('#avatar');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const loadPhoto= document.querySelector('#images');
const previewPhoto = document.querySelector('.ad-form__photo');
const newPhotoElement = document.createElement('img');
const PHOTO_WIDTH = '200px';
const PHOTO_HEIGHT = '200px';


const uploadAvatar = () => {
  loadAvatar.addEventListener('change', () => {
    const file = loadAvatar.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      previewAvatar.src = URL.createObjectURL(file);
    }
  });
};


const uploadPhotos = () => {
  loadPhoto.addEventListener('change', () => {
    const file = loadPhoto.files[0];
    const fileName = file.name.toLowerCase();
    newPhotoElement.style.width = PHOTO_WIDTH;
    newPhotoElement.style.height = PHOTO_HEIGHT;
    previewPhoto.appendChild(newPhotoElement);
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      newPhotoElement.src = URL.createObjectURL(file);
    }
  });
};

uploadAvatar();

uploadPhotos();

export {uploadAvatar, uploadPhotos, newPhotoElement};
