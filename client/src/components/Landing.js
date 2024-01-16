import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { styled } from "styled-components";
import heroImg from "../assets/food-img.png";
import Dashboard from "./Dashboard";

const Landing = () => {
  const { isAuthenticated } = useAuth0();
  const { user: userFromContext } = useContext(UserContext);

  return (
    <Wrapper>
      {isAuthenticated ? (
        <Control>
          {userFromContext && userFromContext.name ? (
            <>
              <p>Welcome, {userFromContext.name}!</p>
              <Dashboard />
            </>
          ) : (
            <p>Loading user data...</p>
          )}
        </Control>
      ) : (
        <Content>
          <HeroImg src={heroImg} />
          <SubWrapper>
            <h1>ReciPZ</h1>
            <p>Your personal collaborative cookbook</p>
          </SubWrapper>
        </Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10rem;
  margin: 10rem auto 0 auto;
  max-width: 50rem;
  display: flex;

  p {
    font-size: 1.2rem;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    color: var(--button);
    font-size: 3rem;
    text-shadow: 1px 1px 1px var(--stroke);
  }

  p {
    font-size: 1.6rem;
  }
`;

const HeroImg = styled.img`
  max-width: 30rem;
  max-height: 30rem;
  border-radius: 6px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.3);
  margin-right: 2.6rem;

  @media (max-width: 700px) {
    max-width: 20rem;
    max-height: 20rem;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 30rem;
`;

const Content = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

export default Landing;
