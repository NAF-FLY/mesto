class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl
		this._headers = options.headers
	}

	_getResponse(res) {
		if (res.ok) {
			return res.json()
		} else {
			return Promise.reject(`Ошибка: ${res.status}`)
		}
	}
	//массив карточек с сервера
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then(this._getResponse)
	}

	//информация пользователя (о себе)
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then(this._getResponse)
	}
	//установить данные о себе
	setUserInfo(userData) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: userData.name,
				about: userData.about,
			}),
		}).then(this._getResponse)
	}
	//создать карточку
	createCard(newCard) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: `${newCard.name}`,
				link: `${newCard.link}`,
			}),
		}).then(this._getResponse)
	}
	//удалить карточку
	deleteCard(id) {
		return fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers,
		})
	}
	//установить аватар
	setUserAvatar(img) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: `${img.avatar}`,
			}),
		}).then(this._getResponse)
	}
	//установить лайк
	setLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'PUT',
			headers: this._headers,
		}).then(this._getResponse)
	}
	//убрать лайк
	deleteLike(id) {
		return fetch(`${this._baseUrl}/cards/${id}/likes`, {
			method: 'DELETE',
			headers: this._headers,
		}).then(this._getResponse)
	}
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
	headers: {
		authorization: 'ff56f93d-d478-42ff-a22e-0db12fad9894',
		'Content-Type': 'application/json',
	},
})
