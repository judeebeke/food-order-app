import { useState } from "react";

const useInputHook = (inputValidator) => {
  const [userInput, setUserInput] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const [inputError, setInputError] = useState(false);

  const inputHandler = (value) => {
    setUserInput(value);
  };

  const isInputTouchedHandler = (bool) => {
    setIsInputTouched(bool);
  };

  let isInputValid = inputValidator(userInput);

  let isFormValid = isInputValid && isInputTouched

  return {
    userInput,
    userInputHandler: inputHandler,
    isInputValid,
    inputTouchHandler: isInputTouchedHandler,
    isInputTouched,
    isFormValid,
    setInputError,
    inputError,
  };
};

export default useInputHook;
