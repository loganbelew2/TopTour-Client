import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManger";
import "./Auth.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Register = ({StyledLink}) => {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const bio = useRef();
  const password = useRef();
  const verifyPassword = useRef();
  const passwordDialog = useRef();
  const profileImage = useRef();
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
        email: email.current.value,
        profile_image: profileImage.current.value
      };

      registerUser(newUser).then((res) => {
        if ("token" in res) {
          localStorage.setItem("tt_token", res.token);
          navigate("/login");
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
          className="form--login max-w-md p-4 bg-white rounded shadow-emerald-800 shadow-md"
          onSubmit={handleRegister}
        >
          <h1 className="text-3xl font-semibold mb-4">Register an account</h1>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            color="secondary"
            inputRef={firstName}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            className="mb-4"
            color="secondary"
            inputRef={lastName}
          />
          <TextField
            label="email"
            variant="outlined"
            fullWidth
            className="mb-4"
            color="secondary"
            inputRef={email}
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            className="mb-4"
            color="secondary"
            inputRef={username}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            className="mb-4"
            color="secondary"
            inputRef={password}
          />
          <TextField
            label="Verify Password"
            variant="outlined"
            fullWidth
            type="password"
            className="mb-4"
            color="secondary"
            inputRef={verifyPassword}
          />
          <TextField
            label="profile image url"
            variant="outlined"
            fullWidth
            className="mb-4"
            color="secondary"
            inputRef={profileImage}
          />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            className="mb-4"
            color="secondary"
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
          Already registered? <StyledLink to="/login">Login</StyledLink>
        </div>
      </section>
    </main>
  );
};
