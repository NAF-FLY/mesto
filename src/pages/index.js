import {
	initialCards,
	object,
	profileForm,
	popupCreateCard,
	popupCreateTitle,
	popupCreateLinkCard,
	popupName,
	popupActivities,
	popupOpenAddImage,
	popupOpenButtonElement,
	cardList,
	popupConfirm,
	profileAvatarImg,
	popupAvatarForm,
} from '../utils/Constants.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'
import { api } from '../components/Api.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import './index.css'
let userId
//закрытие попапов на крестик и оверлей
//закрытие попапов
//закрытие попапа на кнопку
//открытие попапов
const profileInfo = new UserInfo({
	profileName: '.profile__name',
	profileActivities: '.profile__activities',
	profileAvatar: '.profile__avatar',
})

Promise.all([api.getInitialCards(), api.getUserInfo()])
	.then(([cards, userData]) => {
		userId = userData._id
		newCardsList.renderItems(cards.reverse())
		profileInfo.setUserInfo(userData)
	})
	.catch(err => {
		console.log(err)
	})
const popupdDeleteItem = new PopupWithConfirmation('.popup-confirm')
popupdDeleteItem.setEventListeners()

const popupProfileWithForm = new PopupWithForm(
	'.profile-popup',
	handleProfeleFormSubmit
)
popupProfileWithForm.setEventListeners()

const popupCreateCardWithForm = new PopupWithForm(
	'.popup_add-image',
	handleCardFormSubmit
)
popupCreateCardWithForm.setEventListeners()

const popupRefreshAvatarWhitForm = new PopupWithForm(
	'.profile-refresh',
	handleAvatarSubmit
)
popupRefreshAvatarWhitForm.setEventListeners()

//данные из попапа в профиль
function handleProfeleFormSubmit(inputs) {
	popupProfileWithForm.loadingText('Сохранение...', true)
	//
	api
		.setUserInfo(inputs)
		.then(data => {
			profileInfo.setUserInfo(data)
			popupProfileWithForm.close()
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			popupProfileWithForm.loadingText(false)
		})
}
//обновнелие аватара
function handleAvatarSubmit(elm) {
	popupRefreshAvatarWhitForm.loadingText('Сохранение...', true)
	api
		.setUserAvatar(elm)
		.then(newImg => {
			profileInfo.setUserInfo(newImg)
			popupRefreshAvatarWhitForm.close()
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => {
			popupRefreshAvatarWhitForm.loadingText(false)
		})
}
// setTimeout(handleAvatarSubmit, handleProfeleFormSubmit, 1000);

// // //редактирование профиля, данные из профиля в попап
const fillProfileInputs = () => {
	const inputs = profileInfo.getUserInfo()
	popupName.value = inputs.name
	popupActivities.value = inputs.about
}

profileAvatarImg.addEventListener('click', () => {
	popupRefreshAvatarFormValidator.disableSubmitButton()
	popupRefreshAvatarFormValidator.clearInputErrors()
	popupRefreshAvatarWhitForm.open()
})
//попап редактирования профиля
popupOpenButtonElement.addEventListener('click', () => {
	fillProfileInputs()
	profileFormValidator.disableSubmitButton()
	profileFormValidator.clearInputErrors()
	popupProfileWithForm.open()
})

const createCard = item => {
	const card = new Card(
		userId,
		item,
		handleOpenPopupImage,
		'.card-template',
		handleDeleteItem,
		handleClickLike
	)

	const cardElements = card.generateCard()

	return cardElements
}

function handleClickLike(card) {
	if (!card.isLike()) {
		api
			.setLike(card.getCardId())
			.then(res => {
				card.refreshArrlike(res)
				card.setlikeCounter(res)
				card.toggleLikes(res)
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	} else {
		api
			.deleteLike(card.getCardId())
			.then(res => {
				card.refreshArrlike(res)
				card.setlikeCounter(res)
				card.toggleLikes(res)
				console.log(res)
			})
			.catch(err => {
				console.log(err)
			})
	}
}

//удаление карточки с сайта
const handleDeleteItem = card => {
	popupdDeleteItem.open()
	popupdDeleteItem.handleFormSubmit(() => {
		return api
			.deleteCard(card.getCardId())
			.then(res => {
				card.handleDeleteCard(res)
			})
			.catch(err => {
				console.log(err)
			})
	})
}

//попап с открытием картинки
const handleOpenPopupImage = (link, name) => {
	openImageModal.open(link, name)
}

const newCardsList = new Section(
	{
		renderer: item => {
			newCardsList.addCard(createCard(item))
		},
	},
	'.cards__list'
)

//создание карточки
function handleCardFormSubmit(card) {
	api
		.createCard(card)
		.then(newCard => {
			cardList.prepend(createCard(newCard))
			popupCreateCardWithForm.close()
		})
		.catch(err => {
			console.log(err)
		})
}
const openImageModal = new PopupWithImage('.popup_open-image')
openImageModal.setEventListeners()

popupOpenAddImage.addEventListener('click', () => {
	popupCreateCardWithForm.open()
	createCardFormValidator.disableSubmitButton()
	createCardFormValidator.clearInputErrors()
})

const profileFormValidator = new FormValidator(object, profileForm)
profileFormValidator.enableValidation()

const createCardFormValidator = new FormValidator(object, popupCreateCard)
createCardFormValidator.enableValidation()

const popupRefreshAvatarFormValidator = new FormValidator(
	object,
	popupAvatarForm
)
popupRefreshAvatarFormValidator.enableValidation()
