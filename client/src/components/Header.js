import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import Button from "./UI/Button";

const Header = () => {
  const { loginWithPopup } = useAuth0();

  const handleLogin = async () => {
    try {
      await loginWithPopup();
    } catch (err) {
      console.error("Error logging in: ", err);
    }
  };
  return (
    <Head>
      <Heading>ReciPZ</Heading>
      <nav>
        <NavList>
          <li>
            <Button onClick={handleLogin}>Log in</Button>
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

export default Header;
