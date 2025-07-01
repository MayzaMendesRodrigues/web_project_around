export class Card {
  constructor(name, link, templateSelector, handleImageClick){
    this._name = name;
    this._link = link;
    this._templateSelector= templateSelector;
    this._handleImageClick= handleImageClick;
  }

  _getTemplate(){
    const cardTemplate = document.querySelector(this._templateSelector)
    .content
    .querySelector(".cards__element")
    .cloneNode(true)

    return cardTemplate
  }
_setEventListeners(cardElement){
const likeButton = cardElement.querySelector(".cards__like");
const trashButton = cardElement.querySelector(".cards__trash");
const image = cardElement.querySelector(".cards__img")

likeButton.addEventListener("click", () => {
  likeButton.classList.toggle("cards__like_active")
})

trashButton.addEventListener("click", () => {
  cardElement.remove()
})

image.addEventListener("click", () => {
  this._handleImageClick(this._name, this._link)
})
}

generateCard() {
  const cardElement = this._getTemplate()
   const image = cardElement.querySelector(".cards__img");
    const title = cardElement.querySelector(".cards__title");

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;

}

}