import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // this._handleItemSubmit = handleItemSubmit;
    this._buttonDelete = this._popup.querySelector('.popup__button_type_delete-card');
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit()
        .then(() => this.close())
        .catch((err) => {
          console.log(err);
        });
      super.close();
    });

    super.setEventListeners();
  }
  handleFormSubmit(func) {
    this._handleFormSubmit = func;
  }
}
