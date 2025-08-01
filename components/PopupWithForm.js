
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(config, handleSubmit, setEditDefaultValue) {
    const popupSelector = "#popup";
    super(popupSelector);
    this.handleSubmit = handleSubmit;
    this.setEditDefaultValue = setEditDefaultValue;

    this.popupContainer = document.querySelector("#popup");
    const clonePopup = document
      .querySelector("#popup__template")
      .content.cloneNode(true);
    const titlePopup = clonePopup.querySelector(".popup__title");
    this.inputFirst = clonePopup.querySelector("#popup__inputFirst");
    this.inputLast = clonePopup.querySelector("#popup__inputSecond");
    const saveBtn = clonePopup.querySelector(".popup__save");
    this.form = clonePopup.querySelector(".popup__form");

    titlePopup.textContent = config.title;
    this.inputFirst.placeholder = config.inputFirst;
    this.inputFirst.maxLength = config.maxlengthFirst;
    this.inputLast.type = config.secondInputType;
    this.inputFirst.minLength = config.minlengthFirst;
    this.inputLast.maxLength = config.maxlengthSecond;
    this.inputFirst.type = config.firstInputType;
    this.inputLast.minLength = config.minlengthSecond;
    this.inputLast.placeholder = config.inputSecond;
    saveBtn.textContent = config.buttonPopup;
  }

  open() {
    if (this.setEditDefaultValue) {
      this.setEditDefaultValue(this.inputFirst, this.inputLast);
    }
    this.popupContainer.innerHTML = " ";
    this.popupContainer.append(this.form);
    super.open();


  }

  _getInputValues() {
    const inputValues = {
      first: this.inputFirst.value,
      second: this.inputLast.value,
    };
    return inputValues;
  }

  _setEventListener() {
    super.setEventListeners();
    this.form.addEventListener("submit", () => {
      this.handleSubmit(this._getInputValues());
      super.close();
    });
  }

  generatePopup() {
    const popupForm = this.form;
    return popupForm;
  }
}
