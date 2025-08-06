import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, popupButtonSelector) {
    super(popupSelector);
    this._popupButton = this.popup.querySelector(popupButtonSelector);
    this._confirmationHandlerCallback = null;
  }

  _executeCallback = (e) => {
    e.preventDefault()
    if (this._confirmationHandlerCallback) {
      this._confirmationHandlerCallback();
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener("click", this._executeCallback);
  }

  open(confirmationHandlerCallback) {
    super.open();
    this._confirmationHandlerCallback = confirmationHandlerCallback;
  }
}
