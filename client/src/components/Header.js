import { styled } from "styled-components";
import Button from "./UI/Button";

const Header = () => {
  return (
    <Head>
      <Heading>ReciPZ</Heading>
      <nav>
        <NavList>
          <li>
            <Button>Log in</Button>
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
