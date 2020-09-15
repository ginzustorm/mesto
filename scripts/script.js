let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let closeButton = content.querySelector('.popup__abort-button');
let popup = content.querySelector('.popup');
let saveForm = content.querySelector('.popup__form');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__job');
let popupName = content.querySelector('.popup__text_type_name');
let popupJob = content.querySelector('.popup__text_type_job');

let popupAdd = content.querySelector('.popup-add');
let addButton = content.querySelector('.profile__add-button');
let closePopupAddButton = content.querySelector('.popup-add__abort-button');
let addForm = content.querySelector('.popup-add__form');

const initialCards = [
  {
    name: 'О-в Рейнеке',
    link: 'https://vestiprim.ru/uploads/posts/2018-08/thumbs/1534983918_maxresdefault.jpg'
  },
  {
    name: 'Золотой мост',
    link: 'https://vladnews.ru/uploads/news/2012/09/05/thumb_39675_news_xxxl.jpg'
  },
  {
    name: 'Штормовой п-ов',
    link: 'https://media-cdn.tripadvisor.com/media/photo-s/05/2d/e2/65/caption.jpg'
  },
  {
    name: 'Бухта Витязь',
    link: 'https://media-cdn.tripadvisor.com/media/photo-s/12/f5/e4/d8/caption.jpg'
  },
  {
    name: 'Гора Пидан',
    link: 'https://photos.wikimapia.org/p/00/01/99/12/78_big.jpg'
  },
  {
    name: 'Кравцовские водопады',
    link: 'https://vestiprim.ru/uploads/posts/2017-09/thumbs/1506649755_big163428big1286329._rsrrsrrsrrer_rrrrrrrs_rrrsr_rrsr_r_srrrrsr.jpg'
  }
];

initialCards.forEach(function (item) {
  const elementTemplate = document.querySelector('#element').content;
  const elements = document.querySelector('.elements');
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__text').textContent = item.name;
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__image').alt = 'Фотография ' + item.name;
  elements.append(element);
});

let likeButton = document.querySelectorAll('.element__like-button'); 
likeButton.forEach(function(item) {
  item.addEventListener('click', function(){
    if (!item.classList.contains('.element__like-button_active')) {
      item.firstElementChild.src = "images/like-black.svg";
      item.classList.add('.element__like-button_active')
    } else if (item.classList.contains('.element__like-button_active')) {
      item.firstElementChild.src = "images/like.svg";
      item.classList.remove('.element__like-button_active');
    } 
  });
});

let popupButton = document.querySelectorAll('.element__popupButton');
popupButton.forEach(function(item) {
  item.addEventListener('click', function() {
    openImagePopup();
    let imagePopupPhoto = document.querySelector('.popup-image__photo');
    let elementPhoto = item.firstElementChild;
    let imagePopupText = document.querySelector('.popup-image__annotation');
    imagePopupPhoto.src = elementPhoto.src;
    imagePopupText.textContent = item.parentElement.querySelector('.element__text').textContent;
  });
});

let deleteElementButton = document.querySelectorAll('.element__delete-button');
deleteElementButton.forEach(function(item) {
  item.addEventListener('click', function(){
    item.parentElement.remove();
  });
});


//--------------редактирование профиля---------//
function editInformation() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function saveInformation(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();
}
//---------------------------------------------//

//------добавление места-----------------------//
function openPopupAdd() {
  popupAdd.classList.add('popup-add_opened');
}

function closePopupAdd() {
  popupAdd.classList.remove('popup-add_opened');
}

function addPlace(evt) {
  evt.preventDefault();
  const elementTemplate = document.querySelector('#element').content;
  const elements = document.querySelector('.elements');
  const element = elementTemplate.cloneNode(true);
  let popupPlaceName = content.querySelector('.popup-add__text_type_name');
  let popupPlaceLink = content.querySelector('.popup-add__text_type_link');

  if ((popupPlaceName.value === "") || (popupPlaceLink.value === "")) {
    closePopupAdd();
    return;
  }

  element.querySelector('.element__image').src = popupPlaceLink.value;
  element.querySelector('.element__image').alt = 'Фотография' + popupPlaceName.value;
  element.querySelector('.element__text').textContent = popupPlaceName.value;

  let thisLikeButton = element.querySelector('.element__like-button'); 
  thisLikeButton.addEventListener('click', function(){
    if (!thisLikeButton.classList.contains('.element__like-button_active')) {
      thisLikeButton.firstElementChild.src = "images/like-black.svg";
      thisLikeButton.classList.add('.element__like-button_active')
    } else if (thisLikeButton.classList.contains('.element__like-button_active')) {
      thisLikeButton.firstElementChild.src = "images/like.svg";
      thisLikeButton.classList.remove('.element__like-button_active');
    } 
  });

  let thisPopupButton = element.querySelector('.element__popupButton');
  thisPopupButton.addEventListener('click', function() {
    openImagePopup();
    let imagePopupPhoto = document.querySelector('.popup-image__photo');
    let elementPhoto = thisPopupButton.firstElementChild;
    let imagePopupText = document.querySelector('.popup-image__annotation');
    imagePopupPhoto.src = elementPhoto.src;
    imagePopupText.textContent = thisPopupButton.parentElement.querySelector('.element__text').textContent;
  });

  let thisDeleteElementButton = element.querySelector('.element__delete-button');
  thisDeleteElementButton.addEventListener('click', function(){
    thisDeleteElementButton.parentElement.remove();
  });


  elements.prepend(element);
  closePopupAdd();
  popupPlaceLink.value = null;
  popupPlaceName.value = null;
}
//---------------------------------------------//

//---------открытие попапа с фото--------------//

let popupImage = document.querySelector('.popup-image');
let popupImageClose = document.querySelector('.popup-image__abort-button');
function openImagePopup() {
  popupImage.classList.add('popup-image_opened');
}

function closeImagePopup() {
  popupImage.classList.remove('popup-image_opened');
}

popupImageClose.addEventListener('click', closeImagePopup);

//---------------------------------------------//

editButton.addEventListener('click', editInformation);
closeButton.addEventListener('click', closePopup);
saveForm.addEventListener('submit', saveInformation);

addButton.addEventListener('click', openPopupAdd);
closePopupAddButton.addEventListener('click', closePopupAdd);
addForm.addEventListener('submit', addPlace);