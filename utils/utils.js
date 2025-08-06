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
    })
}
export function handleNewPhoto(inputValues, userInfo) {
  api.setNewPhoto(inputValues).then((avatar) => {
    userInfo.setNewPhoto(avatar.avatar);
  }).catch((error)=> {
    console.error("Erro ao atualizar Foto de perfil", error)
    alert("Houve um erro ao atualizar foto. Por favor tente novamente")
  }).finally(() => {
    console.log("Processo finalizado")
  })
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
      section.addItem(newCard);
    });
}

export function setAddCardDefaultValues(inputFirst, inputSecond, cardInfo) {
  const currentCardInfo = cardInfo.__getInputValues();
  inputFirst.value = currentCardInfo.first;
  inputSecond.value = currentCardInfo.second;
}


export function handleLikeCard(cardId, isLiked, likeButton){
  if (isLiked){

    api.dislikeCard(cardId).then(() => {
      likeButton.classList.toggle("cards__like");

    })

    }else {
 api.likeCard(cardId).then(() => {
        likeButton.classList.toggle("cards__like_active");

    })
    }
  }
