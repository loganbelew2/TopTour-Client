import { NavBar } from './components/nav/nav/NavBar';
import { ApplicationViews } from './views/ApplicationViews';
export const TopTour = () => {
// Use the API key
console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
  return <>
    <NavBar/>
    <ApplicationViews/>
  </>
}
