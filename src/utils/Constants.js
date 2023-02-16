export {
  initialCards,
  object,
  profilePopup,
  profileForm,
  popupAddImage,
  popupCreateCard,
  popupCreateTitle,
  popupCreateLinkCard,
  popupName,
  popupActivities,
  popupOpenAddImage,
  popupOpenButtonElement,
  popupOpenElement,
  cardTemplate,
  popupImageOpen,
  popupNameOpen,
  cardList,
  popupConfirm,
  profileAvatarImg,
  popupAvatarForm,
};
const popupConfirm = document.querySelector('.popup-confirm');
const profilePopup = document.querySelector('.profile-popup');
const profileForm = profilePopup.querySelector('.popup__form_edit-form');
const popupAddImage = document.querySelector('.popup_add-image');
const popupCreateCard = document.querySelector('.popup__form_create-card');
const popupCreateTitle = popupAddImage.querySelector('.popup__input_type_title');
const popupCreateLinkCard = popupAddImage.querySelector('.popup__input_type_link');
const popupName = profilePopup.querySelector('.popup__input_type_name');
const popupActivities = profilePopup.querySelector('.popup__input_type_aboutme');
const popupOpenAddImage = document.querySelector('.profile__add-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupOpenElement = document.querySelector('.popup_open-image');
const cardTemplate = document.querySelector('.card-template').content;
const popupImageOpen = document.querySelector('.popup__image');
const popupNameOpen = document.querySelector('.popup__name');
const cardList = document.querySelector('.cards__list');
const profileAvatarImg = document.querySelector('.profile__pen-avatar');
const popupAvatarForm = document.querySelector('.popup__form_avatar');
const initialCards = [];

//валидация форм
const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
