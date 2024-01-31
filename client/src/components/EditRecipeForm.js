import { styled } from "styled-components";
import { useState, useEffect } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import DeleteButton from "./UI/DeleteButton";
import AddButton from "./UI/AddButton";
import RemoveButton from "./UI/RemoveButton";
import TagInput from "./UI/TagInput";
import LoadingCircle from "./UI/LoadingCircle";
import TAG_OPTIONS from "../utils/tagOptions";

import { handleInputChangeHelper } from "../form-helpers/handleInputChangeHelper";
import { handleImgChangeHelper } from "../form-helpers/handleImgChangeHelper";
import { handleIngredientChangeHelper } from "../form-helpers/handleIngredientChangeHelper";
import { handleAddIngredientHelper } from "../form-helpers/handleAddIngredientHelper";
import { handleRemoveIngredientHelper } from "../form-helpers/handleRemoveIngredientHelper";
import { handleStepChangeHelper } from "../form-helpers/handleStepChangeHelper";
import { handleAddStepHelper } from "../form-helpers/handleAddStepHelper";
import { handleRemoveStepHelper } from "../form-helpers/handleRemoveStepHelper";
import { handleTagChangeHelper } from "../form-helpers/handleTagChangeHelper";

const EditRecipeForm = ({ recipeData, recipeId, onEditComplete, onCancel }) => {
  const initialData = recipeData.formData || recipeData;
  const [editedData, setEditedData] = useState({
    recipeName: initialData.name || "",
    mealImg: initialData.mealImg || "",
    ingredients: initialData.ingredients || [],
    steps: initialData.steps || [],
    tags: initialData.tags || [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEditedData({
      recipeName: initialData.recipeName || "",
      mealImg: initialData.mealImg || "",
      ingredients: initialData.ingredients || [],
      steps: initialData.steps || [],
      tags: initialData.tags || [],
    });
  }, [initialData]);

  const handleInputChange = (ev) => {
    handleInputChangeHelper(ev, setEditedData);
  };

  const handleImgChange = (ev) => {
    handleImgChangeHelper(ev, setEditedData);
  };

  const handleIngredientChange = (index, field, value) => {
    handleIngredientChangeHelper(index, field, value, setEditedData);
  };

  const handleAddIngredient = () => {
    handleAddIngredientHelper(setEditedData);
  };

  const handleRemoveIngredient = (index) => {
    handleRemoveIngredientHelper(index, setEditedData);
  };

  const handleStepChange = (index, value) => {
    handleStepChangeHelper(index, value, setEditedData);
  };

  const handleAddStep = () => {
    handleAddStepHelper(setEditedData);
  };

  const handleRemoveStep = (index) => {
    handleRemoveStepHelper(index, setEditedData);
  };

  const handleTagChange = (tag) => {
    handleTagChangeHelper(tag, setEditedData);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(`/api/edit-recipe/${recipeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      onEditComplete();
    } catch (err) {
      console.error("Error editing recipe: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpdate = () => {
    onCancel();
  };

  return (
    <Wrapper>
      {loading && <LoadingCircle />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <h2>Edit Recipe:</h2>
          <Input
            label="Recipe name"
            type="text"
            id="recipeName"
            value={editedData.recipeName}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="mealImg">
            <input
              id="mealImg"
              type="file"
              name="mealImg"
              accept="image/*"
              onChange={handleImgChange}
            />
          </label>
          <br />

          {editedData.ingredients.map((ingredient, index) => (
            <InputWrapper key={index}>
              <Input
                label={`Ingredient ${index + 1}`}
                type="text"
                value={ingredient.ingredient}
                onChange={(ev) =>
                  handleIngredientChange(index, "ingredient", ev.target.value)
                }
              />

              <Input
                label="How much?"
                type="text"
                value={ingredient.measure}
                onChange={(ev) =>
                  handleIngredientChange(index, "measure", ev.target.value)
                }
              />
              <RemoveButton
                type="button"
                onClick={() => handleRemoveIngredient(index)}
              >
                &times;
              </RemoveButton>
            </InputWrapper>
          ))}

          <AddButton type="button" onClick={handleAddIngredient}>
            Add Ingredient
          </AddButton>

          <br />

          {editedData.steps.map((step, index) => (
            <InputWrapper key={index}>
              <Input
                label={`Step ${index + 1}`}
                type="text"
                value={step}
                onChange={(ev) => handleStepChange(index, ev.target.value)}
              />
              <RemoveButton
                type="button"
                onClick={() => handleRemoveStep(index)}
              >
                &times;
              </RemoveButton>
            </InputWrapper>
          ))}

          <AddButton type="button" onClick={handleAddStep}>
            Add Step
          </AddButton>

          <br />

          <Field>
            <Legend>Add tags:</Legend>
            {TAG_OPTIONS.map((tag) => (
              <TagInput
                key={tag}
                id={tag}
                label={tag}
                checked={editedData.tags.includes(tag)}
                onChange={() => handleTagChange(tag)}
              />
            ))}
          </Field>
          <Control>
            <Button type="submit">Save Changes</Button>
            <DeleteButton type="button" onClick={handleCancelUpdate}>
              Cancel
            </DeleteButton>
          </Control>
        </form>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem auto 4rem auto;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
`;

const Field = styled.fieldset`
  margin-bottom: 2rem;
`;

const Legend = styled.legend`
  font-size: 1.1rem;
`;

const Control = styled.div`
  display: flex;
  gap: 10px;
`;

export default EditRecipeForm;
