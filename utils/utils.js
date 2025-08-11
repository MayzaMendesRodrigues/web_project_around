import { api } from "../utils/api.js";
import { Card } from "../components/Card.js";

export function handleProfileSubmit(inputValues, userInfo) {
  if (!inputValues.first || !inputValues.second) {
    return Promise.reject("Campos obrigatórios não preenchidos.");
  }
  api
    .setUserInfo({
      name: inputValues.first,
      about: inputValues.second,
    })
    .then((user) => {
      const { name, about, avatar } = user;

      userInfo.setUserInfo({ name, about, avatar });
    })
    .catch((error) => {
      console.error("Erro ao atualizar o perfil:", error);
    });
}

export function handleNewPhoto(inputValues, userInfo) {
  if (!inputValues || typeof inputValues !== "string") {
    return Promise.reject("Formato de foto invalida =");
  }

  api
    .setNewPhoto(inputValues)
    .then((avatar) => {
      userInfo.setNewPhoto(avatar.avatar);
    })
    .catch((error) => {
      console.error("Erro ao atualizar Foto de perfil", error);
      alert("Houve um erro ao atualizar foto. Por favor tente novamente");
    })
    .finally(() => {
      console.log("Processo finalizado");
    });
}

export function setEditProfileDefaultValues(inputFirst, inputLast, userInfo) {
  const currentUserInfo = userInfo.getUserInfo();
  inputFirst.value = currentUserInfo.name;
  inputLast.value = currentUserInfo.about;
}

export function handleCreateCardSubmit(name, link) {
  if (!name || !link) {
    return Promise.reject("Nome ou link invalido");
  }
  return api
    .addCard({
      name: name,
      link: link,
    })
    .then((card) => {
      return card;
    })
    .catch((error) => {
      console.error("Erro ao criar card", error);
      alert("Não foi possível criar o card. Tente novamente.");
    });
}

export function setAddCardDefaultValues(inputFirst, inputSecond, cardInfo) {
  const currentCardInfo = cardInfo.__getInputValues();
  inputFirst.value = currentCardInfo.first;
  inputSecond.value = currentCardInfo.second;
}


