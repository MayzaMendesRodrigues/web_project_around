const openPopup = document.querySelector(".profile__edit")
const closePopup = document.querySelector('.popup__closed')
const saveEdit = document.querySelector(".popup__save")
const editName = document.querySelector("#popup__name")
const editAboutMe = document.querySelector("#popup__aboutMe")
const profileName = document.querySelector(".profile__name")
const profileAboutMe = document.querySelector(".profile__aboutMe")
const like = document.querySelector(".cards__like")
const popup = document.getElementById("popup")
const cardsContainer = document.getElementById("cards__content")
const cardsTemplate = document.getElementById("cards__template")


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

cards.forEach(card => {
  const clone = cardsTemplate.content.cloneNode(true)

  clone.querySelector(".cards__img").src = card.link
  clone.querySelector(".cards__title").textContent = card.name

  cardsContainer.appendChild(clone)
  console.log(clone)
})

function openPopupContent(){
  popup.style.display='flex';

  editName.value = profileName.textContent
  editAboutMe.value = profileAboutMe.textContent
}
openPopup.addEventListener("click", openPopupContent)


function closePopupContent(){
  document.getElementById('popup').style.display='none';
}
closePopup.addEventListener("click", closePopupContent)


saveEdit.addEventListener("click", function() {
profileName.textContent = editName.value
profileAboutMe.textContent = editAboutMe.value

closePopupContent()
})




like.addEventListener('click', function () {
  if(like.src.includes("like.svg")){
like.src = "./images/like__active.svg"
  } else {
    like.src = "./images/like.svg"
  }

})





