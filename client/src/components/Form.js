import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import { useState } from "react";
import Button from "./UI/Button";
import AddButton from "./UI/AddButton";
import RemoveButton from "./UI/RemoveButton";
import Input from "./UI/Input";
import TagInput from "./UI/TagInput";
import LoadingCircle from "./UI/LoadingCircle";

import { handleInputChangeHelper } from "../form-helpers/handleInputChangeHelper";
import { handleImgChangeHelper } from "../form-helpers/handleImgChangeHelper";
import { handleIngredientChangeHelper } from "../form-helpers/handleIngredientChangeHelper";
import { handleAddIngredientHelper } from "../form-helpers/handleAddIngredientHelper";
import { handleRemoveIngredientHelper } from "../form-helpers/handleRemoveIngredientHelper";
import { handleStepChangeHelper } from "../form-helpers/handleStepChangeHelper";
import { handleAddStepHelper } from "../form-helpers/handleAddStepHelper";
import { handleRemoveStepHelper } from "../form-helpers/handleRemoveStepHelper";
import { handleTagChangeHelper } from "../form-helpers/handleTagChangeHelper";

const Form = () => {
  const { user, isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    recipeName: "",
    mealImg: null,
    ingredients: [],
    steps: [],
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

  const TAG_OPTIONS = ["Vegan", "Vegetarian", "Gluten-Free", "Dessert"];

  const handleInputChange = (ev) => {
    handleInputChangeHelper(ev, setFormData);
  };

  const handleImgChange = (ev) => {
    handleImgChangeHelper(ev, setFormData);
  };

  const handleIngredientChange = (index, field, value) => {
    handleIngredientChangeHelper(index, field, value, setFormData);
  };

  const handleAddIngredient = () => {
    handleAddIngredientHelper(setFormData);
  };

  const handleRemoveIngredient = (index) => {
    handleRemoveIngredientHelper(index, setFormData);
  };

  const handleStepChange = (index, value) => {
    handleStepChangeHelper(index, value, setFormData);
  };

  const handleAddStep = () => {
    handleAddStepHelper(setFormData);
  };

  const handleRemoveStep = (index) => {
    handleRemoveStepHelper(index, setFormData);
  };

  const handleTagChange = (tag) => {
    handleTagChangeHelper(tag, setFormData);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const userId = user.sub;

    const date = new Date().toLocaleString();
    const createdBy = user.name;

    const newRecipe = { formData, userId, date: date, createdBy: createdBy };

    try {
      setLoading(true);
      const response = await fetch("/api/add-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error("Failed to add recipe");
      }

      setRecipeSubmitted(true);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <h2>Add a new recipe:</h2>
          {loading ? (
            <>
              <LoadingCircle />
              <p>Submitting recipe...</p>
            </>
          ) : recipeSubmitted ? (
            <>
              <p>Your recipe has been added!</p>
            </>
          ) : (
            <>
              <Input
                label="Recipe name"
                type="text"
                id="recipeName"
                value={formData.recipeName}
                onChange={handleInputChange}
              />

              <label htmlFor="mealImg">
                Select an image:
                <input
                  id="mealImg"
                  type="file"
                  name="mealImg"
                  accept="image/*"
                  onChange={handleImgChange}
                />
              </label>

              {formData.ingredients.map((ingredient, index) => (
                <InputWrapper key={index}>
                  <Input
                    label={`Ingredient ${index + 1}`}
                    type="text"
                    value={ingredient.ingredient}
                    onChange={(ev) =>
                      handleIngredientChange(
                        index,
                        "ingredient",
                        ev.target.value
                      )
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

              {formData.steps.map((step, index) => (
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

              <Field>
                <Legend>Add tags:</Legend>
                {TAG_OPTIONS.map((tag) => (
                  <TagInput
                    key={tag}
                    id={tag}
                    label={tag}
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                ))}
              </Field>

              <Button type="submit">Add Recipe</Button>
            </>
          )}
        </form>
      ) : (
        <p>You must be logged in to see this content.</p>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5rem auto 0 auto;
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
  margin-bottom: 1rem;
`;

const Legend = styled.legend`
  font-size: 1.1rem;
`;

export default Form;
