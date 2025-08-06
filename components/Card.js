export class Card {
  constructor(
    name,
    link,
    liked,
    id,
    templateSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard
  ) {
    this._name = name;
    this._link = link;
    this._liked = liked;
    this._id = id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card__template")
      .cloneNode(true);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".cards__like");
    const trashButton = cardElement.querySelector(".cards__trash");
    const image = cardElement.querySelector(".cards__img");

    likeButton.addEventListener("click", () => {
      this._handleLikeCard(this._id, this._liked, likeButton);
      this._liked = !this._liked;
    });

    trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    const cardElement = this._getTemplate();
    console.log("AQUI O CARD", cardElement);
    const image = cardElement.querySelector(".cards__img");
    const title = cardElement.querySelector(".cards__title");
    // const like = cardElement.querySelector(".cards__like");
    // // if (like) {
    // //   like.classList.toggle("cards__like_active");
    // // } else {
    // //   like.classList.toggle("cards__like");
    // // }
    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
