import { validation } from "./validation.js";
import { cards , popupContent } from "./consts.js";

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

cards.forEach((card) => {
  const newCard = createCard(card.name, card.link);
  cardsContainer.append(newCard);
});

function createCard(name, link) {
  const clone = cardsTemplate.content
    .querySelector(".cards__element")
    .cloneNode(true);

  clone.querySelector(".cards__img").src = link;
  clone.querySelector(".cards__img").alt = name;
  clone.querySelector(".cards__img").addEventListener("click", () => {
    popupImage.style.display = "flex";
    imagePopup.src = link;
    imagePopup.alt = name;
    imagePopupTitle.textContent = name;
  });

  popupImageCloseBtn.addEventListener("click", () => {
   closeImagePopup()
  });

  clone.querySelector(".cards__title").textContent = name;
  clone.querySelector(".cards__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("cards__like_active");
  });
  clone.querySelector(".cards__trash").addEventListener("click", (evt) => {
    evt.target.closest(".cards__element").remove();
  });

  return clone;
}

function closeImagePopup(){
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

      const createdNewCard = createCard(newCard.name, newCard.link);
      cardsContainer.prepend(createdNewCard);
      closePopupContent();
    });
  }

  closeBtn.addEventListener("click", closePopupContent );
  popupContainer.append(clonePopup);
  popupContainer.style.display = "flex";

  validation();
}

function closePopupContent(){
  popupContainer.style.display = "none";
  popupContainer.innerHTML=""
}

document.addEventListener("keydown", (evt) => {
  if(evt.key === "Escape"){
    closePopupContent()
  }
})

popupContainer.addEventListener("click", (evt) => {
  console.log("Click on popup container")
  const form = popupContainer.querySelector(".popup__form")
  if(!form.contains(evt.target)){
   closePopupContent()
  }
})

popupImage.addEventListener("click", (evt) =>{
  console.log("Click on popupimage")
  if(!imagePopup.contains(evt.target)){
   closeImagePopup()
  }
})