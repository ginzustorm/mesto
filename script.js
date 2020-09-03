let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let abortButton = content.querySelector('.popup__abort-button');
let popup = content.querySelector('.popup');
let saveButton = content.querySelector('.popup__save');

function editInformation() {
  let profileName = content.querySelector('.profile__name');
  let profileJob = content.querySelector('.profile__job');

  let popupName = content.querySelector('.popup__name');
  let popupJob = content.querySelector('.popup__job');

  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', editInformation);

function abortInformation() {
  let popupName = content.querySelector('.popup__name');
  let popupJob = content.querySelector('.popup__job');
  popupName.textContent = "";
  popupJob.textContent = "";
  popup.classList.remove('popup_opened');
}

abortButton.addEventListener('click', abortInformation);

function saveInformation(evt) {
  evt.preventDefault();
  let profileName = content.querySelector('.profile__name');
  let profileJob = content.querySelector('.profile__job');
  let popupName = content.querySelector('.popup__name');
  let popupJob = content.querySelector('.popup__job');
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  popup.classList.remove('popup_opened');
}

saveButton.addEventListener('submit', saveInformation);
saveButton.addEventListener('click', saveInformation);


