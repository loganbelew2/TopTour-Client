import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/nav/auth/Login"
import { Register } from "../components/nav/auth/Register"
import { HomePage } from "../components/nav/homepage/homePage"
import { PostDetails } from "../components/nav/posts/PostDetails"

export const ApplicationViews = ({StyledLink}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/home" element={<HomePage StyledLink= {StyledLink}/>} />
                <Route path="/post/:postId" element={<PostDetails StyledLink = {StyledLink} />}/>
            </Route>
        </Routes>
    </>
}