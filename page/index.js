import { cards, popupContent, validationConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../utils/api.js";
import {
  handleCreateCardSubmit,
  handleProfileSubmit,
  setEditProfileDefaultValues,
  setAddCardDefaultValues,
} from "../utils/utils.js";
import { FormValidator } from "../components/FormValidator.js";
const editProfile = document.querySelector("#profile__edit-btn");
const addCard = document.querySelector("#profile__add_card-btn");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__aboutMe",
  avatarSelector: ".profile__avatar",
});

api.getUserInfo().then((user) => {
  const { name, about, avatar } = user;
  userInfo.setUserInfo({ name, about, avatar });
});

const jsonCards = await api.getInicialCards();

export const section = new Section(
  {
    items: jsonCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#cards__template",
        (name, link) => popupWithImage.open({ name, link })
      ).generateCard();
      section.addItem(card);
    },
  },
  ".cards__element-items"
);

section.renderItems();

const createCardPopup = new PopupWithForm(
  popupContent.createPost,
  (inputValues) =>  handleCreateCardSubmit(
      inputValues.first,
      inputValues.second,
      section
    )
);

const popupWithImage = new PopupWithImage("#popup__image");
popupWithImage.setEventListeners();

popupWithImage.setEventListeners();

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
