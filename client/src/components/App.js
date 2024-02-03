import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "../context/UserContext";
import GlobalStyles from "./GlobalStyles";
import { styled } from "styled-components";
import Landing from "./Landing";
import UserProfile from "./UserProfile";
import Form from "./Form";
import Feed from "./Feed";
import MyRecipes from "./MyRecipes";
import Search from "./Search";
import Random from "./Random";
import RecipePage from "./RecipePage";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_API_AUDIENCE;

const App = () => {
  const { isAuthenticated } = useAuth0();
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
          <AppContainer>
            {!isAuthenticated && (
              <LandingContainer>
                <Landing />
              </LandingContainer>
            )}
            <MainContent>
              <Routes>
                <Route path="/users/:userId" element={<UserProfile />} />
                <Route path="/add-recipe" element={<Form />} />
                <Route path="/feed/:userId" element={<Feed />} />
                <Route path="/my-recipes/:userId" element={<MyRecipes />} />
                <Route path="/search" element={<Search />} />
                <Route path="/random" element={<Random />} />
                <Route path="/all-recipes/:recipeId" element={<RecipePage />} />
              </Routes>
            </MainContent>
          </AppContainer>
        </BrowserRouter>
      </UserProvider>
    </Auth0Provider>
  );
};

const AppContainer = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
`;

const MainContent = styled.div`
  flex: 1;
`;

const LandingContainer = styled.div`
  position: absolute;
`;

export default App;
