import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "../context/UserContext";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Landing from "./Landing";
import Form from "./Form";
import Random from "./Random";
import Feed from "./Feed";
import MyRecipes from "./MyRecipes";
import UserProfile from "./UserProfile";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_API_AUDIENCE;

const App = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      audience={audience}
    >
      <UserProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Header />
          <Landing />
          <Routes>
            <Route path="/add-recipe" element={<Form />} />
            <Route path="/random" element={<Random />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/users/:userId" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Auth0Provider>
  );
};

export default App;
