import { useEffect, useState } from "react"

export const MakePost = ({placeId}) => {
    const [place, setPlace] = useState("")
    useEffect(() => {
        setPlace(placeId)
    },[])
}