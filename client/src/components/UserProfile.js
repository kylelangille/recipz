import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { FaPersonCirclePlus, FaPersonCircleXmark } from "react-icons/fa6";
import LoadingCircle from "./UI/LoadingCircle";
import Button from "./UI/Button";
import EditProfileForm from "./EditProfileForm";

const UserProfile = () => {
  const { userId } = useParams();
  const { user: userFromContext, updateUserContext } = useContext(UserContext);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);
  const [loadingUnfollow, setLoadingUnfollow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

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

  const handleFollowUser = async () => {
    try {
      setLoadingFollow(true);
      const response = await fetch(`/api/follow/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          loggedInUserId: userFromContext.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to follow user");
      }

      const updatedUser = {
        ...userFromContext,
        following: [...userFromContext.following, userId],
      };
      updateUserContext(updatedUser);
      setUserData({
        ...userData,
        followers: [...userData.followers, userFromContext.id],
      });
    } catch (err) {
      console.error("Error following user: ", err);
    } finally {
      setLoadingFollow(false);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      setLoadingUnfollow(true);
      const response = await fetch(`/api/unfollow/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loggedInUserId: userFromContext.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to unfollow user");
      }

      const updatedUser = {
        ...userFromContext,
        following: userFromContext.following.filter((id) => id !== userId),
      };
      updateUserContext(updatedUser);
      setUserData({
        ...userData,
        followers: userData.followers.filter((id) => id !== userFromContext.id),
      });
    } catch (err) {
      console.error("Error unfollowing user: ", err);
    } finally {
      setLoadingUnfollow(false);
    }
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = async (updatedData) => {
    try {
      setLoadingUpdate(true);
      const response = await fetch(`/api/edit-profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile");
      }

      const updatedUser = {
        ...userFromContext,
        ...updatedData,
      };

      updateUserContext(updatedUser);
      setUserData(updatedUser);
      setEditing(false);
    } catch (err) {
      console.error("Error saving profile changes: ", err);
    } finally {
      setLoadingUpdate(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const customDisplay = "flex";
  const customAlign = "center";
  const mediumText = "1.2rem";

  const renderFollowButton =
    userFromContext.id !== userId &&
    (loadingFollow || loadingUnfollow ? (
      <LoadingCircle />
    ) : (
      <Button
        customDisplay={customDisplay}
        customAlign={customAlign}
        customText={mediumText}
        onClick={
          userFromContext.following?.includes(userId)
            ? handleUnfollowUser
            : handleFollowUser
        }
      >
        <Icon>
          {userFromContext.following?.includes(userId) ? (
            <FaPersonCircleXmark />
          ) : (
            <FaPersonCirclePlus />
          )}
        </Icon>
        {userFromContext.following?.includes(userId) ? "Unfollow" : "Follow"}
      </Button>
    ));

  return (
    <>
      {loadingUpdate ? (
        <LoadingCircle />
      ) : (
        <>
          {editing ? (
            <EditProfileForm
              user={userData}
              onSave={handleSaveProfile}
              onCancel={handleCancel}
            />
          ) : (
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
                      <p>{userData.location}</p>
                    </SubContainer>
                  </HeadContainer>
                  {userFromContext.id === userId && (
                    <Button onClick={handleEditProfile}>Edit Profile</Button>
                  )}
                  {renderFollowButton}
                </>
              )}
            </Wrapper>
          )}
        </>
      )}
    </>
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
