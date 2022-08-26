import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// email handling
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

// Password handling
const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT')
  {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }

  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredCollageName, setEnteredCollageName] = useState("");
  const [collageNameIsValid, setCollageNameIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    console.log("EFFECT RUNNING");
    return () => {
      console.log("CLEANUP");
    };
  }, []);

  // useEffect(() => {

  //   const identifier = setTimeout(() => {
  //     console.log('checking form validity')
  //     setFormIsValid(
  //       enteredEmail.includes("@") &&
  //         enteredPassword.trim().length > 6 &&
  //         enteredCollageName.includes("collage")
  //     );
  //   }, 5000)
  //   return () => {
  //     console.log("CLEANUP")
  //     clearTimeout(identifier)
  //   }
  // }, [enteredEmail, enteredPassword, enteredCollageName]);

  const collageNameChangeHandler = (event) => {
    //console.log(event.target.value)
    setEnteredCollageName(event.target.value);

    setFormIsValid(
      emailState.isValid &&
      passwordState.isValid &&
        event.target.value.includes("collage")
    );
  };

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      event.target.value.includes("@") &&
      passwordState.isValid  &&
        enteredCollageName.includes("collage")
    );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    setFormIsValid(
      emailState.isValid &&
        event.target.value.trim().length > 6 &&
        enteredCollageName.includes("collage")
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const validateCollageNamedHandler = () => {
    setCollageNameIsValid(enteredCollageName.includes("collage"));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
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
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collageNameIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">Collage Name</label>
          <input
            type="text"
            id="cName"
            value={enteredCollageName}
            onChange={collageNameChangeHandler}
            onBlur={validateCollageNamedHandler}
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
