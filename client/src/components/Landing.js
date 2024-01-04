import { styled } from "styled-components";
import heroImg from "../assets/food-img.png";

const Landing = () => {
  return (
    <Wrapper>
      <HeroImg src={heroImg} />
      <SubWrapper>
        <h3>ReciPZ</h3>
        <p>Your personal collaborative cookbook</p>
      </SubWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 10rem;
  margin: 10rem auto 0 auto;
  max-width: 50rem;
  display: flex;
`;

const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
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
`;

export default Landing;
