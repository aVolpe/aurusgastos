import React, { useState } from "react";
import Button from "@material-ui/core/Button";
//import Button from 'react-bootstrap/Button';

import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import { login } from "../utils/utiles";

const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const INITAL_ERRORS = {
  user: null,
  password: null,
  login: null
};

export default function Login() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({ user: "", password: "" });
  const [errors, setErrors] = useState(INITAL_ERRORS);
//  const history = useHistory(); 

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = ({ user, password }) => {
    let isValid = true;

    let validationErrors = { ...INITAL_ERRORS }; // copy errors so that we don't overwrite the default erros
    // Feel free to add more complex validation with Regular Expressions
    /*

    if (user.length === 0 || !user.includes("@")) {
      validationErrors.user = "Not a valid E-mail";
      isValid = false;
    }
    */
    if (password.length < 2) {
      validationErrors.password = "La clave es muy corta ";
      isValid = false;
    }
    setErrors({ ...validationErrors });

    return isValid;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const { user, password } = input;

    const isValid = validate({ user, password });
    if (!isValid) return;

    login({ user, password })
      .then(() => {
        //history.push("/dashboard");
        console.log("redirect to dashboards");
      })
      .catch(err => {
        setErrors({ ...errors, login: err.message });
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="user"
            label="usuario"
            name="user"
            autoComplete="user"
            autoFocus
            value={input.user}
            onChange={e => setInput({ ...input, user: e.target.value })}
            error={!!errors.user}
            helperText={errors.user}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={input.password}
            onChange={e => setInput({ ...input, password: e.target.value })}
            error={!!errors.password}
            helperText={errors.password}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={showPassword}
                onChange={() => handleShowPassword()}
                color="primary"
              />
            }
            label="Mostrar contraseña"
          />
          <div style={{ color: "red" }}>{errors.login}</div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
    </Container>
  );
}
