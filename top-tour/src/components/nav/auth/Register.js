import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../managers/AuthManger";
import "./Auth.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Register = () => {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const email = useRef();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: username.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        bio: bio.current.value,
        password: password.current.value,
      };

      registerUser(newUser).then((res) => {
        if ("token" in res) {
          localStorage.setItem("lu_token", res.token);
          navigate("/");
        }
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main className="container--login flex items-center justify-center min-h-screen">
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section className="w-1/2 flex flex-col items-center justify-center">
        <form
          className="form--login max-w-md p-4 bg-white rounded shadow-md"
          onSubmit={handleRegister}
        >
          <h1 className="text-3xl font-semibold mb-4">Register an account</h1>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            inputRef={firstName}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            inputRef={lastName}
          />
          <TextField
            label="email"
            variant="outlined"
            fullWidth
            className="mb-4"
            inputRef={email}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className="mb-4"
            inputRef={username}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            className="mb-4"
            inputRef={password}
          />
          <TextField
            label="Verify Password"
            variant="outlined"
            fullWidth
            type="password"
            className="mb-4"
            inputRef={verifyPassword}
          />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            className="mb-4"
            inputRef={bio}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className="w-full"
          >
            Register
          </Button>
        </form>
        <div className="link--register mt-4">
          Already registered? <Link to="/login">Login</Link>
        </div>
      </section>
    </main>
  );
};
