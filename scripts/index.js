const openPopup = document.querySelector(".profile__edit")
const closePopup = document.querySelector('.popup__closed')
const saveEdit = document.querySelector(".popup__save")
const editName = document.querySelector("#popup__name")
const editAboutMe = document.querySelector("#popup__aboutMe")
const profileName = document.querySelector(".profile__name")
const profileAboutMe = document.querySelector(".profile__aboutMe")
const like = document.querySelector(".cards__like")
const popupContainer = document.getElementById("popup")
const cardsContainer = document.getElementById("cards__content")
const cardsTemplate = document.getElementById("cards__template")
const popupTemplate = document.getElementById("popup__template")
const editProfile = document.getElementById("profile__edit-btn")
const addCard = document.getElementById("profile__add_card-btn")





const cards = [
  {
    name: "Dolomitas - IT",
    link: "./images/img__card_dolomitas.jpg"
  },
  {
    name: "Obelisco - AR",
    link: "./images/img__card_obelisco.jpg"
  },
  {
    name: "Abruzzo - IT",
    link: "./images/img__card_abruzzo.jpg"
  },
  {
    name: "Caminito - AR",
    link: "./images/img__card_caminito.jpg"
  },
  {
    name: "Roma - IT",
    link: "./images/img__card_roma.jpg"
  },
  {
    name: "Congreso - AR",
    link: "./images/img__card_congreso.jpg"
  }
]

const popupContent = [
  {
    title: "Editar perfil",
    placeholderFirst: "Nome",
    placeholderLast: "About Me",
    buttonPopup: "Salvar"
  },
  {
    title: "Novo Local",
    placeholderFirst: "Título",
    placeholderLast: "Link de imagem",
    buttonPopup: "Criar"
  }
]

function createPopUp(index){
popupContainer.innerHTML = ""
const popupData = popupContent[index]
const clonePopup = popupTemplate.content.cloneNode(true)
const titlePopup = clonePopup.querySelector(".popup__title")
const inputFirst = clonePopup.querySelector("#popup__placeholderFirst");
const inputLast = clonePopup.querySelector("#popup__placeholderLast");
const saveBtn = clonePopup.querySelector(".popup__save");
const closeBtn = clonePopup.querySelector(".popup__closed")

  titlePopup.textContent = popupData.title
  inputFirst.placeholder = popupData.placeholderFirst
  inputLast.placeholder = popupData.placeholderLast
  saveBtn.textContent = popupData.buttonPopup

if(index === 0){
  inputFirst.value = profileName.textContent
  inputLast.value = profileAboutMe.textContent

  saveBtn.addEventListener("click", () => {
    profileName.textContent = inputFirst.value
    profileAboutMe.textContent = inputLast.value

    closePopupContent()
    })
} else {

}
closeBtn.addEventListener("click", closePopupContent)


popupContainer.append(clonePopup)
popupContainer.style.display='flex';
}

editProfile.addEventListener("click", () => createPopUp(0))
addCard.addEventListener("click", () => createPopUp(1))


function closePopupContent(){
  document.getElementById('popup').style.display='none';
}


cards.forEach(card => {
  const clone = cardsTemplate.content.cloneNode(true)

  clone.querySelector(".cards__img").src = card.link
  clone.querySelector(".cards__title").textContent = card.name

  cardsContainer.appendChild(clone)
  console.log(clone)
})



like.addEventListener('click', function () {
  if(like.src.includes("like.svg")){
like.src = "./images/like__active.svg"
  } else {
    like.src = "./images/like.svg"
  }

})





