import { Auth0Provider } from "@auth0/auth0-react";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Landing from "./Landing";
import Form from "./Form";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const App = () => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <GlobalStyles />
      <Header />
      {/* <Landing /> */}
      <Form />
    </Auth0Provider>
  );
};

export default App;
