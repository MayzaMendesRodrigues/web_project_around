export class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);

  }

  open() {
    this.popup.style.display = "flex";
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.style.display = "none";
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this.popup.addEventListener("click", (e) => {
      if (

        e.target === this.popup ||
        e.target.classList.contains("popup__closed")
      ) {
        this.close();
      }
    });
  }

}