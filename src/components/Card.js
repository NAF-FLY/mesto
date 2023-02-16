export class Card {
	constructor(
		userId,
		data,
		handleOpenPopupImage,
		templateSelector,
		handleDeleteItem,
		handleClickLike
	) {
		this._userId = userId
		this._data = data
		this._name = data.name
		this._link = data.link
		this._alt = data.name
		this._id = data._id
		this._ownId = data.owner._id
		this._likes = data.likes
		this._templateSelector = templateSelector
		this._handleOpenPopupImage = handleOpenPopupImage
		this._handleDeleteItem = handleDeleteItem
		this._handleClickLike = handleClickLike
	}

	_getTemplate() {
		const cardElements = document
			.querySelector(this._templateSelector)
			.content.querySelector('.item')
			.cloneNode(true)

		return cardElements
	}

	_setEventListeners() {
		this._likeButton.addEventListener('click', () => {
			this._handleClickLike(this)
		})

		this._deleteElement.addEventListener('click', () => {
			this._handleDeleteItem(this)
		})
		this._cardImage.addEventListener('click', () => {
			this._handleOpenPopupImage(this._link, this._name)
		})
	}

	setlikeCounter(data) {
		this._cardLikesCounter.textContent = data.likes.length
	}

	toggleLikes(data) {
		// console.log('data =>', data);

		this._likes = data.likes
		this._likeButton.classList.toggle('item__like_active_black')
	}

	refreshArrlike(data) {
		this._likes = data.likes
	}

	_handleRemoveElement() {
		this._deleteElement.classList.add('item__trash-inactive')
	}
	handleDeleteCard() {
		this._element.remove()
		this._element = null
	}
	getCardId() {
		return this._id
	}
	isLike() {
		return this._likes.some(item => {
			return item._id === this._userId
		})
	}

	_checkUserLike() {
		if (this.isLike()) {
			this._likeButton.classList.add('item__like_active_black')
		} else {
			this._likeButton.classList.remove('item__like_active_black')
		}
	}

	generateCard() {
		this._element = this._getTemplate()
		this._element.querySelector('.item__name').textContent = this._name
		this._cardImage = this._element.querySelector('.item__image')
		this._cardImage.src = this._link
		this._cardImage.alt = this._name
		this._likeButton = this._element.querySelector('.item__like')
		this._deleteElement = this._element.querySelector('.item__trash')
		this._cardLikesCounter = this._element.querySelector('.item__like-counter')
		this._cardLikesCounter.textContent = this._likes.length
		this._checkUserLike()

		//лайк
		// (this._likes.find((user) => user._id === this._userId)) this._handleLikeButton();

		// if (this._likes.find((user) => user._id === this._userId)) this._handleLikeClick();

		//карзина
		if (this._ownId !== this._userId) {
			this._handleRemoveElement()
		}
		this._setEventListeners()

		return this._element
	}
}
