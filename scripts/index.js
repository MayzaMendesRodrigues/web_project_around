import { validation } from "./validation.js";
import { cards, popupContent } from "./consts.js";
import { Card } from "./card.js";

const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__aboutMe");
const popupContainer = document.querySelector("#popup");
const popupImage = document.querySelector("#popup__image");
const cardsContainer = document.querySelector("#cards__content");
const cardsTemplate = document.querySelector("#cards__template");
const popupTemplate = document.querySelector("#popup__template");
const editProfile = document.querySelector("#profile__edit-btn");
const addCard = document.querySelector("#profile__add_card-btn");
const imagePopup = document.querySelector(".popup__images-img");
const imagePopupTitle = document.querySelector(".popup__images-title");
const popupImageCloseBtn = document.querySelector(".popup__images-closed");

editProfile.addEventListener("click", () => createPopUp(0));
addCard.addEventListener("click", () => createPopUp(1));

popupImageCloseBtn.addEventListener("click", () => {
  closeImagePopup();
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopupContent();
  }
});

cards.forEach((card) => {
  const cardInstance = new Card(
    card.name,
    card.link,
    "#cards__template",
    handleImageClick
  );
  const cardElement = cardInstance.generateCards();
  cardsContainer.append(cardElement);
});

function handleImageClick(name, link) {
  popupImage.style.display = "flex";
  imagePopup.src = link;
  imagePopup.alt = name;
  imagePopupTitle.textContent = name;
}

function closeImagePopup() {
  popupImage.style.display = "none";
}

function createPopUp(index) {
  popupContainer.innerHTML = "";
  const popupData = popupContent[index];
  const clonePopup = popupTemplate.content.cloneNode(true);
  const titlePopup = clonePopup.querySelector(".popup__title");
  const inputFirst = clonePopup.querySelector("#popup__inputFirst");
  const inputLast = clonePopup.querySelector("#popup__inputSecond");
  const saveBtn = clonePopup.querySelector(".popup__save");
  const closeBtn = clonePopup.querySelector(".popup__closed");
  const form = clonePopup.querySelector(".popup__form");

  titlePopup.textContent = popupData.title;
  inputFirst.placeholder = popupData.inputFirst;
  inputFirst.maxLength = popupData.maxlengthFirst;
  inputFirst.type = popupData.firstInputType;
  inputLast.type = popupData.secondInputType;
  inputFirst.minLength = popupData.minlengthFirst;
  inputLast.maxLength = popupData.maxlengthSecond;
  inputLast.minLength = popupData.minlengthSecond;
  inputLast.placeholder = popupData.inputSecond;
  saveBtn.textContent = popupData.buttonPopup;

  if (index === 0) {
    inputFirst.value = profileName.textContent;
    inputLast.value = profileAboutMe.textContent;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      profileName.textContent = inputFirst.value;
      profileAboutMe.textContent = inputLast.value;

      closePopupContent();
    });
  } else {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newCard = {
        name: inputFirst.value,
        link: inputLast.value,
      };

      const cardInstance = new Card(
        newCard.name,
        newCard.link,
        "#cards__template",
        handleImageClick
      );
      const cardElement = cardInstance.generateCards();
      cardsContainer.prepend(cardElement);

      closePopupContent();
    });
  }

  closeBtn.addEventListener("click", closePopupContent);
  popupContainer.append(clonePopup);
  popupContainer.style.display = "flex";

  validation();
}

function closePopupContent() {
  popupContainer.style.display = "none";
  popupContainer.innerHTML = "";
}

popupContainer.addEventListener("click", (evt) => {
  const form = popupContainer.querySelector(".popup__form");
  if (!form.contains(evt.target)) {
    closePopupContent();
  }
});

popupImage.addEventListener("click", (evt) => {
  if (!imagePopup.contains(evt.target)) {
    closeImagePopup();
  }
});
