export class formValidator {
  constructor (selectors, formElement) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;
  }

  _showInputError (inputElement, errorMessage) {
    // Находим элемент ошибки внутри самой функции
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    // Находим элемент ошибки
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    // Остальной код такой же
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
    
  };

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      // showInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // hideInputError теперь получает параметром форму, в которой
      // находится проверяемое поле, и само это поле
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
  
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(){
      // Находим все поля внутри формы,
      // сделаем из них массив методом Array.from
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
      if (buttonElement)
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
    
      // Обойдём все элементы полученной коллекции
      inputList.forEach((inputElement) => {
        // каждому полю добавим обработчик события input
        inputElement.addEventListener("input", () => {
          // Внутри колбэка вызовем isValid,
          // передав ей форму и проверяемый элемент
          this._isValid(inputElement);
          if (buttonElement)
            this._toggleButtonState(inputList, buttonElement);
        });
      });
    
  }

  enableValidation() {
    this._setEventListeners();
  }

  reset() {

      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

      const error = Array.from(this._formElement.querySelectorAll("span"));
      this._formElement.reset();

     
      if (buttonElement)
        this._toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);

      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }


}