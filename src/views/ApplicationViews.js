import { Route, Routes } from "react-router-dom"
import { Authorized } from "./Authorized"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { HomePage } from "../components/homepage/homePage"
import { PostDetails } from "../components/posts/PostDetails"
import { UserProfile } from "../components/profiles/UserProfile"
import { EditPostForm } from "../components/posts/EditPost"
import {Explore} from "../components/attractions/Explore"
import { MakePost } from "../components/posts/MakePost"
export const ApplicationViews = ({StyledLink}) => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/home" element={<HomePage StyledLink= {StyledLink}/>} />
                <Route path="/post/:postId" element={<PostDetails StyledLink = {StyledLink} />}/>
                <Route path="/:userId" element={<UserProfile />}/>
                <Route path="/editPost/:postId" element={<EditPostForm />}/>
                <Route path="/explore" element={<Explore/>} />
                <Route path="/makePost" element= {<MakePost />} />
            </Route>
        </Routes>
    </>
}