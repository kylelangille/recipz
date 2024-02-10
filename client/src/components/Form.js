import { useAuth0 } from "@auth0/auth0-react";
import { styled } from "styled-components";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "./UI/Button";
import AddButton from "./UI/AddButton";
import RemoveButton from "./UI/RemoveButton";
import Input from "./UI/Input";
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

const Form = () => {
  const { user: userFromContext } = useContext(UserContext);
  const { isAuthenticated } = useAuth0();
  const [formData, setFormData] = useState({
    recipeName: "",
    mealImg: "",
    ingredients: [],
    steps: [],
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

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

    const userId = userFromContext.id;

    const date = new Date().toLocaleString();
    const createdBy = userFromContext.name;

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

  const bigText = "1.6rem";

  return (
    <Wrapper>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <Title>Add a new recipe:</Title>
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
              <br />
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
              <br />
              <br />
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

              <br />

              {formData.steps.map((step, index) => (
                <InputWrapper key={index}>
                  <Input
                    label={`Step ${index + 1}`}
                    type="text"
                    value={step}
                    onChange={(ev) => handleStepChange(index, ev.target.value)}
                    customWidth={"20rem"}
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
                    checked={formData.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                  />
                ))}
              </Field>
              <SubmitWrapper>
                <Button type="submit" customText={bigText}>
                  Add Recipe
                </Button>
              </SubmitWrapper>
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
  margin: 5rem auto 4rem 300px;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  font-size: 2rem;
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

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default Form;
