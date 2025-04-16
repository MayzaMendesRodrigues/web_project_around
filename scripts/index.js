let openPopup = document.querySelector(".profile__edit")
let closePopup = document.querySelector('.popup__closed')
let saveEdit = document.querySelector(".popup__save")
let editName = document.querySelector("#popup__name")
let editAboutMe = document.querySelector("#popup__aboutMe")
let profileName = document.querySelector(".profile__name")
let profileAboutMe = document.querySelector(".profile__aboutMe")
let like = document.querySelector(".cards__like")


function openPopupContent(){
  document.getElementById('popup').style.display='flex';

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





