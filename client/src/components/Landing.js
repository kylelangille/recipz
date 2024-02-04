import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { styled } from "styled-components";

import heroImg from "../assets/food-img.png";
import LoadingCircle from "./UI/LoadingCircle";
import Dashboard from "./Dashboard";
import Button from "./UI/Button";

const Landing = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    user: UserFromAuth0,
  } = useAuth0();
  const { user: userFromContext, createUserAndReceiveData } =
    useContext(UserContext);

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

  const bigText = "2.2rem";
  const textShadow = "1px 2px 2px var(--stroke)";

  return (
    <Wrapper>
      {isAuthenticated ? (
        <>
          {userFromContext && userFromContext.name ? (
            <Dashboard />
          ) : (
            <LoadingCircle />
          )}
        </>
      ) : (
        <Content>
          <HeroImg src={heroImg} />
          <SubWrapper>
            <h1>ReciPZ</h1>
            <p>Your personal collaborative cookbook</p>
            <Button
              type="button"
              onClick={() => handleLogin()}
              customText={bigText}
              textShadow={textShadow}
            >
              Log in
            </Button>
          </SubWrapper>
        </Content>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 9rem auto 0 auto;
`;

const Content = styled.div`
  display: flex;

  @media (max-width: 700px) {
    flex-direction: column;
    margin: 0 auto;
  }
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    color: var(--button);
    font-size: 3rem;
  }

  p {
    font-size: 1.6rem;
    margin-bottom: 1rem;
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

export default Landing;
