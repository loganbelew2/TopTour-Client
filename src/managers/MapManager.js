import { apiKey } from "../assets/apiKey";

export const getMap = (coordinates = '40.714728,-73.998672') => {
    return fetch(`https://maps.googleapis.com/maps/api/staticmap?center=${coordinates}&markers=${coordinates}&zoom=15&size=400x400&key=${apiKey}`)
}