import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManger";
import "./Auth.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const Login = ({StyledLink}) => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res && "user" in res) {
                    localStorage.setItem("tt_token", res.token)
                    localStorage.setItem("user", res.user)
                    navigate("/home")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

  return (
    <main className="  container--login flex items-center justify-center min-h-screen ">
      <dialog className="dialog dialog--auth" ref={invalidDialog}>
        <div >Username or password was not valid.</div>
        <button
          className="button--close"
          onClick={(e) => invalidDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section>
        <form
          className="form--login max-w-x1 p-4 rounded shadow-emerald-800 shadow-md"
          onSubmit={handleLogin}
        >
          <h1 className="text-3xl font-semibold mb-4">Top Tour</h1>
          <h2 className="text-lg font-medium mb-4">Please sign in</h2>
          <TextField
            label="Username"
            variant="outlined"
            color="secondary"
            fullWidth
            className=" mb-4"
            inputRef={username}
          />
          <TextField
            label="Password"
            variant="outlined"
            color="secondary"
            fullWidth
            type="password"
            className="mb-4"
            inputRef={password}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>
        </form>
        <div className="pt-2">
          Not a member yet?
          <StyledLink to="/register"> Register</StyledLink>
        </div>
      </section>
    </main>
  );
}
