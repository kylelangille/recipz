import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "../context/UserContext";
import GlobalStyles from "./GlobalStyles";
import { styled } from "styled-components";
import Header from "./Header";
import Landing from "./Landing";
import UserProfile from "./UserProfile";
import Form from "./Form";
import Feed from "./Feed";
import MyRecipes from "./MyRecipes";
import Search from "./Search";
import Random from "./Random";
import RecipePage from "./RecipePage";
import Dashboard from "./Dashboard";

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
          <Header />
          <AppContainer isAuthenticated={isAuthenticated}>
            {!isAuthenticated && (
              <LandingContainer>
                <Landing />
              </LandingContainer>
            )}

            {isAuthenticated && (
              <DashboardContainer>
                <Dashboard />
              </DashboardContainer>
            )}
            <MainContent>
              <Routes>
                <Route path="/users/:userId" element={<UserProfile />} />
                <Route path="/add-recipe" element={<Form />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/my-recipes/:userId" element={<MyRecipes />} />
                <Route path="/search" element={<Search />} />
                <Route path="/random" element={<Random />} />
                <Route path="/all-recipes/:recipeId" element={<RecipePage />} />
              </Routes>
            </MainContent>
            {isAuthenticated && (
              <DashboardContainer>
                <Dashboard />
              </DashboardContainer>
            )}
          </AppContainer>
        </BrowserRouter>
      </UserProvider>
    </Auth0Provider>
  );
};

const AppContainer = styled.div`
  /* display: flex;
  max-width: 1200px;
  margin: 0 auto; */

  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  align-items: ${({ isAuthenticated }) =>
    isAuthenticated ? "flex-start" : "center"};
  justify-content: center;

  @media (min-width: 700px) {
    flex-direction: row;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const DashboardContainer = styled.div`
  flex-shrink: 0;
  width: 250px;
`;

const LandingContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
