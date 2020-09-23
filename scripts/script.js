const content = document.querySelector('.content');

const editButton = content.querySelector('.profile__edit-button');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const closeButton = content.querySelector('.popup__abort-button_type_profile-edit');
const closeButtonAdd = content.querySelector('.popup__abort-button_type_place-add');
const closeButtonImage = content.querySelector('.popup__abort-button_type_image-show');

const popup = content.querySelector('.popup');
const saveProfileInfo = content.querySelector('.popup__form_type_profile');
const savePlaceInfo = content.querySelector('.popup__form_type_place');
const popupName = content.querySelector('.popup__text_type_name');
const popupJob = content.querySelector('.popup__text_type_job');

const addButton = content.querySelector('.profile__add-button');

const elementTemplate = document.querySelector('#element').content;
const elements = document.querySelector('.elements');

const popupAdd = content.querySelector('.popup_type_place-add');
const popupImage = content.querySelector('.popup_type_image-show');

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

//5. Иной обработчик кнопки
function addEventListenerLike (lb) {
  lb.addEventListener('click', function(){
    lb.classList.toggle('element__like-button_active');
  });
}

//5. Иной обработчик кнопки
function addEventListenerImageOpen (image) {
  image.addEventListener('click', function() {
    switchPopupOpened(popupImage);
    const imagePopupPhoto = document.querySelector('.popup__image-photo');
    const elementPhoto = image.firstElementChild;
    const imagePopupText = document.querySelector('.popup__image-annotation');
    imagePopupPhoto.src = elementPhoto.src;
    imagePopupText.textContent = image.parentElement.querySelector('.element__text').textContent;
  });
}

//5. Иной обработчик кнопки
function addEventListenerDeleteCard (bin) {
  bin.addEventListener('click', function(){
    bin.parentElement.remove();
  });
}

//1. Функция, которая на вход принимает объёкт data, содержащий link и name картинки, а также обработчики событий(лайк, удаление, показ превью). Возвращает готовую карточку.
function createCard (cardInfo) {
  const element = elementTemplate.cloneNode(true);
  const likeButton = element.querySelector('.element__like-button');
  const popupButton = element.querySelector('.element__popupButton');
  const deleteElementButton = element.querySelector('.element__delete-button');
  const imageElement = element.querySelector('.element__image');
  const textElement = element.querySelector('.element__text');
  textElement.textContent = cardInfo.name;
  imageElement.src = cardInfo.link;
  imageElement.alt = 'Фотография ' + cardInfo.name;
  addEventListenerLike(likeButton);
  addEventListenerImageOpen(popupButton);
  addEventListenerDeleteCard(deleteElementButton);
  return element;
}

//2. Функция для открытия и закрытия всех попапов
function switchPopupOpened(popupType) {
  popupType.classList.toggle('popup_opened');
}
//---------------------------------------------//

//------добавление места-----------------------//
function addPlace() {
  const popupPlaceName = content.querySelector('.popup__text_type_place-name');
  const popupPlaceLink = content.querySelector('.popup__text_type_link');
  addPlaceOnPage(createCard({name: popupPlaceName.value, link: popupPlaceLink.value}));
  popupPlaceLink.value = null;
  popupPlaceName.value = null;
  switchPopupOpened(popupAdd);
}

//Данный функционал, а именно elements.prepend и функционал на 105 строке дублируется, вынесите данную реализацию в отдельную функцию и используйте там где необходимо. 
function addPlaceOnPage(card) {
  elements.prepend(card);
}

function initiateArrayCards() {
  initialCards.forEach(function (item) {
    addPlaceOnPage(createCard(item));
  });
}

function submitPlaceInfo() {
  addPlace();
}

function submitProfileInfo() {
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  switchPopupOpened(popup);
};

  //4. Функция сабмита формы редактирования профиля + обработчик отправки формы
  editButton.addEventListener('click', function () {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    switchPopupOpened(popup);
  });

  saveProfileInfo.addEventListener('submit', function(evt) {
    evt.preventDefault();
    submitProfileInfo();
  });
  
  savePlaceInfo.addEventListener('submit', function (evt) {
    evt.preventDefault();
    submitPlaceInfo();
  });

  closeButton.addEventListener('click', function() {
    switchPopupOpened(popup);
  });

  closeButtonAdd.addEventListener('click', function() {
    switchPopupOpened(popupAdd);
  });

  closeButtonImage.addEventListener('click', function() {
    switchPopupOpened(popupImage);
  })

  //4. Функция самбита формы добавления карточки + обработчик отправки формы
  addButton.addEventListener('click', function() {
    switchPopupOpened(popupAdd);
  });

  initiateArrayCards();