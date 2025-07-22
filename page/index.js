import { cards, popupContent } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { handleProfileSubmit, setEditProfileDefaultValues } from "../utils/utils.js";

const editProfile = document.querySelector("#profile__edit-btn");
const addCard = document.querySelector("#profile__add_card-btn");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__aboutMe",
});

const cardSection = new Section(
  {
    items: cards,

    renderer: (card) => {
      const cardElement = createCard(card.name, card.link);
      cardSection.addItem(cardElement);
    },
  },

  "#cards__content"
);

cardSection.renderItems();

const popupWithImage = new PopupWithImage("#popup__image");
popupWithImage.setEventListeners();

function createCard(name, link) {
  const cardInstance = new Card(name, link, "#cards__template", () =>
    popupWithImage.open({ name, link })
  );

  const cardElement = cardInstance.generateCard();
  return cardElement;
}
popupWithImage.setEventListeners();



const editProfilePopup = new PopupWithForm(
  popupContent.editProfile,

  (inputValues) => handleProfileSubmit(inputValues, userInfo),

  (inputFirst, inputLast) => setEditProfileDefaultValues(inputFirst, inputLast, userInfo)

);
editProfile.addEventListener("click", () => {
  editProfilePopup.open();
});

editProfilePopup._setEventListener();

const createCardPopup = new PopupWithForm(
  popupContent.createPost,
  (inputValues) => {
    const cardElement = createCard(inputValues.first, inputValues.second);
    cardSection.addItem(cardElement);
  },

);

addCard.addEventListener("click", () => {
  createCardPopup.open();
});
createCardPopup._setEventListener();

