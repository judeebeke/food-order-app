import classes from "./Checkout.module.css";
import useInputHook from "./../custom-hooks/useInputHook";

const Checkout = (props) => {
   const isnotEmpty = (value) => value.trim() !== "";
  const isFiveChar = (value) => value.length >= 5;

  const {userInput: userNameInput, userInputHandler: userNameInputHandler, isInputValid: isNameInputValid, inputTouchHandler: nameInputTouchHandler, isInputTouched: isNameInputTouched, isFormValid: userNameValid, setInputError: setNameInputError, inputError: nameHasError} = useInputHook(isnotEmpty);

  const {userInput: userStreetInput, userInputHandler: userStreetInputHandler, isInputValid: isStreetInputValid, inputTouchHandler: streetInputTouchHandler, isInputTouched: isStreetInputTouched, isFormValid: userStreetValid, setInputError: setStreetInputError, inputError: streetHasError} = useInputHook(isnotEmpty);

  const {userInput: userPostalCodeInput, userInputHandler: userPostalCodeInputHandler, isInputValid: isPostalCodeInputValid, inputTouchHandler: postalCodeInputTouchHandler, isInputTouched: isPostalCodeInputTouched, isFormValid: userPostalCodeValid, setInputError: setPostalCodeInputError, inputError: postalCodeHasError} = useInputHook(isFiveChar);

  const {userInput: userCityCodeInput, userInputHandler: userCityCodeInputHandler, isInputValid: isCityInputValid, inputTouchHandler: cityInputTouchHandler, isInputTouched: isCityInputTouched, isFormValid: userCityValid, setInputError: setCityInputError, inputError: cityHasError} = useInputHook(isnotEmpty);

  const { orderHandler } = props;

  let allIsValid =
      isNameInputValid &&
      isStreetInputValid &&
      isPostalCodeInputValid &&
      isCityInputValid

  const confirmHandler = (event) => {
    event.preventDefault();
    
    if (!allIsValid) {
      setNameInputError(!userNameValid)
      setStreetInputError(!userStreetValid)
      setPostalCodeInputError(!userPostalCodeValid)
      setCityInputError(!userCityValid)
      console.log(allIsValid, "Falsed")
      return;
    }

    let nameValue = userNameInput;
    let streetValue = userStreetInput;
    let postalCodeValue = userPostalCodeInput;
    let cityValue = userCityCodeInput;

    let userData = { nameValue, streetValue, postalCodeValue, cityValue };

    orderHandler(userData);

    userNameInputHandler('')
    userStreetInputHandler('')
    userPostalCodeInputHandler('')
    userCityCodeInputHandler('')
  };

  const nameClassControl = `${classes.control} ${
   !isNameInputValid && (isNameInputTouched || nameHasError) ? classes.invalid : ""
  }`;
  const streetClassControl = `${classes.control} ${
    !isStreetInputValid && (isStreetInputTouched || streetHasError) ? classes.invalid : ""
  }`;
  const postalCodeClassControl = `${classes.control} ${
    !isPostalCodeInputValid && (isPostalCodeInputTouched || postalCodeHasError) ? classes.invalid : ""
  }`;
  const cityClassControl = `${classes.control} ${
    !isCityInputValid && (isCityInputTouched || cityHasError) ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassControl}>

        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" onChange={(e)=>{userNameInputHandler(e.target.value)}} onBlur={()=>{nameInputTouchHandler(true)}} value={userNameInput} />
        {!isNameInputValid && (isNameInputTouched || nameHasError) ? <p>Please enter a valid name!</p> : ""}
      </div>

      <div className={streetClassControl}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" onChange={(e)=>{userStreetInputHandler(e.target.value)}} onBlur={()=>{streetInputTouchHandler(true)}} value={userStreetInput} />
        {!isStreetInputValid && (isStreetInputTouched || streetHasError) ? <p>Please enter a validstreet!</p> : ""}
      </div>

      <div className={postalCodeClassControl}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" onChange={(e)=>{userPostalCodeInputHandler(e.target.value)}} onBlur={()=>{postalCodeInputTouchHandler(true)}} value={userPostalCodeInput} />
        {!isPostalCodeInputValid && (isPostalCodeInputTouched || postalCodeHasError) ? <p>Please enter a valid posta code (not less than 5 chareacters long)!</p> : ""}
      </div>

      <div className={cityClassControl}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" onChange={(e)=>{userCityCodeInputHandler(e.target.value)}} onBlur={()=>{cityInputTouchHandler(true)}} value={userCityCodeInput} />
        {!isCityInputValid && (isCityInputTouched || cityHasError) ? <p>Please enter a valid city!</p> : ""}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
