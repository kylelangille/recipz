import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import LoadingCircle from "./UI/LoadingCircle";
import Button from "./UI/Button";

const UserProfile = () => {
  const { userId } = useParams();
  const { user: userFromContext } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      });
  }, [userId]);

  if (userFromContext.id === userId) {
    return (
      <Wrapper>
        <HeadContainer>
          <Avatar
            src={userFromContext.picture}
            alt={`Picture of ${userFromContext.name}`}
          />
          <SubContainer>
            <h2>{userFromContext.name}</h2>
          </SubContainer>
        </HeadContainer>
        <Button>Edit Profile</Button>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {Object.keys(userData).length === 0 ? (
        <LoadingCircle />
      ) : (
        <>
          <HeadContainer>
            <Avatar
              src={userData.picture}
              alt={`Picture of ${userData.name}`}
            />
            <SubContainer>
              <h2>{userData.name}</h2>
            </SubContainer>
          </HeadContainer>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 10rem auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeadContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  border-radius: 50%;
`;

const SubContainer = styled.div``;

export default UserProfile;
