import { styled } from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingCircle from "./UI/LoadingCircle";
import UserCard from "./UI/UserCard";

const FollowersPage = () => {
  const { userId } = useParams();
  const { user: userFromContext } = useContext(UserContext);
  const [followers, setFollowers] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get-followers/${userId}`);
        const data = await response.json();

        if (data.data) {
          setFollowers(data.data);
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
      {followers === null ? (
        <LoadingCircle />
      ) : (
        <>
          {followers.length === 0 ? (
            <>
              {userId !== userFromContext.id && (
                <Heading>{user.name}'s Followers:</Heading>
              )}
              <p>No followers to be found 😔</p>
            </>
          ) : (
            <>
              {userId === userFromContext.id && (
                <Heading>My followers: </Heading>
              )}
              {userId !== userFromContext.id && (
                <Heading>{user.name}'s Followers:</Heading>
              )}
              {followers.map((follower) => (
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

export default FollowersPage;
