import React, { useState, useEffect } from "react";
import { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// ==================================================================== 1 version
// function emailReducer(state, action) {
//   if (action.type === "INPUT_EMAIL") {
//     return {
//       emailValue: action.val,
//       isValid: action.val.includes("@"),
//     };
//   }
//   return {
//     emailValue: "",
//     isValid: undefined,
//   };
// }

// const initialState = {
//   emailValue: "",
//   isValid: undefined,
// };

// function passwordReducer(state, action) {
//   if (action.type === "INPUT_PASSWORD") {
//     return {
//       passwordValue: action.val,
//       passwordIsValid: action.val.trim().length > 6,
//     };
//   }
//   return {
//     passwordValue: "",
//     passwordIsValid: undefined,
//   };
// }
// const initialStatePassword = {
//   passwordValue: "",
//   passwordIsValid: undefined,
// };

// ==================================================================== 2 version

function globalReducer(state, action) {
  if (action.type === "INPUT_EMAIL" || action.type === "INPUT_PASSWORD") {
    return {
      emailValue: action.val,
      isValid: action.val.includes("@"),
      passwordValue: action.val,
      passwordIsValid: action.val.trim().length > 6,
    };
  }
  return {
    emailValue: "",
    isValid: undefined,
    passwordValue: "",
    passwordIsValid: undefined,
  };
}

const initialState = {
  emailValue: "",
  isValid: undefined,
  passwordValue: "",
  passwordIsValid: undefined,
};
// ====================================================================

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  // =============================== 1 version
  // const [emailState, dispatchEmail] = useReducer(emailReducer, initialState);
  // const [passwordState, dispatchPassword] = useReducer(
  //   passwordReducer,
  //   initialStatePassword
  // );

  // ================================= 2 version
  const [emailState, dispatchEmail] = useReducer(globalReducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(
    globalReducer,
    initialState
  );

  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setFormIsValid(
        emailState.emailValue.includes("@") &&
          passwordState.passwordValue.trim().length > 6
      );
    }, 1500);
    return () => {
      clearTimeout(timerId);
    };
  }, [emailState.isValid, passwordState.passwordIsValid]);
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "INPUT_EMAIL", val: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes("@"));
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_PASSWORD", val: event.target.value });

    setFormIsValid(
      event.target.value.trim().length > 6 &&
        emailState.emailValue.includes("@")
    );
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.emailValue, passwordState.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
