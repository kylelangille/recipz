import { styled } from "styled-components";

const Header = () => {
  return (
    <Head>
      <Heading>ReciPZ</Heading>
    </Head>
  );
};

const Head = styled.header`
  position: absolute;
  top: 0;
  background: var(--secondary);
  width: 100vw;
  height: 5rem;
`;

const Heading = styled.h1`
  color: var(--heading);
  text-shadow: 1px 2px 2px var(--stroke);
`;

export default Header;
