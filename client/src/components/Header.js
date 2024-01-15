import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Button from "./UI/Button";

const Header = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    user: UserFromAuth0,
  } = useAuth0();

  const { createUserAndReceiveData } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      await loginWithRedirect();
    } catch (err) {
      console.error("Error logging in: ", err);
    }
  };

  useEffect(() => {
    if (UserFromAuth0) {
      createUserAndReceiveData(UserFromAuth0);
    }
  }, [UserFromAuth0]);

  return (
    <Head>
      <NavLink to="/">
        <Heading>ReciPZ</Heading>
      </NavLink>
      <nav>
        <NavList>
          <li>
            {isAuthenticated ? (
              <Button onClick={() => logout()}>Log out</Button>
            ) : (
              <Button onClick={handleLogin}>Log in</Button>
            )}
          </li>
        </NavList>
      </nav>
    </Head>
  );
};

const Head = styled.header`
  position: absolute;
  top: 0;
  background: var(--secondary);
  width: 100vw;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
`;

const Heading = styled.h1`
  color: var(--heading);
  text-shadow: 1px 2px 2px var(--stroke);
  margin-left: 4rem;
`;

const NavList = styled.ul`
  float: left;
  list-style-type: none;
  margin-right: 4rem;
  color: var(--heading);
  text-shadow: 1px 2px 2px var(--stroke);
`;

const NavLink = styled(Link)`
  text-decoration: none;
`;

export default Header;
