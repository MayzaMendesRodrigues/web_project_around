import { Popup } from "./Popup.js";

export class PopupWithPhoto extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.form = this.popup.querySelector(".popup__form");
    this.inputUrl = this.popup.querySelector("#popup__input-photo");
  }

  _getInputValues() {
    return {
      url: this.inputUrl.value,
    };
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSubmit(this._getInputValues());
      super.close();
    });
  }
}
