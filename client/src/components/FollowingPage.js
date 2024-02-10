import { styled } from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingCircle from "./UI/LoadingCircle";
import UserCard from "./UI/UserCard";

const FollowingPage = () => {
  const { userId } = useParams();
  const { user: userFromContext } = useContext(UserContext);
  const [following, setFollowing] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get-following/${userId}`);
        const data = await response.json();

        if (data.data) {
          setFollowing(data.data);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();

        if (userData.data) {
          setUser(userData.data);
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    };

    fetchData();
    fetchUserData();
  }, [userId]);
  return (
    <Wrapper>
      {following === null ? (
        <LoadingCircle />
      ) : (
        <>
          {following.length === 0 ? (
            <>
              {userId !== userFromContext.id && (
                <Heading>{user.name} is Following:</Heading>
              )}
              <p>No followers to be found 😔</p>
            </>
          ) : (
            <>
              {userId === userFromContext.id && (
                <Heading>My followers: </Heading>
              )}
              {userId !== userFromContext.id && (
                <Heading>{user.name} is Following:</Heading>
              )}
              {following.map((follower) => (
                <UserCard
                  key={follower._id}
                  userId={follower.id}
                  userName={follower.name}
                  userImg={follower.picture}
                  userLocation={follower.location}
                />
              ))}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto 0 300px;

  @media (max-width: 1000px) {
    margin: 5rem auto 0 auto;
  }
`;

const Heading = styled.h2`
  text-align: center;
`;

export default FollowingPage;
