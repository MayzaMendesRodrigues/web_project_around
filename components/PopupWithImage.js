import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.image = this.popup.querySelector(".popup__images-img");
    this.name = this.popup.querySelector(".popup__images-title");
  }

  open({name, link}) {
    
    this.image.src = link;
    this.name.textContent = name;
    this.image.alt = name


    super.open()

  }


}
