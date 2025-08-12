import { popupContent, validationConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../utils/api.js";
import {
  handleCreateCardSubmit,
  handleNewPhoto,
  handleProfileSubmit,
  setEditProfileDefaultValues,
} from "../utils/utils.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { PopupWithPhoto } from "../components/PopupWithPhoto.js";
const editProfile = document.querySelector("#profile__edit-btn");
const addCard = document.querySelector("#profile__add_card-btn");
const editPhoto = document.querySelector(".profile__content");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__aboutMe",
  avatarSelector: ".profile__avatar",
});

api.getUserInfo().then((user) => {
  const { name, about, avatar } = user;
  userInfo.setUserInfo({ name, about, avatar });
});

const mapCard = (item) => {
  const cardDeletionCallback = () => {
    api
      .deleteCard(item._id)
      .then(() => {
        popupWithConfirmation.close();
        section.removeItem(card);
      })
      .catch((e) =>
        console.error(`Failed trying to delete card=${item._id}`, e)
      );
  };
  const handleDeleteCard = () =>
    popupWithConfirmation.open(cardDeletionCallback);
  const handleCardClick = (name, link) => popupWithImage.open({ name, link });
  const card = new Card(
    item.name,
    item.link,
    item.isLiked,
    item._id,
    "#cards__template",
    handleCardClick,
    handleDeleteCard,

  );
  return card;
};
const apiCards = await api.getInicialCards();

const cards = apiCards.map((item) => {
  const card = mapCard(item);
  return card;
});

const cardRender = (card) => card.generateCard();

const section = new Section(cards, cardRender, ".cards__element-items");

section.renderItems();

const createCardPopup = new PopupWithForm(
  popupContent.createPost,
  (inputValues) => {
    handleCreateCardSubmit(inputValues.first, inputValues.second).then(
      (item) => {
        const card = mapCard(item);
        section.addItem(card);
      }
    );
  }
);

const popupWithImage = new PopupWithImage("#popup__image");
popupWithImage.setEventListeners();

const popupWithConfirmation = new PopupWithConfirmation(
  "#popupWithConfirmation",
  "#popupConfirmationButton"
);

popupWithConfirmation.setEventListeners();

const editPhotoPopup = new PopupWithPhoto("#popupEditPhoto", (inputValues) =>
  handleNewPhoto(inputValues, userInfo)
);

editPhotoPopup.setEventListeners();
editPhoto.addEventListener("click", () => {
  editPhotoPopup.open();
});

const editPhotoFormElemnt = document.querySelector("#popupEditPhoto")
const editPhotoFormValidator = new FormValidator(
  validationConfig,
  editPhotoFormElemnt
)
editPhotoFormValidator.enableValidation()


const editProfilePopup = new PopupWithForm(
  popupContent.editProfile,
  (inputValues) => handleProfileSubmit(inputValues, userInfo),
  (inputFirst, inputLast) =>
    setEditProfileDefaultValues(inputFirst, inputLast, userInfo)
);

const editProfileFormElement = editProfilePopup.generatePopup();
const editProfileFormValidator = new FormValidator(
  validationConfig,
  editProfileFormElement
);
editProfileFormValidator.enableValidation();

editProfile.addEventListener("click", () => {
  editProfilePopup.open();
});

editProfilePopup._setEventListener();

const createCardFormElement = createCardPopup.generatePopup();
const createCardFormValidator = new FormValidator(
  validationConfig,
  createCardFormElement
);
createCardFormValidator.enableValidation();

addCard.addEventListener("click", () => {
  createCardPopup.open();
});
createCardPopup._setEventListener();

