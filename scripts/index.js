const openPopup = document.querySelector(".profile__edit");
const closePopup = document.querySelector(".popup__closed");
const saveEdit = document.querySelector(".popup__save");
const editName = document.querySelector("#popup__name");
const editAboutMe = document.querySelector("#popup__aboutMe");
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__aboutMe");
const like = document.querySelector(".cards__like");
const popupContainer = document.getElementById("popup");
const cardsContainer = document.getElementById("cards__content");
const cardsTemplate = document.getElementById("cards__template");
const popupTemplate = document.getElementById("popup__template");
const editProfile = document.getElementById("profile__edit-btn");
const addCard = document.getElementById("profile__add_card-btn");
const deleteCard = document.getElementById("cards__trash");

const cards = [
  {
    name: "Dolomitas - IT",
    link: "./images/img__card_dolomitas.jpg",
  },
  {
    name: "Obelisco - AR",
    link: "./images/img__card_obelisco.jpg",
  },
  {
    name: "Abruzzo - IT",
    link: "./images/img__card_abruzzo.jpg",
  },
  {
    name: "Caminito - AR",
    link: "./images/img__card_caminito.jpg",
  },
  {
    name: "Roma - IT",
    link: "./images/img__card_roma.jpg",
  },
  {
    name: "Congreso - AR",
    link: "./images/img__card_congreso.jpg",
  },
];

const popupContent = [
  {
    title: "Editar perfil",
    placeholderFirst: "Nome",
    placeholderLast: "About Me",
    buttonPopup: "Salvar",
  },
  {
    title: "Novo Local",
    placeholderFirst: "Título",
    placeholderLast: "Link de imagem",
    buttonPopup: "Criar",
  },
];

cards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  cardsContainer.append(newCard);
});

function createCard(name, link) {
  const clone = cardsTemplate.content
    .querySelector(".cards__element")
    .cloneNode(true);

  clone.querySelector(".cards__img").src = link;
  clone.querySelector(".cards__title").textContent = name;
  clone.querySelector(".cards__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("cards__like_active");
  });
  clone.querySelector(".cards__trash").addEventListener("click", (evt) => {
    evt.target.closest(".cards__element").remove();
  });
  return clone;
}

function createPopUp(index) {
  popupContainer.innerHTML = "";
  const popupData = popupContent[index];
  const clonePopup = popupTemplate.content.cloneNode(true);
  const titlePopup = clonePopup.querySelector(".popup__title");
  const inputFirst = clonePopup.querySelector("#popup__placeholderFirst");
  const inputLast = clonePopup.querySelector("#popup__placeholderLast");
  const saveBtn = clonePopup.querySelector(".popup__save");
  const closeBtn = clonePopup.querySelector(".popup__closed");

  titlePopup.textContent = popupData.title;
  inputFirst.placeholder = popupData.placeholderFirst;
  inputLast.placeholder = popupData.placeholderLast;
  saveBtn.textContent = popupData.buttonPopup;

  if (index === 0) {
    inputFirst.value = profileName.textContent;
    inputLast.value = profileAboutMe.textContent;

    saveBtn.addEventListener("click", () => {
      profileName.textContent = inputFirst.value;
      profileAboutMe.textContent = inputLast.value;

      closePopupContent();
    });
  } else {
    saveBtn.addEventListener("click", () => {
      const newCard = {
        name: inputFirst.value,
        link: inputLast.value,
      };

      const createdNewCard = createCard(newCard.name, newCard.link);
      cardsContainer.prepend(createdNewCard);
      closePopupContent();
    });
  }
  closeBtn.addEventListener("click", closePopupContent);
  popupContainer.append(clonePopup);
  popupContainer.style.display = "flex";
}

editProfile.addEventListener("click", () => createPopUp(0));
addCard.addEventListener("click", () => createPopUp(1));

function closePopupContent() {
  popupContainer.style.display = "none";
}
