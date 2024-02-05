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

    fetchData();
  }, [userId]);

  return (
    <Wrapper>
      {followers === null ? (
        <LoadingCircle />
      ) : (
        <>
          {followers.length === 0 ? (
            <p>You don't have any followers 😔</p>
          ) : (
            <>
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
`;

export default FollowersPage;
