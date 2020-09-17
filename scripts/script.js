const content = document.querySelector('.content');

const editButton = content.querySelector('.profile__edit-button');
const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__job');

const closeButton = content.querySelector('.popup__abort-button');

const popup = content.querySelector('.popup');
const saveForm = content.querySelector('.popup__form');
const popupName = content.querySelector('.popup__text_type_name');
const popupJob = content.querySelector('.popup__text_type_job');

const addButton = content.querySelector('.profile__add-button');

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


//5. Иной обработчик кнопки
function addEventListenerLike (lb) {
  lb.addEventListener('click', function(){
    lb.classList.toggle('element__like-button_active');
  });
}

//5. Иной обработчик кнопки
function addEventListenerImageOpen (image) {
  image.addEventListener('click', function() {
    switchPopupOpened('.popup-image','popup_opened');
    const imagePopupPhoto = document.querySelector('.popup-image__photo');
    const elementPhoto = image.firstElementChild;
    const imagePopupText = document.querySelector('.popup-image__annotation');
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
function switchPopupOpened(popupOf, selector) {
  document.querySelector(popupOf).classList.toggle(selector);
}
//---------------------------------------------//

//------добавление места-----------------------//
function addPlace() {
  let popupPlaceName = content.querySelector('.popup__text_type_name');
  let popupPlaceLink = content.querySelector('.popup__text_type_job');
  let readyElement;
  initialCards.push({name: popupPlaceName.value, link: popupPlaceLink.value});
  readyElement = createCard(initialCards[initialCards.length-1]);
  addCardInFlow(readyElement);

  switchPopupOpened('.popup-add','popup-add_opened');

  popupPlaceLink.value = null;
  popupPlaceName.value = null;
}
//---------------------------------------------//

//3. Функция, которая добавляет карточку в список
function addCardInFlow (card) {
  elements.prepend(card);
}

function initiateArrayCards() {
  initialCards.forEach(function (item) {
    addCardInFlow(createCard(item));
  });
}

function savePopupInfo () {
  if (popup.classList.contains('popup-edit')) {
    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
  } else if (popup.classList.contains('popup-add')) {
    addPlace();
  }
  switchPopupOpened('.popup','popup_opened');
  popup.classList = 'popup';
}

function initiatePopups() {
  //4. Функция самбита формы редактирования профиля + обработчик отправки формы
  editButton.addEventListener('click', function () {
    const textName = document.querySelector('.popup__text_type_name');
    const textLink = document.querySelector('.popup__text_type_job');
    popup.querySelector('.popup__form').classList.add('popup__form_submit-profile-info');
    popup.classList.add('popup-edit');
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;
    document.querySelector('.popup__title').textContent = 'Редактировать профиль';
    document.querySelector('.popup__save').textContent = 'Сохранить';
    textName.removeAttribute('required', true);
    textLink.removeAttribute('required', true);
    textLink.setAttribute('type', 'text');
    switchPopupOpened('.popup-edit','popup_opened');
  });

  saveForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    savePopupInfo(evt);
  });

  closeButton.addEventListener('click', function() {
    switchPopupOpened('.popup','popup_opened');
    popup.classList = 'popup';
  });

  //4. Функция самбита формы добавления карточки + обработчик отправки формы
  addButton.addEventListener('click', function() {
    const textName = document.querySelector('.popup__text_type_name');
    const textLink = document.querySelector('.popup__text_type_job');
    textName.value = '';
    textLink.value = '';
    popup.classList.add('popup-add');
    popup.querySelector('.popup__form').classList.add('popup__form_submit-new-card');
    document.querySelector('.popup__title').textContent = 'Новое место';
    document.querySelector('.popup__save').textContent = 'Создать';
    textName.setAttribute('required', true);
    textName.setAttribute('placeholder', 'Название');
    textLink.setAttribute('type', 'url');
    textLink.setAttribute('placeholder', 'Ссылка на картинку');
    textLink.setAttribute('required', true);

    switchPopupOpened('.popup-add','popup_opened');
  });
}

popupImageClose.addEventListener('click', function() {
  switchPopupOpened('.popup-image','popup_opened');
  popup.classList = 'popup';
});

//6. Метод, инициализирующий проект
function main() {
  initiatePopups();
  initiateArrayCards();
}

main();