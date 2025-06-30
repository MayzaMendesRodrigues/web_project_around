import { cards, popupContent } from "./consts.js";
import { Card } from "./card.js";
import { FormValidator } from "./formValidator.js";

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

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

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


cards.forEach(card => createCard(card.name, card.link))

function createCard(name, link, isPrepend = false) {
  const cardInstance = new Card(
    name,
    link,
    "#cards__template",
    handleImageClick
  );

  const cardElement = cardInstance.generateCards();

  if (isPrepend) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement)
  }
}


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

      createCard(inputFirst.value, inputLast.value, true);

      console.log(createCard)


      closePopupContent();
    });
  } else {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      createCard(inputFirst.value, inputLast.value, true);

      closePopupContent();
    });
  }

  closeBtn.addEventListener("click", closePopupContent);

  popupContainer.append(clonePopup);
  popupContainer.style.display = "flex";

  const formValidators = {};

  if (!formValidators[popupData.title]) {
    const validator = new FormValidator(validationConfig, form);
    validator.enableValidation();
    formValidators[popupData.title] = validator;
  }
}

function closePopupContent() {
  popupContainer.style.display = "none";
  popupContainer.innerHTML = "";
}

popupContainer.addEventListener("click", (evt) => {
  const form = popupContainer.querySelector(".popup__form");
  if (form &&!form.contains(evt.target)) {
    closePopupContent();
  }
});

popupImage.addEventListener("click", (evt) => {
  if (!imagePopup.contains(evt.target)) {
    closeImagePopup();
  }
});
