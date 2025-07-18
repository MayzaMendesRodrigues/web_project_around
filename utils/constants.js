export const  cards = [
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

export const popupContent = {
 editProfile: {
    title: "Editar perfil",
    inputFirst: "Nome",
    inputSecond: "Sobre mim",
    minlengthFirst: "2",
    maxlengthFirst: "40",
    maxlengthSecond: "200",
    minlengthSecond: "2",
    firstInputType: "text",
    secondInputType: "text",
    buttonPopup: "Salvar",
  },

  createPost:{
    title: "Novo Local",
    inputFirst: "Título",
    inputSecond: "Link de imagem",
    minlengthFirst: "2",
    maxlengthFirst: "30",
    maxlengthSecond: "300",
    minlengthSecond: "2",
    firstInputType: "text",
    secondInputType: "url",
    buttonPopup: "Criar",
  },
}

export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };


