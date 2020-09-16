const content = document.querySelector('.content');
const editButton = content.querySelector('.profile__edit-button');
const closeButton = content.querySelector('.popup__abort-button');
const popup = content.querySelector('.popup');
const saveForm = content.querySelector('.popup__form');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');
const popupName = content.querySelector('.popup__text_type_name');
const popupJob = content.querySelector('.popup__text_type_job');

const popupAdd = content.querySelector('.popup-add');
const addButton = content.querySelector('.profile__add-button');
const closePopupAddButton = content.querySelector('.popup-add__abort-button');
const addForm = content.querySelector('.popup-add__form');

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const popupImage = document.querySelector('.popup-image');
const popupImageClose = document.querySelector('.popup-image__abort-button');

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


function addEventListenerLike (lb) {
  lb.addEventListener('click', function(){
    lb.classList.toggle('element__like-button_active');
  });
}

function addEventListenerImageOpen (image) {
  image.addEventListener('click', function() {
    switchPopupOpened('.popup-image','popup-image_opened');
    const imagePopupPhoto = document.querySelector('.popup-image__photo');
    const elementPhoto = image.firstElementChild;
    const imagePopupText = document.querySelector('.popup-image__annotation');
    imagePopupPhoto.src = elementPhoto.src;
    imagePopupText.textContent = image.parentElement.querySelector('.element__text').textContent;
  });
}

function addEventListenerDeleteCard (bin) {
  bin.addEventListener('click', function(){
    bin.parentElement.remove();
  });
}


// Функция инициализации карточек по умолчанию
function initiateDefaultPlaces(arrayOfCards) {
  arrayOfCards.forEach(function (item) {
    const element = elementTemplate.cloneNode(true);
    const likeButton = element.querySelector('.element__like-button');
    const popupButton = element.querySelector('.element__popupButton');
    const deleteElementButton = element.querySelector('.element__delete-button');
    const imageElement = element.querySelector('.element__image');
    const textElement = element.querySelector('.element__text');
    textElement.textContent = item.name;
    imageElement.src = item.link;
    imageElement.alt = 'Фотография ' + item.name;
    addEventListenerLike(likeButton);
    addEventListenerImageOpen(popupButton);
    addEventListenerDeleteCard(deleteElementButton);
    elements.append(element);
  })
}

//функция для открытия/закрытия всех попапов
function switchPopupOpened(popupOf, selector) {
  document.querySelector(popupOf).classList.toggle(selector);
}
//---------------------------------------------//

//------добавление места-----------------------//
function addPlace(evt) {
  const element = elementTemplate.cloneNode(true);
  const thisLikeButton = element.querySelector('.element__like-button');
  const thisPopupButton = element.querySelector('.element__popupButton');
  const thisDeleteElementButton = element.querySelector('.element__delete-button');
  const imageElement = element.querySelector('.element__image');
  const textElement = element.querySelector('.element__text');
  let popupPlaceName = content.querySelector('.popup-add__text_type_name');
  let popupPlaceLink = content.querySelector('.popup-add__text_type_link');

  evt.preventDefault();

  imageElement.src = popupPlaceLink.value;
  imageElement.alt = 'Фотография' + popupPlaceName.value;
  textElement.textContent = popupPlaceName.value;

  addEventListenerLike(thisLikeButton);
  addEventListenerImageOpen(thisPopupButton);
  addEventListenerDeleteCard(thisDeleteElementButton);

  elements.prepend(element);

  switchPopupOpened('.popup-add','popup-add_opened');

  popupPlaceLink.value = null;
  popupPlaceName.value = null;
}
//---------------------------------------------//


popupImageClose.addEventListener('click', function() {
  switchPopupOpened('.popup-image','popup-image_opened');
});

editButton.addEventListener('click', function (){
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  switchPopupOpened('.popup','popup_opened');
});
saveForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  switchPopupOpened('.popup','popup_opened');
});
closeButton.addEventListener('click', function() {
  switchPopupOpened('.popup','popup_opened');
});


addButton.addEventListener('click', function() {
  switchPopupOpened('.popup-add','popup-add_opened');
});
closePopupAddButton.addEventListener('click', function() {
  switchPopupOpened('.popup-add','popup-add_opened');
});
addForm.addEventListener('submit', addPlace);

initiateDefaultPlaces(initialCards);