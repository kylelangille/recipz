import { styled } from "styled-components";
import { useState } from "react";
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
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
          <DeleteButton type="button" onClick={handleCancelUpdate}>
            Cancel
          </DeleteButton>
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
