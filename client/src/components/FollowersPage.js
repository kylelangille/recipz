import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingCircle from "./UI/LoadingCircle";

const FollowersPage = () => {
  const { userId } = useParams();
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
            <p>No followers</p>
          ) : (
            <>
              {followers.map((follower) => (
                <div key={follower.id}>
                  <p>{follower.name}</p>
                </div>
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
