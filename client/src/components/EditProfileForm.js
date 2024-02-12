import { styled } from "styled-components";
import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { UserContext } from "../context/UserContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import DeleteButton from "./UI/DeleteButton";

import { handleImgChangeHelper } from "../form-helpers/handleImgChangeHelper";

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    location: user.location,
    picture: user.picture,
  });
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const { user: userFromContent } = useContext(UserContext);
  const { logout } = useAuth0();

  const handleInputChange = (ev) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImgChange = async (ev) => {
    handleImgChangeHelper(ev, setFormData);
  };

  const handleSave = async (ev) => {
    ev.preventDefault();

    try {
      await onSave(formData);
    } catch (err) {
      console.error("Error saving profile changes: ", err);
    }
  };

  const handleCancelUpdate = () => {
    onCancel();
  };

  const handleShowConfirmDelete = () => {
    setShowConfirmDelete(true);
  };

  const handleDenyDelete = () => {
    setShowConfirmDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoadingDelete(true);

      await fetch("/api/delete-profile", {
        method: "DELETE",
        body: JSON.stringify({
          userId: userFromContent.id,
        }),

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoadingDelete(false);
      logout();
    }
  };

  return (
    <Wrapper>
      <form>
        <h2>Edit profile:</h2>
        <Input
          label="Name"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <br />
        <Input
          label="Location"
          type="text"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <br />
        <ImgLabel htmlFor="picture">
          Choose a new profile picture:
          <br />
          <input
            id="picture"
            type="file"
            name="picture"
            accept="image/*"
            onChange={handleImgChange}
          />
        </ImgLabel>
        <br />
        <Control>
          {!showConfirmDelete && (
            <>
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
              <DeleteButton type="button" onClick={handleCancelUpdate}>
                Cancel
              </DeleteButton>
            </>
          )}
          {!showConfirmDelete && (
            <DeleteButton type="button" onClick={handleShowConfirmDelete}>
              Delete profile
            </DeleteButton>
          )}
          {showConfirmDelete && (
            <>
              <p>Are you sure?</p>
              <Button disabled={loadingDelete} onClick={handleConfirmDelete}>
                {loadingDelete ? "Deleting profile..." : "Yes"}
              </Button>
              <Button disbaled={loadingDelete} onClick={handleDenyDelete}>
                No
              </Button>
            </>
          )}
        </Control>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5rem auto 0 300px;
  max-width: 50rem;

  h2 {
    font-size: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    padding-left: 10px;
  }
`;

const ImgLabel = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Control = styled.div`
  width: 20rem;
  display: flex;
  gap: 10px;
`;

export default EditProfileForm;
