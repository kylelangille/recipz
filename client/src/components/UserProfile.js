import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaPersonCirclePlus } from "react-icons/fa6";
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
          console.log(data.data);
          setUserData(data.data);
          setLoading(false);
        });
    }
  }, [userId, userFromContext]);

  const customDisplay = "flex";
  const customAlign = "center";
  const mediumText = "1.2rem";

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
              <p>
                <span>
                  Following:{" "}
                  {userData.following ? userData.following.length : 0}
                </span>{" "}
                /{" "}
                <span>
                  Followers:{" "}
                  {userData.followers ? userData.followers.length : 0}
                </span>
              </p>
            </SubContainer>
          </HeadContainer>
          {userFromContext.id === userId && <Button>Edit Profile</Button>}
          {!userFromContext.following ||
            (!userFromContext.following.includes(userId) &&
              userFromContext.id !== userId && (
                <Button
                  customDisplay={customDisplay}
                  customAlign={customAlign}
                  customText={mediumText}
                >
                  <Icon>
                    <FaPersonCirclePlus />
                  </Icon>{" "}
                  Follow
                </Button>
              ))}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto 0 auto;
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

const Icon = styled.div`
  margin-right: 1rem;
`;

export default UserProfile;
