let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let closeButton = content.querySelector('.popup__abort-button');
let popup = content.querySelector('.popup');
let saveForm = content.querySelector('.popup__form');
let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__job');
let popupName = content.querySelector('.popup__text_type_name');
let popupJob = content.querySelector('.popup__text_type_job');

function editInformation() {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', editInformation);

function closePopup() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function saveInformation(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup();
}

saveForm.addEventListener('submit', saveInformation);


