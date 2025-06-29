
export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

//     const showInputError = (formElement, inputElement, errorMessage, config) => {
// //     const formError = formElement.querySelector(`#${inputElement.id}-error`);
// //     formError.textContent = errorMessage;
// //     formError.classList.add(config.errorClass);
// //   };


  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  //   const hideInputError = (formElement, inputElement, config) => {
//     const formError = formElement.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove(config.inputErrorClass);
//     formError.classList.remove(config.errorClass);
//     formError.textContent = "";
//   };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

 //   const isValid = (formElement, inputElement, config) => {
//     if (!inputElement.validity.valid) {
//       // Se NÃO (!), mostre o elemento de erro.
//       showInputError(
//         formElement,
//         inputElement,
//         inputElement.validationMessage,
//         config
//       );
//     } else {
//       // Se for válido, oculte o elemento de erro.
//       hideInputError(formElement, inputElement, config);
//     }
//   };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }


//   const hasInvalidInput = (inputList) => {
//     return inputList.some((inputElement) => {
//       return !inputElement.validity.valid;
//     });
//   };


  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

//    const toggleButtonState = (inputList, buttonElement, config) => {
// //     if (hasInvalidInput(inputList)) {
// //       buttonElement.classList.add(config.inactiveButtonClass);
// //       buttonElement.setAttribute("disabled", "");
// //     } else {
// //       buttonElement.classList.remove(config.inactiveButtonClass);
// //       buttonElement.removeAttribute("disabled");
// //     }
// //   };

  _setEventListeners() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }


//   const setEventListener = (formElement, config) => {
//     const inputList = Array.from(
//       formElement.querySelectorAll(config.inputSelector)
//     );
//     const buttonElement = formElement.querySelector(
//       config.submitButtonSelector
//     );

//     toggleButtonState(inputList, buttonElement, config);

//     inputList.forEach((inputElement) => {
//       inputElement.addEventListener("input", () => {
//         isValid(formElement, inputElement, config);
//         toggleButtonState(inputList, buttonElement, config);
//       });
//     });
//   };
  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._inputList.forEach((inputElement) => {
        this._checkInputValidity(inputElement);
      });
    });

    this._setEventListeners();
  }
}
//   const enableValidation = (config) => {

//     const formList = Array.from(document.querySelectorAll(config.formSelector));
//     formList.forEach((formElement) => {
//       formElement.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//         const inputList = Array.from(
//           formElement.querySelectorAll(config.inputSelector)
//         );

//         inputList.forEach((inputElement) => {
//           isValid(formElement, inputElement, config);
//                       console.log(inputList)

//         });
//       });
//       setEventListener(formElement, config);
//     });

//   };

//   enableValidation({
//     formSelector: ".popup__form",
//     inputSelector: ".popup__input",
//     submitButtonSelector: ".popup__save",
//     inactiveButtonClass: "popup__save_inactive",
//     inputErrorClass: "popup__input_type_error",
//     errorClass: "popup__input-error_active",
//   });
// }