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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (userFromContext.id === userId) {
      setUserData(userFromContext);
      setLoading(false);
    } else {
      fetch(`/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
          setLoading(false);
        });
    }
  }, [userId, userFromContext]);

  return (
    <Wrapper>
      {loading ? (
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
          {userFromContext.id === userId && <Button>Edit Profile</Button>}
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
  max-width: 10rem;
  max-height: 10rem;
`;

const SubContainer = styled.div``;

export default UserProfile;
