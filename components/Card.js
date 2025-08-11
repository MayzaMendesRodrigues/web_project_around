import { api } from "../utils/api.js";

export class Card {
  constructor(
    name,
    link,
    isLiked,
    id,
    templateSelector,
    handleCardClick,
    handleDeleteCard
  ) {
    this._name = name;
    this._link = link;
    this._isLiked = isLiked;
    this._id = id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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
      this._handleLikeCard(likeButton)
    });

    trashButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  _handleLikeCard(likeButton) {
    const isActive = likeButton.classList.contains("active");
    console.log(likeButton.classList)
    if (isActive) {
      api
        .dislikeCard(this._id)
        .then(() => {
          likeButton.classList.remove("active");
        })
        .catch((error) => {
          console.error("Erro ao atualizar descurtida:", error);
          alert("Não foi possível atualizar a curtida. Tente novamente.");
        });
    }else{
      api.likeCard(this._id).then(()=> {
        likeButton.classList.add("active")
      }) .catch((error) => {
          console.error("Erro ao atualizar curtida:", error);
          alert("Não foi possível atualizar a curtida. Tente novamente.");
        });
    }
  }

  generateCard() {
    const cardElement = this._getTemplate();
    const image = cardElement.querySelector(".cards__img");
    const title = cardElement.querySelector(".cards__title");
    const likeButton = cardElement.querySelector(".cards__like");

    image.src = this._link;
    image.alt = this._name;
    title.textContent = this._name;

    if (this._isLiked) {
      likeButton.classList.add("active");
    }

    this._setEventListeners(cardElement);

    return cardElement;
  }
}
