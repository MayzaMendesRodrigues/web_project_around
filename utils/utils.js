import { api } from "../utils/api.js";
import { Card } from "../components/Card.js";

export function handleProfileSubmit(inputValues, userInfo) {
  api
    .setUserInfo({
      name: inputValues.first,
      about: inputValues.second,
    })
    .then((user) => {
      const { name, about, avatar } = user;
      userInfo.setUserInfo({ name, about, avatar });
      console.log(`User info updated: ${name}, ${about}, ${avatar}`);
    });
}

export function setEditProfileDefaultValues(inputFirst, inputLast, userInfo) {
  const currentUserInfo = userInfo.getUserInfo();
  inputFirst.value = currentUserInfo.name;
  inputLast.value = currentUserInfo.about;
}

export function handleCreateCardSubmit(name, link, section) {
  api
    .addCard({
      name: name,
      link: link,
    })
    .then((card) => {
      const { name, link } = card;
      const newCard = new Card(name, link, "#cards__template", (name, link) =>
        popupWithImage.open({ name, link })
      );
      const cardHtml = newCard.generateCard();
      section.addItem(cardHtml);
    });
}

export function setAddCardDefaultValues(inputFirst, inputSecond, cardInfo) {
  const currentCardInfo = cardInfo.__getInputValues();
  inputFirst.value = currentCardInfo.first;
  inputSecond.value = currentCardInfo.second;
}
