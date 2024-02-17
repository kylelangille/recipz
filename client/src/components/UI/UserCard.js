import { styled } from "styled-components";
import { Link } from "react-router-dom";

const UserCard = ({ userId, userImg, userName, userLocation }) => {
  return (
    <StyledLink to={`/users/${userId}`}>
      <Wrapper>
        <UserImg src={userImg} alt={`${userName}'s avatar`} />
        <div>
          <h2>{userName}</h2>
          <p>{userLocation}</p>
        </div>
      </Wrapper>
    </StyledLink>
  );
};

const Wrapper = styled.div`
  border: 1px solid var(--stroke);
  border-radius: 12px;
  margin: 1rem auto 0 auto;
  max-width: 50rem;
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 10px;

  @media (max-width: 1000px) {
    max-width: 30rem;
    margin: 1rem auto;

    h2 {
      font-size: 17px;
    }

    p {
      font-size: 12px;
    }
  }

  &:hover {
    color: var(--secondary);
  }
`;

const UserImg = styled.img`
  max-height: 10rem;
  max-width: 10rem;
  border-radius: 9px;

  @media (max-width: 1000px) {
    max-height: 5rem;
    max-width: 5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--main);
`;

export default UserCard;
