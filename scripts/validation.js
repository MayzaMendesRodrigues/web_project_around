export function validation() {
  const showInputError = (formElement, inputElement, errorMessage, config) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass);
  };

  // Função para esconder erro
  const hideInputError = (formElement, inputElement, config) => {
    const formError = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    formError.classList.remove(config.errorClass);
    formError.textContent = "";
  };

  const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      // Se NÃO (!), mostre o elemento de erro.
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    } else {
      // Se for válido, oculte o elemento de erro.
      hideInputError(formElement, inputElement, config);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", "");
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  };

  const setEventListener = (formElement, config) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      config.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  };

  const enableValidation = (config) => {

    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        const inputList = Array.from(
          formElement.querySelectorAll(config.inputSelector)
        );

        inputList.forEach((inputElement) => {
          isValid(formElement, inputElement, config);
                      console.log(inputList)


        });
      });
      setEventListener(formElement, config);
    });

  };



  enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  });
}
